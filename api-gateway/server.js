import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createProxyMiddleware } from 'http-proxy-middleware';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'local_dev_secret_key';

// Global Middlewares
app.use(helmet());
app.use(cors({ origin: '*' })); // Restrict in production

// Rate Limiting (Layer 3)
// IP-based global limit
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});

// Stricter limit on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts, please try again later' }
});

// Stricter limit on finance/payment endpoints
const financeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many payment requests, please try again later' }
});

app.use(globalLimiter);
app.use('/api/v1/auth', authLimiter);
app.use('/api/v1/finance', financeLimiter);

// Authentication Middleware (Layer 3 & 6)
// Gateway terminates JWT once and forwards userId/role headers downstream.
// Each service still re-checks role/ownership (defense in depth).
const authenticateJWT = (req, res, next) => {
  // Public routes that don't require auth
  if (req.path.startsWith('/api/v1/auth/login') ||
      req.path.startsWith('/api/v1/auth/register') ||
      req.path.startsWith('/api/v1/cms') ||
      req.path.startsWith('/api/v1/finance/webhook')) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or malformed token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Forward user identity to downstream services via headers
    req.headers['x-user-id'] = decoded.userId;
    req.headers['x-user-role'] = decoded.role;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
  }
};

app.use(authenticateJWT);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'api-gateway' });
});

// Proxy Routes
// pathRewrite strips the /api/v1/<service> prefix so the downstream service
// receives clean paths (e.g., /api/v1/auth/login → /login on auth-service).
const proxyOptions = (target) => ({
  target,
  changeOrigin: true,
  pathRewrite: undefined, // We'll set this per-route
  // Don't parse the body — let the proxy forward the raw stream
  // This is critical for POST/PUT/PATCH requests to work correctly
});

app.use('/api/v1/auth', createProxyMiddleware({
  target: process.env.AUTH_SERVICE_URL || 'http://auth-service:3001',
  changeOrigin: true,
  pathRewrite: { '^/api/v1/auth': '' },
}));

app.use('/api/v1/academic', createProxyMiddleware({
  target: process.env.ACADEMIC_SERVICE_URL || 'http://academic-service:3002',
  changeOrigin: true,
  pathRewrite: { '^/api/v1/academic': '' },
}));

app.use('/api/v1/hostel', createProxyMiddleware({
  target: process.env.HOSTEL_SERVICE_URL || 'http://hostel-service:3003',
  changeOrigin: true,
  pathRewrite: { '^/api/v1/hostel': '' },
}));

app.use('/api/v1/finance', createProxyMiddleware({
  target: process.env.FINANCE_SERVICE_URL || 'http://finance-service:3004',
  changeOrigin: true,
  pathRewrite: { '^/api/v1/finance': '' },
}));

app.use('/api/v1/admissions', createProxyMiddleware({
  target: process.env.ADMISSIONS_SERVICE_URL || 'http://admissions-service:3005',
  changeOrigin: true,
  pathRewrite: { '^/api/v1/admissions': '' },
}));

app.use('/api/v1/cms', createProxyMiddleware({
  target: process.env.CMS_SERVICE_URL || 'http://cms-service:3006',
  changeOrigin: true,
  pathRewrite: { '^/api/v1/cms': '' },
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Gateway is running on port ${PORT}`);
});

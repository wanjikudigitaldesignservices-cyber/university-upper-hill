import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  ArrowUpRight,
  GraduationCap,
  ShieldCheck,
  Building,
  Award,
  CheckCircle2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { quickLogin } = useAuth();
  const navigate = useNavigate();

  const schools = [
    {
      name: 'School of Business & Management',
      desc: 'Banking, finance, CPA qualifications, HR, and supply chain management.',
      image: '/campus-quad.jpg',
      badge: 'Diploma • Cert • CPA',
      students: '3,450+ Scholars',
    },
    {
      name: 'School of ICT & Computer Science',
      desc: 'Software development, cloud systems, cyber security, Cisco CCNA, and AI.',
      image: '/innovation-hall.jpg',
      badge: 'Diploma • Cert • Short',
      students: '2,850+ Scholars',
    },
    {
      name: 'School of Engineering & Technology',
      desc: 'Electrical power, automotive mechanics, civil masonry, and solar PV energy.',
      image: '/engineering-lab.jpg',
      badge: 'Diploma • Cert • Artisan',
      students: '2,100+ Scholars',
    },
    {
      name: 'School of Hospitality & Tourism',
      desc: 'Culinary gastronomy, French bakery, food & beverage, and barista skills.',
      image: '/culinary.jpg',
      badge: 'Diploma • Pastry • Short',
      students: '1,950+ Scholars',
    },
    {
      name: 'School of Media & Communication',
      desc: 'Broadcast 4K television journalism, radio presenting, and corporate PR.',
      image: '/media-studio.jpg',
      badge: 'Diploma • Cert • Short',
      students: '1,600+ Scholars',
    },
    {
      name: 'School of Health & Social Sciences',
      desc: 'Community health, social work, counseling psychology, and clinical aide.',
      image: '/health-lab.jpg',
      badge: 'Diploma • Cert • Artisan',
      students: '2,300+ Scholars',
    },
    {
      name: 'School of Creative Arts & Design',
      desc: 'Graphic design UI/UX, 3D character animation, fashion couture, and interior staging.',
      image: '/creative-arts.jpg',
      badge: 'Diploma • Cert • Artisan',
      students: '1,450+ Scholars',
    },
  ];

  const highlights = [
    {
      title: 'State-of-the-Art Computing & AI Lab',
      desc: 'KES 250M research complex equipped for software engineering, cyber defense, and robotics simulations.',
      image: '/innovation-hall.jpg',
      category: 'Research & Innovation',
    },
    {
      title: 'Chancellor’s Memorial Research Library',
      desc: 'Housing over 150,000 physical volumes and 24/7 digital access to global academic journals.',
      image: '/library.jpg',
      category: 'Academic Resources',
    },
    {
      title: 'Commercial Industry Training Ateliers',
      desc: 'Five-star culinary masterclass kitchens, solar test benches, and broadcast media studios.',
      image: '/culinary.jpg',
      category: 'Practical Skills',
    },
  ];

  return (
    <div className="space-y-24 pb-24 bg-[#FAF9F6]">
      {/* 1. Decluttered & Majestic Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-oxford-950 text-white text-center">
        {/* Cinematic Background with Clean Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="/campus-quad.jpg"
            alt="University of Upper Hill Campus"
            className="w-full h-full object-cover object-center filter brightness-50 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-oxford-950/85 via-oxford-950/60 to-oxford-950"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-400 text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chartered Public Institution • Nairobi, Kenya</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Excellence in Discovery, <br />
            <span className="italic font-normal text-gold-300 font-serif">Leadership</span> & Technology.
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Offering accredited <strong>Diploma, Certificate, Artisan, Short & Professional</strong> courses across 7 specialized academic schools.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => { quickLogin('student'); navigate('/student'); }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-oxford-950 font-bold text-sm shadow-xl shadow-gold-500/20 transition transform hover:-translate-y-0.5 flex items-center gap-2.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Enter Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/schools"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-sm transition flex items-center gap-2"
            >
              <span>Explore 7 Schools</span>
              <ArrowUpRight className="w-4 h-4 text-gold-400" />
            </Link>
          </div>

          {/* Minimalist Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-white/15 max-w-3xl mx-auto">
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-gold-400">20,000+</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Enrolled Scholars</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-white">7</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Academic Schools</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400">98.4%</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Graduate Placement</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-gold-300">TVETA & KNEC</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Accredited Programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Clean & Clear 7 Academic Schools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 px-3.5 py-1 rounded-full border border-gold-300">
            Academic Catalog
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-oxford-950">
            Academic Schools & Faculties
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light">
            Explore industry-aligned courses tailored for immediate workplace competency and certification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {schools.map((school, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-oxford-950/75 via-transparent to-transparent"></div>
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-oxford-950 bg-gold-400 px-2.5 py-0.5 rounded-full shadow">
                    {school.badge}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-base text-oxford-950 leading-snug group-hover:text-crimson-800 transition">
                    {school.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light line-clamp-2">
                    {school.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-oxford-800 bg-oxford-50 px-2.5 py-1 rounded-full">
                  {school.students}
                </span>
                <Link
                  to="/schools"
                  className="text-xs font-bold text-crimson-700 hover:text-crimson-800 flex items-center gap-1"
                >
                  <span>View Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Streamlined Campus & Facilities Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 px-3.5 py-1 rounded-full border border-gold-300">
            World-Class Infrastructure
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-oxford-950">
            Campus Learning Facilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light">
            Modern laboratories, research archives, and commercial practice centers designed for excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-oxford-950/80 backdrop-blur-md text-gold-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-serif font-bold text-lg text-oxford-950 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/news"
                  className="text-xs font-bold text-oxford-900 hover:text-crimson-700 inline-flex items-center gap-1.5 transition"
                >
                  <span>Read facility report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Streamlined Admissions & Portal Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-oxford-950 text-white p-8 sm:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-300 font-bold text-xs uppercase tracking-widest border border-gold-500/30">
              2024/2025 Admissions Window
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Claim Your Admission & Start Learning
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Verify your KUCCPS admission status, download your verified admission letter, and clear fees securely via Jiunge / Pesaflow M-Pesa.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link
              to="/admissions"
              className="px-7 py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-oxford-950 font-bold rounded-xl text-xs shadow-lg transition"
            >
              Admissions & Fee Guide
            </Link>
            <Link
              to="/login"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl text-xs transition"
            >
              Sign In to Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

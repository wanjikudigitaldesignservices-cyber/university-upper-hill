import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { NewsItem } from '../../types';
import {
  Calendar,
  Clock,
  Sparkles,
  Tag,
  ArrowRight,
  Share2,
  Bookmark,
} from 'lucide-react';

export const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const items = await api.getNews();
        setNews(items);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
          Public CMS Microservice • Layer 10
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
          News, Campus Notices & Press Releases
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Stay informed on research breakthroughs, academic schedules, admissions, and campus events.
        </p>
      </div>

      {/* Featured News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {news.map((item, idx) => (
          <article
            key={item.id}
            className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-full">
                  {item.category || 'General Notice'}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(item.created_at).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900 leading-snug hover:text-brand-700 transition cursor-pointer">
                {item.title}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {item.content}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.readTime || '3 min read'}</span>
              </span>
              <button
                onClick={() => alert(`Viewing article: ${item.title}`)}
                className="font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

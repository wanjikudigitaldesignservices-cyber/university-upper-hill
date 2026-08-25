import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { NewsItem } from '../../types';
import {
  FileText,
  Plus,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const CmsManagementPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Academics');
  const [success, setSuccess] = useState(false);

  const loadNews = async () => {
    const list = await api.getNews();
    setNews(list);
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    await api.createNews({
      title,
      content,
      category,
      published: true,
      readTime: '3 min read',
    });

    setTitle('');
    setContent('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    loadNews();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-950">CMS & News Dispatcher (Layer 10)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Admin gated publish workflow with edge-cache invalidation.
          </p>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Notice published to public edge cache successfully!</span>
        </div>
      )}

      {/* New Notice Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-navy-950">Draft & Publish New Campus Notice</h3>

        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. End of Semester Examination Timetable Published"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="Academics">Academics & Timetables</option>
              <option value="Admissions">Admissions & Intake</option>
              <option value="Student Welfare">Student Welfare & Hostels</option>
              <option value="Research & Innovation">Research & Innovation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              placeholder="Write the full announcement body..."
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Notice to Public CMS</span>
          </button>
        </form>
      </div>

      {/* Published News List */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-navy-950">Active Published Articles ({news.length})</h3>

        <div className="space-y-3">
          {news.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px] font-bold">
                  {item.category || 'General'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {new Date(item.created_at).toLocaleDateString('en-KE')}
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

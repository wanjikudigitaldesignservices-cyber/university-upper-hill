import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Tag,
  Search,
  BookOpen,
  Award,
  Eye,
} from 'lucide-react';

export const NewsPublicPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const articles = [
    {
      title: 'University of Upper Hill Inaugurates State-of-the-Art Computing & Robotics Innovation Amphitheatre',
      summary: 'The KES 250M centre was commissioned to spearhead hands-on AI, cybersecurity testing, and renewable energy research in East Africa.',
      image: '/innovation-hall.jpg',
      category: 'Research & Innovation',
      date: 'September 12, 2024',
      readTime: '3 min read',
      views: '2,450 views',
      featured: true,
    },
    {
      title: '14th Annual Commencement & Graduation Ceremony Dates Announced',
      summary: 'Over 4,200 candidates set to be awarded Diplomas, Higher Diplomas, Certificates, and Professional KASNEB qualifications.',
      image: '/graduation.jpg',
      category: 'Academic Calendar',
      date: 'September 08, 2024',
      readTime: '2 min read',
      views: '5,120 views',
      featured: false,
    },
    {
      title: 'School of Hospitality Unveils New Commercial Pastry & French Bakery Masterclass Suite',
      summary: 'Equipped with industrial French deck ovens and stainless steel master stations for City & Guilds international certification.',
      image: '/culinary.jpg',
      category: 'Campus Facilities',
      date: 'August 29, 2024',
      readTime: '4 min read',
      views: '1,890 views',
      featured: false,
    },
    {
      title: 'EPRA & NITA Solar PV Inverter Testing Facility Commissioned at Engineering Complex',
      summary: 'Hands-on grid-tie solar PV engineering workshops activated for Diploma and Artisan engineering scholars.',
      image: '/engineering-lab.jpg',
      category: 'Engineering & Technology',
      date: 'August 20, 2024',
      readTime: '3 min read',
      views: '1,430 views',
      featured: false,
    },
    {
      title: 'Chancellor’s Memorial Research Library Extends 24/7 Digital Repository & Study Pods',
      summary: 'Scholars gain unlimited remote access to over 150,000 journals, IEEE papers, ScienceDirect, and JSTOR databases.',
      image: '/library.jpg',
      category: 'Library & E-Resources',
      date: 'August 14, 2024',
      readTime: '2 min read',
      views: '3,200 views',
      featured: false,
    },
  ];

  const categories = ['All', 'Research & Innovation', 'Academic Calendar', 'Campus Facilities', 'Engineering & Technology', 'Library & E-Resources'];

  const filtered = articles.filter((a) => {
    const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#FAF9F6]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 px-4 py-1.5 rounded-full border border-gold-300">
          The University Gazette • Official Media & Dispatches
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-oxford-950 tracking-tight">
          News, Research & Campus Notices
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
          Stay informed on academic releases, faculty appointments, student innovations, and institutional milestones.
        </p>

        {/* Search & Category Filter */}
        <div className="pt-4 space-y-4 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search announcements, research updates, notices..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-300 rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === c
                    ? 'bg-oxford-950 text-gold-400 shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Headline Article */}
      {filtered.length > 0 && filtered[0].featured && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:shadow-2xl transition duration-300">
          <div className="lg:col-span-7 h-72 sm:h-96 lg:h-auto relative overflow-hidden">
            <img
              src={filtered[0].image}
              alt={filtered[0].title}
              className="w-full h-full object-cover object-center hover:scale-105 transition duration-700"
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-crimson-800 text-white font-bold text-xs uppercase tracking-wider shadow">
              Featured Dispatch
            </span>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="font-bold text-gold-800 bg-gold-100 px-2.5 py-0.5 rounded-full">{filtered[0].category}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {filtered[0].date}</span>
              </div>

              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-oxford-950 leading-tight">
                {filtered[0].title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                {filtered[0].summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {filtered[0].readTime}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {filtered[0].views}</span>
              </div>

              <button
                onClick={() => alert(`Reading: ${filtered[0].title}`)}
                className="text-xs font-bold text-oxford-900 hover:text-crimson-700 flex items-center gap-1.5 transition"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.slice(1).map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="h-52 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
                />
                <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                  {item.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </div>

                <h3 className="font-serif font-bold text-lg text-oxford-950 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-light">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Eye className="w-3 h-3" /> {item.views}
              </span>
              <button
                onClick={() => alert(`Reading: ${item.title}`)}
                className="text-xs font-bold text-crimson-700 hover:text-crimson-800 flex items-center gap-1"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

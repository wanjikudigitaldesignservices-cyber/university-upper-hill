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
  X,
  FileText,
  Download,
  Share2,
  CheckCircle2,
  Mail,
  Building,
  User,
  ChevronRight,
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string[];
  image: string;
  category: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  views: string;
  featured: boolean;
  relatedSchool: string;
  year: number;
}

export const NewsPublicPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const articles: Article[] = [
    {
      id: 'ai-innovation-hub-2026',
      title: 'University of Upper Hill Inaugurates State-of-the-Art Computing & AI Innovation Amphitheatre for 2026 Academic Year',
      subtitle: 'A KES 250M Multi-Disciplinary Research Complex Pioneering Cloud Infrastructure, African Natural Language Processing & Cybersecurity in East Africa',
      summary: 'Commissioned by the Ministry of Education and ICT Directorate, the new complex features 400 high-performance workstations, dedicated AI server clusters, and Cisco-certified networking suites.',
      content: [
        'The University of Upper Hill has officially inaugurated its flagship KES 250 Million Artificial Intelligence & Robotics Innovation Amphitheatre, marking a transformational milestone in African higher education for the 2026 academic calendar.',
        'Presided over by the Cabinet Secretary for Education alongside corporate partners from Google Cloud, Cisco, and Safaricom, the new complex bridges the gap between academic curriculum and high-growth industrial engineering.',
        '"Our objective is not merely to teach code, but to empower Kenyan youth to engineer sovereign digital systems, secure financial technology infrastructure, and pioneer climate modeling across sub-Saharan Africa," remarked Vice-Chancellor Prof. Mary Wanjiku during the keynote address.',
        'The innovation complex houses three specialized wings: The Alan Turing AI Center with GPU-accelerated computing nodes, the Cyber Defence Simulation Arena featuring real-time packet-capture telemetry, and the Embedded Robotics Workshop for IoT agricultural hardware.',
        'Starting in the First Semester of 2026, all Diploma and Professional ICT scholars will undergo practical rotations through the center, engaging in sponsored industry challenges with direct placement pathways into national and multinational tech enterprises.'
      ],
      image: '/innovation-hall.jpg',
      category: 'Research & Innovation',
      date: 'January 14, 2026',
      author: {
        name: 'Prof. Dennis Mwangi, PhD',
        role: 'Dean, School of ICT & Computer Science',
        avatar: '/logo.png'
      },
      readTime: '4 min read',
      views: '4,820 views',
      featured: true,
      relatedSchool: 'School of ICT & Computer Science',
      year: 2026,
    },
    {
      id: 'commencement-2026-announcement',
      title: '14th Annual Commencement Ceremony & 2026 Graduating Class Roll of Honor',
      subtitle: 'Over 4,200 Scholars Awarded Diplomas, Higher Diplomas, Certificates and Professional KASNEB Credentials at The University Grand Amphitheatre',
      summary: 'The University Chancellor conferred awards across all 7 academic schools, celebrating a record 98.4% graduate placement index.',
      content: [
        'The Chancellor of the University of Upper Hill, alongside members of the University Council, presided over the 14th Congregation for the Conferment of Diplomas and Certificates in a vibrant ceremony attended by over 10,000 guests, alumni, and industry dignitaries.',
        'The ceremony highlighted landmark accomplishments, including 620 distinction graduates in Banking & Finance, 840 certified software developers, and 510 licensed clinical health practitioners who immediately enter public and private hospital attachments.',
        'In her commencement address, Valedictorian Faith Chepkemoi (Diploma in Cyber Security & Digital Forensics) urged her peers to leverage their technical competencies for ethical innovation: "We step into the world equipped with both traditional rigor and modern mastery."',
        'The University Council also presented the 2026 Chancellor\'s Innovation Trophy to a four-member student engineering team that prototyped a low-cost solar-powered cold chain storage unit for rural horticultural cooperatives.'
      ],
      image: '/graduation.jpg',
      category: 'Academic Calendar',
      date: 'January 28, 2026',
      author: {
        name: 'Office of the Registrar',
        role: 'Directorate of Academic Affairs',
        avatar: '/logo.png'
      },
      readTime: '3 min read',
      views: '6,340 views',
      featured: false,
      relatedSchool: 'School of Business & Management',
      year: 2026,
    },
    {
      id: 'culinary-masterclass-2026',
      title: 'School of Hospitality Unveils 2026 International French Pastry & Mixology Training Atelier',
      subtitle: 'City & Guilds and TVETA Accredited Commercial Training Suite Establishes Direct Five-Star Hotel Placement Pipeline in Nairobi',
      summary: 'Equipped with industrial deck ovens, blast chillers, and espresso barista stations, the new atelier elevates vocational hospitality education.',
      content: [
        'The School of Hospitality & Tourism at the University of Upper Hill has launched its upgraded 2026 Commercial Gastronomy Studio and French Pastry Atelier, cementing its status as the premier hospitality academy in Kenya.',
        'Designed in accordance with 5-star international hotel culinary guidelines, the facility provides students in the Diploma in Culinary Arts and Food & Beverage Management with daily immersion in commercial banquet production, artisan sourdough baking, sugar art, and professional barista service.',
        '"Through our established partnerships with leading hotel groups including Serena Hotels, Radisson Blu, and Sarova, our students complete continuous industrial attachments with over 90% job retention prior to graduation," noted Dean Chef Beatrice Mutiso.',
        'Short courses in Professional Barista Skills and Cake Decoration Masterclasses for the 2026 weekend cohort are now open for public enrollment via the student admissions portal.'
      ],
      image: '/culinary.jpg',
      category: 'Campus Facilities',
      date: 'February 04, 2026',
      author: {
        name: 'Chef Beatrice Mutiso, MSc',
        role: 'Dean, School of Hospitality & Tourism',
        avatar: '/logo.png'
      },
      readTime: '3 min read',
      views: '3,110 views',
      featured: false,
      relatedSchool: 'School of Hospitality & Tourism',
      year: 2026,
    },
    {
      id: 'solar-engineering-epra-2026',
      title: 'EPRA & NITA Accredit New KES 45M Solar Photovoltaic & Microgrid Testing Laboratory',
      subtitle: 'School of Engineering Equips Technical Scholars for Kenya’s Clean Energy Grid Expansion with T1, T2 & T3 Practical Licenses',
      summary: 'Equipped with grid-tie inverters, battery storage banks, and robotic simulation arms, the facility trains licensed solar technicians.',
      content: [
        'The Energy and Petroleum Regulatory Authority (EPRA) and the National Industrial Training Authority (NITA) have formally certified the University of Upper Hill Renewable Energy Laboratory as a designated National Center of Excellence for Solar PV Training in Kenya.',
        'The facility allows students pursuing the Diploma in Electrical Engineering and Artisan in Electrical Installation to gain certified hands-on experience in sizing, installing, and troubleshooting grid-tied solar systems, commercial inverters, and lithium energy storage banks.',
        'With Kenya targeting 100% renewable electricity transition, certified solar installation professionals command high demand across agricultural estates, commercial real estate, and rural off-grid microgrid installations.',
        'Scholars enrolled in the 2026 academic calendar will sit their EPRA T1/T2 licensing examinations directly at the University examination center.'
      ],
      image: '/engineering-lab.jpg',
      category: 'Engineering & Technology',
      date: 'February 11, 2026',
      author: {
        name: 'Eng. Prof. Peter Kamau, PE',
        role: 'Dean, School of Engineering & Technology',
        avatar: '/logo.png'
      },
      readTime: '4 min read',
      views: '2,890 views',
      featured: false,
      relatedSchool: 'School of Engineering & Technology',
      year: 2026,
    },
    {
      id: 'media-studio-4k-launch-2026',
      title: 'Department of Journalism Launches Ultra-HD 4K Television & Digital Podcast Recording Studio',
      subtitle: 'State-of-the-Art Broadcast Complex Prepares Student Reporters for Modern Multimedia Newsrooms and Content Production',
      summary: 'Featuring multi-camera switcher consoles, teleprompter rigs, and acoustic podcast booths, student reporters broadcast live campus dispatches.',
      content: [
        'The School of Media & Communication has officially commissioned its upgraded Studio A Broadcast Complex, featuring full 4K ultra-high-definition cameras, computerized robotic teleprompters, digital audio mixing consoles, and dedicated podcasting booths.',
        'The studio powers Upper Hill News (UHN), the university\'s student-run broadcast service that produces weekly investigative bulletins, campus podcasts, and documentary specials distributed across digital and social channels.',
        '"Modern broadcast media demands agile journalists who can write investigative scripts, operate high-end camera rigs, edit digital video, and anchor live television," stated Leonard Kiprotich, Head of Broadcast Journalism.',
        'The studio also hosts corporate communications and public relations simulations, giving scholars real-world crisis PR training.'
      ],
      image: '/media-studio.jpg',
      category: 'Media & Communications',
      date: 'February 18, 2026',
      author: {
        name: 'Leonard Kiprotich, MA',
        role: 'Dean, School of Media & Communication',
        avatar: '/logo.png'
      },
      readTime: '3 min read',
      views: '2,640 views',
      featured: false,
      relatedSchool: 'School of Media & Communication',
      year: 2026,
    },
    {
      id: 'medical-simulation-hospital-2026',
      title: 'School of Health Sciences Partners with National Referral Hospitals for 2026 Clinical Rotations',
      subtitle: 'Clinical Skills Lab Simulates Emergency Trauma, Maternal Care, and Diagnostic Patient Monitoring Before Hospital Internships',
      summary: 'Interactive computerized mannequins and patient telemetry units provide real-time clinical training for community health nursing scholars.',
      content: [
        'The School of Health & Social Sciences has signed comprehensive memorandum of understanding (MoU) frameworks with leading national medical centers, guaranteeing clinical rotations for over 1,200 nursing, community health, and counseling scholars in 2026.',
        'Prior to hospital postings, students train in the University Clinical Simulation Hospital, practicing intravenous fluid administration, trauma resuscitation, neonatal care, and electronic health record documentation using interactive computerized patient simulators.',
        '"Patient safety and clinical precision require rigorous repetition in controlled environments. Our simulation suites ensure every graduate enters real hospital wards with confidence and high empathy," explained Dr. Sarah Chebet.',
        'The school also operates community health outreach clinics across Nairobi County, providing free preventive screenings, nutritional counseling, and mental health support.'
      ],
      image: '/health-lab.jpg',
      category: 'Health & Social Sciences',
      date: 'February 22, 2026',
      author: {
        name: 'Dr. Sarah Chebet, MBChB, MPH',
        role: 'Dean, School of Health & Social Sciences',
        avatar: '/logo.png'
      },
      readTime: '4 min read',
      views: '3,450 views',
      featured: false,
      relatedSchool: 'School of Health & Social Sciences',
      year: 2026,
    },
    {
      id: 'digital-design-runway-2026',
      title: 'School of Creative Arts Unveils 2026 Digital Animation Rigs & Annual Fashion Couture Runway',
      subtitle: 'Graphic UI/UX Designers, 3D Game Animators, and Apparel Stylists Showcase Commercial Portfolio Collections to Industry Employers',
      summary: 'Students work on high-end Wacom Cintiq drawing tablets, 3D character animation software, and artisan garment tailoring ateliers.',
      content: [
        'The School of Creative Arts & Design held its annual 2026 Design Vernissage and Runway Exhibition, showcasing over 150 original student projects ranging from mobile UI/UX application prototypes and 3D animated shorts to contemporary African haute couture collections.',
        'Creative agencies, advertising executives, and fashion design houses in attendance conducted instant on-site portfolio evaluations, offering 45 direct internships to graduating Diploma in Graphic Design and Fashion Technology scholars.',
        '"African storytelling, visual identity, and sustainable apparel design represent multi-billion-shilling growth sectors. We empower our creators with world-class digital tools and traditional textile craftsmanship," stated Dean Angela Nyambura.',
        'The school\'s digital labs are equipped with 4K color-accurate displays, professional render farms, and laser garment cutting machines.'
      ],
      image: '/creative-arts.jpg',
      category: 'Creative Arts & Design',
      date: 'February 25, 2026',
      author: {
        name: 'Ms. Angela Nyambura, MFA',
        role: 'Dean, School of Creative Arts & Design',
        avatar: '/logo.png'
      },
      readTime: '3 min read',
      views: '2,980 views',
      featured: false,
      relatedSchool: 'School of Creative Arts & Design',
      year: 2026,
    },
  ];

  const newsletters = [
    {
      title: 'University Gazette — Q1 2026 Edition (Vol. 14, Issue 1)',
      desc: 'Complete overview of the KES 250M AI Amphitheatre launch, graduation highlights, and 2026 academic admissions statistics.',
      date: 'February 2026',
      pages: '32 Pages',
      fileSize: '4.8 MB PDF',
      badge: 'Official Bulletin',
    },
    {
      title: '2026 Academic Calendar & Admissions Fee Structure Guide',
      desc: 'Semester schedules, exam timetables, Jiunge / Pesaflow fee clearance procedures, and KUCCPS student orientation roadmap.',
      date: 'January 2026',
      pages: '16 Pages',
      fileSize: '2.4 MB PDF',
      badge: 'Academic Guide',
    },
    {
      title: 'TVETA & KNEC Curriculum Competency Report 2026',
      desc: 'Accreditation audits, trade test guidelines for Engineering, Hospitality, ICT, and Health Sciences faculty programs.',
      date: 'February 2026',
      pages: '24 Pages',
      fileSize: '3.6 MB PDF',
      badge: 'Accreditation',
    },
  ];

  const categories = ['All', 'Research & Innovation', 'Academic Calendar', 'Campus Facilities', 'Engineering & Technology', 'Media & Communications', 'Health & Social Sciences', 'Creative Arts & Design'];

  const filtered = articles.filter((a) => {
    const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase()) || a.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 bg-[#FAF9F6]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 px-4 py-1.5 rounded-full border border-gold-300">
          The University Gazette • 2026 Editorial Dispatches & Newsletters
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-oxford-950 tracking-tight">
          University Blog, Research & 2026 Newsletters
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
          Official dispatches, faculty whitepapers, student milestones, and downloadable 2026 institutional newsletters from the University of Upper Hill.
        </p>

        {/* Search & Category Filter */}
        <div className="pt-4 space-y-4 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 2026 blog posts, newsletters, faculty dispatches..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-300 rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === c
                    ? 'bg-oxford-950 text-gold-400 shadow-md scale-105'
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
          <div className="lg:col-span-7 h-72 sm:h-96 lg:h-auto relative overflow-hidden group">
            <img
              src={filtered[0].image}
              alt={filtered[0].title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-oxford-950/80 via-transparent to-transparent"></div>
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-crimson-800 text-white font-bold text-xs uppercase tracking-wider shadow">
              2026 Flagship Dispatch
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

              <p className="text-xs text-slate-500 font-semibold italic">
                {filtered[0].subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light line-clamp-3">
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
                onClick={() => setActiveArticle(filtered[0])}
                className="px-4 py-2 bg-oxford-950 hover:bg-oxford-900 text-gold-400 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                <span>Read Full Blog Post</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Articles */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-bold text-2xl text-oxford-950">Recent Faculty Blogs & Updates</h3>
          <span className="text-xs text-slate-500 font-medium">Showing {filtered.length} Dispatches</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-oxford-950/70 via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                    {item.category}
                  </span>
                  <span className="absolute top-3 right-3 bg-gold-500 text-oxford-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">
                    {item.year}
                  </span>
                </div>

                <div className="p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-oxford-950 leading-snug group-hover:text-crimson-800 transition">
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
                  onClick={() => setActiveArticle(item)}
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

      {/* 2026 Downloadable Institutional Newsletters & Bulletins */}
      <section className="bg-gradient-to-br from-oxford-950 via-oxford-900 to-oxford-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl space-y-8 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Institutional Archives
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1">2026 University Newsletters & Bulletins</h3>
            <p className="text-xs text-slate-300 mt-1">Official quarterly gazettes and curriculum reports available for offline reading.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              2026 Volume 14 Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsletters.map((n, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-gold-400/40 transition flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md bg-gold-500/20 text-gold-300 text-[10px] font-bold uppercase tracking-wider">
                    {n.badge}
                  </span>
                  <span className="text-[11px] text-slate-400">{n.date}</span>
                </div>
                <h4 className="font-serif font-bold text-base text-white group-hover:text-gold-300 transition">
                  {n.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {n.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{n.pages} • {n.fileSize}</span>
                <button
                  onClick={() => alert(`Downloading: ${n.title} (${n.fileSize})`)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-gold-500 hover:text-oxford-950 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription Card */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg text-center max-w-3xl mx-auto space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-gold-100 text-gold-800 flex items-center justify-center mx-auto text-2xl shadow-sm">
          <Mail className="w-6 h-6 text-gold-700" />
        </div>

        <div className="space-y-2">
          <h3 className="font-serif font-bold text-2xl sm:text-3xl text-oxford-950">
            Subscribe to the 2026 University Gazette
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-light">
            Receive monthly academic dispatches, research discoveries, KUCCPS admissions announcements, and scholarship opportunities directly in your inbox.
          </p>
        </div>

        {subscribed ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Thank you for subscribing! You will receive our 2026 Academic Dispatches.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-gold-500 focus:outline-none font-medium"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-oxford-950 hover:bg-oxford-900 text-gold-400 font-bold text-xs rounded-xl shadow transition shrink-0"
            >
              Subscribe Now
            </button>
          </form>
        )}
      </section>

      {/* Full-Screen Interactive Article & Blog Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 my-auto relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-3 py-1 rounded-full bg-gold-500 text-oxford-950 font-extrabold text-[10px] uppercase tracking-wider shadow">
                  {activeArticle.category} • Year {activeArticle.year}
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white drop-shadow-md leading-tight">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-10 space-y-8">
              {/* Author & Timestamp Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-oxford-950 p-1 border-2 border-gold-400 flex items-center justify-center shrink-0">
                    <img src={activeArticle.author.avatar} alt="Author" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-oxford-950">{activeArticle.author.name}</h4>
                    <p className="text-[11px] text-slate-500">{activeArticle.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold-600" /> {activeArticle.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold-600" /> {activeArticle.readTime}</span>
                </div>
              </div>

              {/* Subtitle / Key Takeaway */}
              <div className="p-5 bg-gold-50 rounded-2xl border-l-4 border-gold-600 text-xs sm:text-sm text-oxford-950 font-medium italic leading-relaxed">
                "{activeArticle.subtitle}"
              </div>

              {/* Full Multi-Paragraph Blog Content */}
              <div className="space-y-5 text-slate-800 text-sm sm:text-base leading-relaxed font-light">
                {activeArticle.content.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Faculty Connection Card */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-bold text-gold-800 uppercase tracking-wider">Related Faculty Program</span>
                  <h4 className="font-serif font-bold text-sm text-oxford-950">{activeArticle.relatedSchool}</h4>
                  <p className="text-xs text-slate-500">Explore diplomas, certificates, and professional certifications in this field.</p>
                </div>
                <Link
                  to="/schools"
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2.5 bg-oxford-950 hover:bg-oxford-900 text-gold-400 font-bold text-xs rounded-xl shadow transition shrink-0 flex items-center gap-1"
                >
                  <span>Explore Courses</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => alert('Article link copied to clipboard!')}
                  className="text-xs font-bold text-slate-600 hover:text-oxford-950 flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4 text-gold-600" />
                  <span>Share Article</span>
                </button>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

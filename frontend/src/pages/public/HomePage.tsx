import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Building2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Home,
  CheckCircle2,
  Calendar,
  Sparkles,
  Globe,
  Compass,
  ArrowUpRight,
  Library,
  Flame,
  Wrench,
  Utensils,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { quickLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-20 pb-20 bg-[#FAF9F6]">
      {/* 1. Hero Section (Oxford / Harvard Editorial Caliber) */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-oxford-950 text-white">
        {/* Background Photo with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/campus-quad.jpg"
            alt="University of Upper Hill Campus Quad"
            className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse-slow filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-oxford-950 via-oxford-950/85 to-oxford-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-oxford-950 via-transparent to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Editorial Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-400 text-xs uppercase tracking-widest font-semibold">
                <Compass className="w-3.5 h-3.5 text-gold-400" />
                <span>Excellence Since Inception • Nairobi, Kenya</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                A Global Centre for <br />
                <span className="italic font-normal text-gold-300 font-serif">Discovery</span> &{' '}
                <span className="text-white">Leadership.</span>
              </h1>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl font-light">
                The <strong>University of Upper Hill</strong> offers accredited <strong>Diploma, Certificate, Artisan, Short & Professional</strong> courses across 7 distinct academic schools.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => { quickLogin('student'); navigate('/student'); }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-oxford-950 font-bold text-sm shadow-2xl shadow-gold-500/25 transition transform hover:-translate-y-0.5 flex items-center gap-3 tracking-wide"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Enter Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/admissions"
                  className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-sm transition flex items-center gap-2"
                >
                  <span>Admissions & Aid</span>
                  <ArrowUpRight className="w-4 h-4 text-gold-400" />
                </Link>
              </div>

              {/* Prestigious Metric Strip */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/15 max-w-lg">
                <div>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-gold-400">20,000+</p>
                  <p className="text-xs text-slate-300 uppercase tracking-wider mt-1">Scholars</p>
                </div>
                <div>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-white">7</p>
                  <p className="text-xs text-slate-300 uppercase tracking-wider mt-1">Schools</p>
                </div>
                <div>
                  <p className="font-serif text-3xl sm:text-4xl font-bold text-emerald-400">98.4%</p>
                  <p className="text-xs text-slate-300 uppercase tracking-wider mt-1">Career Success</p>
                </div>
              </div>
            </div>

            {/* Right Card: Institutional Gateways */}
            <div className="lg:col-span-5">
              <div className="bg-oxford-900/90 backdrop-blur-xl rounded-3xl p-7 sm:p-8 shadow-2xl border border-white/15 relative space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white p-0.5 shadow-md flex items-center justify-center">
                      <img src="/logo.png" alt="Crest" className="w-7 h-7 object-contain" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-white text-base">University Gateways</h3>
                      <p className="text-[11px] text-gold-400 uppercase tracking-wider">Role-Gated Microservices</p>
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                </div>

                <div className="space-y-3">
                  <div
                    onClick={() => { quickLogin('student'); navigate('/student'); }}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-emerald-950/50 border border-white/10 hover:border-emerald-500/40 cursor-pointer transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-gold-300 transition">Student ERP Portal</h4>
                          <p className="text-xs text-slate-300">Transcripts, Jiunge M-Pesa fees, hostel locks</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-gold-400 group-hover:translate-x-1 transition" />
                    </div>
                  </div>

                  <div
                    onClick={() => { quickLogin('faculty'); navigate('/staff'); }}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-blue-950/50 border border-white/10 hover:border-blue-500/40 cursor-pointer transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-blue-300 transition">Faculty & Lecturer Portal</h4>
                          <p className="text-xs text-slate-300">Class rosters, marks entry & grading</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
                    </div>
                  </div>

                  <div
                    onClick={() => { quickLogin('ict-admin'); navigate('/admin'); }}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-crimson-950/50 border border-white/10 hover:border-crimson-500/40 cursor-pointer transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-crimson-500/20 text-crimson-300 flex items-center justify-center font-bold">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-crimson-300 transition">ICT Directorate & Admin</h4>
                          <p className="text-xs text-slate-300">Microservice health, CMS, payment ledger</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-crimson-400 group-hover:translate-x-1 transition" />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-300 flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Direct Jiunge/Pesaflow M-Pesa STK push clearance active.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Research Pillar & Modern Lecture Hall Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-crimson-700">
              <Award className="w-4 h-4" />
              <span>State-of-the-Art Facilities</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-oxford-950 leading-tight">
              Pioneering Artificial Intelligence, Software Engineering & Robotics
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              At the University of Upper Hill, academic theory converges with hands-on technical mastery. Our computing amphitheatre and Cisco/EC-Council certified cybersecurity labs prepare students for immediate high-growth tech careers.
            </p>

            <blockquote className="p-5 rounded-2xl bg-white border-l-4 border-gold-600 shadow-sm text-xs sm:text-sm text-slate-800 italic font-serif">
              "We prepare scholars not just for employment, but to build and lead the technical and enterprise infrastructure of Africa."
              <footer className="mt-2 font-sans font-bold text-oxford-900 not-italic text-xs">
                — Prof. Mary Wanjiku, PhD, Registrar of Academic Affairs
              </footer>
            </blockquote>

            <div className="pt-2">
              <Link
                to="/schools"
                className="inline-flex items-center gap-2 text-sm font-bold text-oxford-900 hover:text-crimson-700 transition"
              >
                <span>Explore all 7 Academic Schools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative group">
              <img
                src="/innovation-hall.jpg"
                alt="University Innovation Hall"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-oxford-950/90 via-transparent to-transparent flex items-end p-6 sm:p-8 text-white">
                <div>
                  <span className="px-2.5 py-1 rounded bg-gold-500 text-oxford-950 font-bold text-[10px] uppercase tracking-wider">
                    Innovation Hub
                  </span>
                  <h4 className="font-serif font-bold text-lg sm:text-xl mt-2">Computing & Robotics Amphitheatre</h4>
                  <p className="text-xs text-slate-300 mt-1">Equipped with enterprise cloud workstations, data analytics clusters, and AI modeling sandboxes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Grand University Research Library Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-oxford-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 p-8 sm:p-12 text-white space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-400">
              <Library className="w-4 h-4" />
              <span>Bodleian & Harvard Standard</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              The Chancellor's Memorial Research Library
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              Housing over 150,000 physical volumes, 24/7 digital journal subscriptions (IEEE, Springer, ScienceDirect, JSTOR), silent study galleries, and high-speed research pods.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/15">
              <div>
                <p className="font-serif text-2xl font-bold text-gold-400">150,000+</p>
                <p className="text-xs text-slate-400">Academic Books & Volumes</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-emerald-400">24 / 7</p>
                <p className="text-xs text-slate-400">E-Library & Journal Access</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 h-80 sm:h-96 lg:h-full min-h-[350px] relative">
            <img
              src="/library.jpg"
              alt="Grand University Research Library"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-oxford-950/80 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 4. Dual Hands-On Showcase: Engineering Labs & Culinary Hospitality Kitchens */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
            TVET & Professional Industry Labs
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-oxford-950">Hands-On Practical Excellence</h3>
          <p className="text-sm text-slate-600">
            Our students train in industry-grade workshops and commercial facilities before graduation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Engineering Workshop */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition flex flex-col justify-between">
            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img
                src="/engineering-lab.jpg"
                alt="Renewable Energy & Solar Engineering Lab"
                className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 bg-oxford-950/80 backdrop-blur-md text-gold-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/15">
                EPRA & NITA Accredited Lab
              </span>
            </div>
            <div className="p-7 space-y-3">
              <h4 className="font-serif font-bold text-xl text-oxford-950">
                School of Engineering & Solar Technology
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Featuring real-world solar PV inverters, automated robotic arms, electrical grid simulators, and automotive mechanical engine diagnostic rigs.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Diploma • Certificate • Artisan
                </span>
                <Link to="/schools" className="text-xs font-bold text-crimson-700 hover:text-crimson-800 flex items-center gap-1">
                  <span>View Engineering Units</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Hospitality & Culinary Studio */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition flex flex-col justify-between">
            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img
                src="/culinary.jpg"
                alt="5-Star Commercial Hospitality & Culinary Kitchen"
                className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 bg-oxford-950/80 backdrop-blur-md text-gold-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/15">
                City & Guilds 5-Star Kitchen
              </span>
            </div>
            <div className="p-7 space-y-3">
              <h4 className="font-serif font-bold text-xl text-oxford-950">
                School of Hospitality & Culinary Arts
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stainless-steel professional training kitchens, French pastry bakery studios, mixology cocktail bars, and simulated 5-star front desk suites.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-orange-800 bg-orange-50 px-2.5 py-1 rounded-full">
                  Diploma • Food & Beverage • Pastry
                </span>
                <Link to="/schools" className="text-xs font-bold text-crimson-700 hover:text-crimson-800 flex items-center gap-1">
                  <span>View Culinary Units</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The 7 Academic Schools Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
            7 Academic Schools • Accredited Programs
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-oxford-950">Academic Schools & Course Offerings</h3>
          <p className="text-sm text-slate-600">
            The college offers <strong>Diploma, Certificate, Artisan, Short, and Professional</strong> courses across 7 distinct faculties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            { name: 'School of Business & Management', desc: 'Diploma, Certificate, CPA & Executive courses in Finance, HR & Supply Chain.', badge: '3,450 Students', icon: '📈', levels: 'Diploma • Cert • CPA' },
            { name: 'School of ICT & Computer Science', desc: 'Software engineering, cybersecurity, data science, CCNA, cloud & AI.', badge: '2,850 Students', icon: '💻', levels: 'Diploma • Cert • Artisan' },
            { name: 'School of Engineering & Technology', desc: 'Electrical power, automotive mechanics, civil masonry, plumbing & solar PV.', badge: '2,100 Students', icon: '⚡', levels: 'Diploma • Cert • Artisan' },
            { name: 'School of Hospitality & Tourism', desc: 'Culinary arts, pastry bakery, food & beverage, cabin crew & barista skills.', badge: '1,950 Students', icon: '🏨', levels: 'Diploma • Cert • Short' },
            { name: 'School of Media & Communication', desc: 'Broadcast journalism, TV/radio presenting, public relations & digital strategy.', badge: '1,600 Students', icon: '🎙️', levels: 'Diploma • Cert • Short' },
            { name: 'School of Health & Social Sciences', desc: 'Community health, social work, counseling psychology & disaster management.', badge: '2,300 Students', icon: '🩺', levels: 'Diploma • Cert • Artisan' },
            { name: 'School of Creative Arts & Design', desc: 'Graphic design, 2D/3D animation, fashion textile styling & interior staging.', badge: '1,450 Students', icon: '🎨', levels: 'Diploma • Cert • Artisan' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-7 bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-[10px] font-bold text-gold-800 bg-gold-50 px-2 py-0.5 rounded-full border border-gold-200">{item.levels}</span>
                </div>
                <h4 className="font-serif font-bold text-base text-oxford-950 leading-snug">{item.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-oxford-800 bg-oxford-50 px-2.5 py-1 rounded-full">{item.badge}</span>
                <Link to="/schools" className="text-xs font-bold text-crimson-700 hover:text-crimson-800 flex items-center gap-1">
                  <span>View Units</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Grand Graduation Commencement Showcase & Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-oxford-950 text-white min-h-[420px] flex items-center">
          <img
            src="/graduation.jpg"
            alt="Commencement Ceremony"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-oxford-950 via-oxford-950/80 to-transparent"></div>

          <div className="relative z-10 p-8 sm:p-14 max-w-2xl space-y-4">
            <span className="px-3.5 py-1.5 rounded-full bg-gold-500/20 text-gold-300 font-bold text-xs uppercase tracking-widest border border-gold-500/30">
              2024/2025 Admissions Window
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Begin Your Academic Journey Today
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              Join thousands of scholars achieving academic excellence. Download your official admission letter, complete fee clearance via Jiunge M-Pesa, and reserve your hostel in minutes.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => { quickLogin('student'); navigate('/student'); }}
                className="px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-oxford-950 font-bold rounded-xl text-sm shadow-xl transition"
              >
                Access Student Portal
              </button>
              <Link
                to="/admissions"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl text-sm transition"
              >
                Claim Admission Letter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

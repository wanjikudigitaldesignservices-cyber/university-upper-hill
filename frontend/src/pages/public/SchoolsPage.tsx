import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  GraduationCap,
  Building,
  Search,
  Users,
  ChevronRight,
  Sparkles,
  Award,
  Clock,
  Layers,
  Filter,
} from 'lucide-react';

export const SchoolsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const schools = [
    {
      name: 'School of Business & Management',
      icon: '📈',
      color: 'border-blue-500/30 bg-blue-50/50',
      dean: 'Dr. James Ochieng, PhD, CPA(K)',
      students: '3,450+ Scholars',
      desc: 'Developing visionary business leaders, chartered accountants, supply chain strategists, and innovative entrepreneurs.',
      departments: [
        {
          name: 'Department of Accounting & Finance',
          courses: [
            { name: 'Diploma in Banking & Finance', level: 'Diploma', duration: '2 Years', examBody: 'KNEC / TVET' },
            { name: 'Certificate in Accounting & Financial Studies', level: 'Certificate', duration: '1 Year', examBody: 'KNEC' },
            { name: 'Certified Public Accountants (CPA Section 1-6)', level: 'Professional', duration: '6 Months/Part', examBody: 'KASNEB' },
            { name: 'Accounting with QuickBooks & Sage ERP', level: 'Short Course', duration: '8 Weeks', examBody: 'UUH Certified' },
          ],
        },
        {
          name: 'Department of Business Administration & Management',
          courses: [
            { name: 'Diploma in Business Management', level: 'Diploma', duration: '2 Years', examBody: 'KNEC' },
            { name: 'Diploma in Human Resource Management', level: 'Diploma', duration: '2 Years', examBody: 'KNEC / IHRM' },
            { name: 'Certificate in Business Administration', level: 'Certificate', duration: '1 Year', examBody: 'KNEC' },
            { name: 'Artisan in Storekeeping & Clerical Operations', level: 'Artisan', duration: '1 Year', examBody: 'KNEC' },
            { name: 'Executive Leadership & Strategic Management', level: 'Professional', duration: '3 Months', examBody: 'UUH Executive' },
          ],
        },
        {
          name: 'Department of Procurement & Supply Chain',
          courses: [
            { name: 'Diploma in Supply Chain Management', level: 'Diploma', duration: '2 Years', examBody: 'KNEC / CIPS' },
            { name: 'Certified Procurement & Supply Professional (CPSP-K)', level: 'Professional', duration: '1 Year', examBody: 'KISM' },
            { name: 'Certificate in Purchasing & Supplies', level: 'Certificate', duration: '1 Year', examBody: 'KNEC' },
          ],
        },
      ],
    },
    {
      name: 'School of ICT & Computer Science',
      icon: '💻',
      color: 'border-emerald-500/30 bg-emerald-50/50',
      dean: 'Prof. Dennis Mwangi, PhD (Computer Science)',
      students: '2,850+ Scholars',
      desc: 'Leading technological discovery, software engineering, cybersecurity, cloud architecture, and artificial intelligence.',
      departments: [
        {
          name: 'Department of Computing & Software Engineering',
          courses: [
            { name: 'Diploma in Information Communication Technology (DICT)', level: 'Diploma', duration: '2 Years', examBody: 'KNEC' },
            { name: 'Diploma in Software Development & Cloud Engineering', level: 'Diploma', duration: '2 Years', examBody: 'TVET / CDACC' },
            { name: 'Certificate in Information Technology', level: 'Certificate', duration: '1 Year', examBody: 'KNEC' },
            { name: 'Artisan in Computer Applications & Maintenance', level: 'Artisan', duration: '1 Year', examBody: 'KNEC' },
          ],
        },
        {
          name: 'Department of Cyber Security & Networking',
          courses: [
            { name: 'Diploma in Cyber Security & Digital Forensics', level: 'Diploma', duration: '2 Years', examBody: 'KNEC / EC-Council' },
            { name: 'Cisco Certified Network Associate (CCNA 200-301)', level: 'Professional', duration: '3 Months', examBody: 'CISCO' },
            { name: 'Ethical Hacking & Vulnerability Assessment', level: 'Short Course', duration: '6 Weeks', examBody: 'UUH CyberHub' },
            { name: 'CompTIA Security+ & Network+', level: 'Professional', duration: '2 Months', examBody: 'CompTIA' },
          ],
        },
        {
          name: 'Department of Data Science & Artificial Intelligence',
          courses: [
            { name: 'Data Analytics with Python, SQL & PowerBI', level: 'Short Course', duration: '10 Weeks', examBody: 'UUH TechHub' },
            { name: 'Full-Stack Web & Mobile App Engineering (React/Node)', level: 'Short Course', duration: '12 Weeks', examBody: 'UUH CodeCamp' },
          ],
        },
      ],
    },
    {
      name: 'School of Engineering & Technology',
      icon: '⚡',
      color: 'border-amber-500/30 bg-amber-50/50',
      dean: 'Eng. Prof. Peter Kamau, PE, FIEK',
      students: '2,100+ Scholars',
      desc: 'Delivering hands-on technical competencies in electrical power systems, automotive technology, civil structures, and solar engineering.',
      departments: [
        {
          name: 'Department of Electrical & Electronics Engineering',
          courses: [
            { name: 'Diploma in Electrical & Electronic Engineering (Power/Telecom)', level: 'Diploma', duration: '3 Years', examBody: 'KNEC' },
            { name: 'Certificate in Electrical Installation', level: 'Certificate', duration: '2 Years', examBody: 'KNEC / EPRA' },
            { name: 'Artisan in Electrical Installation', level: 'Artisan', duration: '1 Year', examBody: 'KNEC / NITA' },
            { name: 'Solar PV Systems Installation & Grid Tie (T1/T2/T3)', level: 'Short Course', duration: '6 Weeks', examBody: 'EPRA Certified' },
          ],
        },
        {
          name: 'Department of Civil & Construction Engineering',
          courses: [
            { name: 'Diploma in Building Technology & Civil Engineering', level: 'Diploma', duration: '3 Years', examBody: 'KNEC' },
            { name: 'Certificate in Building & Construction', level: 'Certificate', duration: '2 Years', examBody: 'KNEC' },
            { name: 'Artisan in Masonry & Concrete Construction', level: 'Artisan', duration: '1 Year', examBody: 'KNEC / NITA' },
            { name: 'Artisan in Plumbing & Pipe Fitting', level: 'Artisan', duration: '1 Year', examBody: 'KNEC / NITA' },
            { name: 'AutoCAD & ArchiCAD Architectural Drafting', level: 'Short Course', duration: '8 Weeks', examBody: 'UUH CAD Lab' },
          ],
        },
        {
          name: 'Department of Mechanical & Automotive Technology',
          courses: [
            { name: 'Diploma in Automotive Engineering', level: 'Diploma', duration: '3 Years', examBody: 'KNEC' },
            { name: 'Certificate in Motor Vehicle Mechanics', level: 'Certificate', duration: '2 Years', examBody: 'KNEC' },
            { name: 'Artisan in Motor Vehicle Mechanics', level: 'Artisan', duration: '1 Year', examBody: 'KNEC / NITA' },
            { name: 'Arc & Gas Welding / Fabrication Technology', level: 'Short Course', duration: '6 Weeks', examBody: 'NITA' },
          ],
        },
      ],
    },
    {
      name: 'School of Hospitality & Tourism',
      icon: '🏨',
      color: 'border-orange-500/30 bg-orange-50/50',
      dean: 'Chef Beatrice Mutiso, MSc (Hospitality)',
      students: '1,950+ Scholars',
      desc: 'Equipping culinary experts, pastry chefs, front office managers, and tourism travel consultants for 5-star international standards.',
      departments: [
        {
          name: 'Department of Food & Beverage / Culinary Arts',
          courses: [
            { name: 'Diploma in Food & Beverage Management', level: 'Diploma', duration: '2 Years', examBody: 'KNEC' },
            { name: 'Diploma in Culinary Arts & Professional Cookery', level: 'Diploma', duration: '2 Years', examBody: 'City & Guilds / KNEC' },
            { name: 'Certificate in Food & Beverage Production and Service', level: 'Certificate', duration: '1 Year', examBody: 'KNEC' },
            { name: 'Artisan in Food & Beverage Production', level: 'Artisan', duration: '1 Year', examBody: 'KNEC / NITA' },
            { name: 'Pastry, Bakery & Cake Decoration Masterclass', level: 'Short Course', duration: '6 Weeks', examBody: 'UUH Culinary Studio' },
            { name: 'Professional Barista & Mixology Skills', level: 'Short Course', duration: '4 Weeks', examBody: 'UUH Bar Academy' },
          ],
        },
        {
          name: 'Department of Hotel & Tourism Management',
          courses: [
            { name: 'Diploma in Tourism & Travel Management', level: 'Diploma', duration: '2 Years', examBody: 'KNEC / IATA' },
            { name: 'Diploma in Hospitality Management & Front Office', level: 'Diploma', duration: '2 Years', examBody: 'KNEC' },
            { name: 'Certificate in Tour Guiding & Operations', level: 'Certificate', duration: '1 Year', examBody: 'KNEC' },
            { name: 'IATA Airline Cabin Crew & Ticketing (Amadeus/Galileo)', level: 'Professional', duration: '6 Months', examBody: 'IATA International' },
          ],
        },
      ],
    },
    {
      name: 'School of Media & Communication',
      icon: '🎙️',
      color: 'border-purple-500/30 bg-purple-50/50',
      dean: 'Mr. Leonard Kiprotich, MA (Journalism)',
      students: '1,600+ Scholars',
      desc: 'Nurturing investigative journalists, broadcast TV/Radio producers, corporate PR executives, and digital content creators.',
      departments: [
        {
          name: 'Department of Broadcast & Print Journalism',
          courses: [
            { name: 'Diploma in Journalism & Mass Communication', level: 'Diploma', duration: '2 Years', examBody: 'KNEC' },
            { name: 'Certificate in Journalism & Broadcast Media', level: 'Certificate', duration: '1 Year', examBody: 'KNEC' },
            { name: 'Radio & TV Presenting / Voiceover Mastery', level: 'Short Course', duration: '8 Weeks', examBody: 'UUH Media Lab' },
          ],
        },
        {
          name: 'Department of Public Relations & Corporate Communication',
          courses: [
            { name: 'Diploma in Public Relations & Advertising', level: 'Diploma', duration: '2 Years', examBody: 'KNEC / PRSK' },
            { name: 'Digital Marketing & Social Media Strategy', level: 'Short Course', duration: '6 Weeks', examBody: 'UUH Digital' },
            { name: 'Corporate Brand Management & Event Planning', level: 'Short Course', duration: '6 Weeks', examBody: 'UUH Executive' },
          ],
        },
      ],
    },
    {
      name: 'School of Health & Social Sciences',
      icon: '🩺',
      color: 'border-teal-500/30 bg-teal-50/50',
      dean: 'Dr. Sarah Chebet, MBChB, MPH',
      students: '2,300+ Scholars',
      desc: 'Advancing community health, counseling psychology, social work, disaster management, and medical laboratory sciences.',
      departments: [
        {
          name: 'Department of Community Health & Development',
          courses: [
            { name: 'Diploma in Community Health & Development', level: 'Diploma', duration: '2 Years', examBody: 'KNEC' },
            { name: 'Diploma in Social Work & Community Development', level: 'Diploma', duration: '2 Years', examBody: 'KNEC' },
            { name: 'Certificate in Community Health Nursing / Aide', level: 'Certificate', duration: '1 Year', examBody: 'KNEC' },
            { name: 'Artisan in Community Development & Nutrition', level: 'Artisan', duration: '1 Year', examBody: 'KNEC' },
          ],
        },
        {
          name: 'Department of Counseling Psychology & Social Studies',
          courses: [
            { name: 'Diploma in Counseling Psychology', level: 'Diploma', duration: '2 Years', examBody: 'KNEC / KPA' },
            { name: 'Certificate in Psychological Counseling', level: 'Certificate', duration: '1 Year', examBody: 'KNEC' },
            { name: 'Disaster Risk Reduction & First Aid Certification', level: 'Short Course', duration: '4 Weeks', examBody: 'Red Cross / UUH' },
          ],
        },
      ],
    },
    {
      name: 'School of Creative Arts & Design',
      icon: '🎨',
      color: 'border-rose-500/30 bg-rose-50/50',
      dean: 'Ms. Angela Nyambura, MFA',
      students: '1,450+ Scholars',
      desc: 'Inspiring graphic illustrators, interior architects, fashion stylists, animators, and digital visual storytellers.',
      departments: [
        {
          name: 'Department of Graphic Design & Digital Animation',
          courses: [
            { name: 'Diploma in Graphic Design & Digital Media', level: 'Diploma', duration: '2 Years', examBody: 'KNEC' },
            { name: 'Diploma in 2D/3D Animation & Motion Graphics', level: 'Diploma', duration: '2 Years', examBody: 'TVET / CDACC' },
            { name: 'Certificate in Graphic Design & UI/UX Essentials', level: 'Certificate', duration: '1 Year', examBody: 'KNEC' },
            { name: 'Adobe Creative Suite (Photoshop, Illustrator, Premiere)', level: 'Short Course', duration: '8 Weeks', examBody: 'UUH Design Studio' },
          ],
        },
        {
          name: 'Department of Fashion Design & Interior Styling',
          courses: [
            { name: 'Diploma in Fashion Design & Garment Making', level: 'Diploma', duration: '2 Years', examBody: 'KNEC' },
            { name: 'Certificate in Fashion Design & Textile Technology', level: 'Certificate', duration: '1 Year', examBody: 'KNEC' },
            { name: 'Artisan in Garment Making & Tailoring', level: 'Artisan', duration: '1 Year', examBody: 'KNEC / NITA' },
            { name: 'Interior Space Design & Commercial Staging', level: 'Short Course', duration: '8 Weeks', examBody: 'UUH Atelier' },
          ],
        },
      ],
    },
  ];

  const levels = ['All', 'Diploma', 'Certificate', 'Artisan', 'Short Course', 'Professional'];

  const filteredSchools = schools.map((school) => {
    const filteredDepts = school.departments.map((dept) => {
      const filteredCourses = dept.courses.filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.examBody.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dept.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;

        return matchesSearch && matchesLevel;
      });

      return { ...dept, courses: filteredCourses };
    }).filter((d) => d.courses.length > 0);

    return { ...school, departments: filteredDepts };
  }).filter((s) => s.departments.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-[#FAF9F6]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-800 bg-gold-100 px-4 py-1.5 rounded-full border border-gold-300">
          7 Academic Schools • Accredited Programs
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-oxford-950 tracking-tight">
          Academic Schools & Course Catalog
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-light">
          The college offers comprehensive <strong>Diploma, Certificate, Artisan, Short, and Professional</strong> courses across 7 distinct academic schools equipped with modern labs and industry accreditations.
        </p>

        {/* Search & Qualification Level Filter */}
        <div className="pt-4 space-y-4 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search course title (e.g. Cyber Security, CPA, Culinary Arts, Electrical)..."
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-300 rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-gold-500 focus:outline-none font-medium"
            />
          </div>

          {/* Level Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedLevel === lvl
                    ? 'bg-oxford-900 text-gold-400 shadow-md scale-105'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {lvl === 'All' ? 'All Qualifications' : `${lvl} Courses`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Schools & Departments List */}
      <div className="space-y-10">
        {filteredSchools.map((school, sIdx) => (
          <div
            key={sIdx}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* School Header */}
            <div className="bg-oxford-950 text-white px-6 sm:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl shrink-0">
                  {school.icon}
                </div>
                <div>
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-white">{school.name}</h2>
                  <p className="text-xs text-gold-400 mt-0.5">Dean: {school.dean}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 self-start md:self-auto">
                <span className="text-xs font-bold text-slate-200 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10">
                  {school.students}
                </span>
                <Link
                  to="/login"
                  className="px-4 py-1.5 bg-gold-500 hover:bg-gold-400 text-oxford-950 font-bold text-xs rounded-xl shadow transition"
                >
                  Apply Online
                </Link>
              </div>
            </div>

            {/* School Overview Blurb */}
            <div className="px-6 sm:px-8 pt-5 pb-2 text-xs text-slate-600 border-b border-slate-100 italic">
              {school.desc}
            </div>

            {/* Departments & Courses Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {school.departments.map((dept, dIdx) => (
                <div key={dIdx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-oxford-900 font-bold text-sm">
                      <Building className="w-4 h-4 text-gold-600 shrink-0" />
                      <h3>{dept.name}</h3>
                    </div>

                    <div className="space-y-2 pt-1">
                      {dept.courses.map((course, cIdx) => (
                        <div
                          key={cIdx}
                          className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-gold-500/50 transition"
                        >
                          <div className="space-y-0.5">
                            <h4 className="font-bold text-xs text-slate-900">{course.name}</h4>
                            <p className="text-[10px] text-slate-500">
                              Duration: <span className="font-semibold text-slate-700">{course.duration}</span> • Exam Body: <span className="font-semibold text-oxford-900">{course.examBody}</span>
                            </p>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider self-start sm:self-auto shrink-0 ${
                              course.level === 'Diploma'
                                ? 'bg-blue-100 text-blue-800'
                                : course.level === 'Certificate'
                                ? 'bg-emerald-100 text-emerald-800'
                                : course.level === 'Artisan'
                                ? 'bg-amber-100 text-amber-800'
                                : course.level === 'Professional'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {course.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 text-right">
                    <Link
                      to="/admissions"
                      className="text-[11px] font-bold text-crimson-700 hover:text-crimson-800 inline-flex items-center gap-1"
                    >
                      <span>Fee Structure & Requirements</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

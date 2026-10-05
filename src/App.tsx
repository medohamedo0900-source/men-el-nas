import React, { useState, useEffect, useMemo } from 'react';
import { CommunityListing, SEED_LISTINGS, ScopeType } from './data/seedListings';
import { EGYPT_GOVERNORATES } from './data/egyptData';
import { Header } from './components/Header';
import { ListingCard } from './components/ListingCard';
import { AddListingModal } from './components/AddListingModal';
import { WaqfCharterModal } from './components/WaqfCharterModal';
import { PublicationGuideModal } from './components/PublicationGuideModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AdSenseBanner } from './components/AdSenseBanner';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Heart, 
  Briefcase, 
  AlertCircle, 
  RotateCcw, 
  ScrollText, 
  CheckCircle2, 
  Layers,
  Bookmark,
  ArrowUpDown,
  Download,
  Upload,
  HeartHandshake,
  ShieldCheck,
  Activity,
  Rocket
} from 'lucide-react';

export default function App() {
  const [listings, setListings] = useState<CommunityListing[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCharterModalOpen, setIsCharterModalOpen] = useState(false);
  const [isPublicationGuideOpen, setIsPublicationGuideOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Filters & State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedScope, setSelectedScope] = useState<ScopeType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'rating'>('newest');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Load listings and bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('community_listings_v2');
    if (saved) {
      try {
        setListings(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading stored listings', e);
        setListings(SEED_LISTINGS);
      }
    } else {
      setListings(SEED_LISTINGS);
      localStorage.setItem('community_listings_v2', JSON.stringify(SEED_LISTINGS));
    }

    const savedBookmarks = localStorage.getItem('community_bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarkedIds(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Error loading bookmarks', e);
      }
    }

    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Sync dark mode class on document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle adding new listing
  const handleAddListing = (newListing: CommunityListing) => {
    const updated = [newListing, ...listings];
    setListings(updated);
    localStorage.setItem('community_listings_v2', JSON.stringify(updated));
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('community_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // Export Data to JSON backup
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(listings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `men_el_nas_data_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import Data from JSON
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            setListings(parsed);
            localStorage.setItem('community_listings_v2', JSON.stringify(parsed));
            alert('تم استيراد البيانات بنجاح في الدليل!');
          }
        } catch (error) {
          alert('الملف غير صالح أو التنسيق غير متوافق.');
        }
      };
    }
  };

  // Cities for current selected governorate
  const currentGovCities = useMemo(() => {
    if (selectedGovernorate === 'all') return [];
    const govObj = EGYPT_GOVERNORATES.find(g => g.name === selectedGovernorate);
    return govObj ? govObj.cities : [];
  }, [selectedGovernorate]);

  // Filter & sort listings dynamically
  const filteredListings = useMemo(() => {
    let result = listings.filter(item => {
      // Bookmark filter
      if (showBookmarksOnly && !bookmarkedIds.includes(item.id)) return false;

      // Scope filter
      if (selectedScope !== 'all' && item.scope !== selectedScope) return false;

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Governorate filter
      if (selectedGovernorate !== 'all' && item.governorate !== selectedGovernorate) return false;

      // City filter
      if (selectedCity !== 'all' && item.city !== selectedCity) return false;

      // Text search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchProvider = item.providerName.toLowerCase().includes(q);
        const matchPhone = item.phone.includes(q);
        const matchCity = item.city.toLowerCase().includes(q);
        const matchGov = item.governorate.toLowerCase().includes(q);

        if (!matchTitle && !matchDesc && !matchProvider && !matchPhone && !matchCity && !matchGov) {
          return false;
        }
      }

      return true;
    });

    // Sort result
    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    }

    return result;
  }, [listings, selectedScope, selectedCategory, selectedGovernorate, selectedCity, searchQuery, sortBy, showBookmarksOnly, bookmarkedIds]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGovernorate('all');
    setSelectedCity('all');
    setSelectedScope('all');
    setSelectedCategory('all');
    setShowBookmarksOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] dark:bg-[#0a0f0d] text-[#1a231f] dark:text-[#ebedea] flex flex-col font-sans antialiased transition-colors duration-200 pb-20 md:pb-8 select-none">
      
      {/* Top Bar Header */}
      <Header
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenCharterModal={() => setIsCharterModalOpen(true)}
        onOpenPublicationGuide={() => setIsPublicationGuideOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Hero Banner with Egyptian Waqf Branding */}
      <section className="bg-gradient-to-b from-[#0a231c] via-[#0f3c30] to-[#061c16] text-white py-10 md:py-16 px-4 md:px-8 border-b border-amber-600/30 shadow-inner relative overflow-hidden">
        
        {/* Decorative background grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-4 relative z-10 text-center">
          
          <div className="flex flex-wrap justify-center items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/50 border border-emerald-600/40 text-xs font-bold text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>منصة الوقف الرقمي والتضامن الأهلي التشاركي</span>
            </div>

            <button
              onClick={() => setIsPublicationGuideOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>جاهز للنشر المجاني الفوري (Vercel / Netlify)</span>
            </button>
          </div>

          <h2 className="text-2xl md:text-4xl font-black font-tajawal max-w-3xl mx-auto leading-tight md:leading-normal text-wrap-balance">
            من الناس للناس: دليل الأجهزة الطبية والصنائعية والطلبات العاجلة
          </h2>

          <p className="text-xs md:text-sm text-emerald-100/90 max-w-2xl mx-auto font-sans leading-relaxed">
            خدمات أهليّة مجانية 100% لإعارة الأجهزة الطبية، ودليل الحرفيين بالأجر الرحيم، والتكاتف لفك كرب الحالات الطارئة بمحافظات ومراكز مصر دون أي عمولة.
          </p>

          {/* Transparent Waqf Live Impact Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto pt-3 text-center">
            <div className="p-2.5 bg-emerald-900/40 border border-emerald-700/40 rounded-xl">
              <span className="block text-lg font-black font-mono text-amber-300">150+</span>
              <span className="text-[10px] text-emerald-200">أجهزة ومعدات معارة</span>
            </div>
            <div className="p-2.5 bg-emerald-900/40 border border-emerald-700/40 rounded-xl">
              <span className="block text-lg font-black font-mono text-emerald-300">94+</span>
              <span className="text-[10px] text-emerald-200">كربة طارئة مَفروجة</span>
            </div>
            <div className="p-2.5 bg-emerald-900/40 border border-emerald-700/40 rounded-xl">
              <span className="block text-lg font-black font-mono text-amber-300">12</span>
              <span className="text-[10px] text-emerald-200">محافظة ومركز مغطى</span>
            </div>
            <div className="p-2.5 bg-emerald-900/40 border border-emerald-700/40 rounded-xl">
              <span className="block text-lg font-black font-mono text-emerald-300">0%</span>
              <span className="text-[10px] text-emerald-200">عمولة - لوجه الله</span>
            </div>
          </div>

          {/* Scope quick filter chips inside Hero */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <button
              onClick={() => setSelectedScope('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedScope === 'all'
                  ? 'bg-white text-emerald-950 font-black shadow-md'
                  : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-800 border border-emerald-700/50'
              }`}
            >
              🌟 كل الخدمات
            </button>

            <button
              onClick={() => setSelectedScope('aid')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedScope === 'aid'
                  ? 'bg-emerald-500 text-stone-950 font-black shadow-md'
                  : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-800 border border-emerald-700/50'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current text-rose-300" />
              <span>الخير والتطوع (مجاناً)</span>
            </button>

            <button
              onClick={() => setSelectedScope('craftsman')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedScope === 'craftsman'
                  ? 'bg-amber-400 text-stone-950 font-black shadow-md'
                  : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-800 border border-emerald-700/50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>الصنائعية والأرزاق</span>
            </button>

            <button
              onClick={() => setSelectedScope('urgent')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedScope === 'urgent'
                  ? 'bg-rose-500 text-white font-black shadow-md'
                  : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-800 border border-emerald-700/50'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>طلبات مواطنين عاجلة</span>
            </button>
          </div>

        </div>

      </section>

      {/* Search & Cascading Geographic Selectors Toolbar */}
      <section className="bg-white/95 dark:bg-[#111714]/95 backdrop-blur-md border-b border-[#e5e1d3] dark:border-[#1e2722] p-4 sticky top-[61px] z-30 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto space-y-3">
          
          {/* Top row: Search input & Governorate & City dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            
            {/* Search Input (Lg: col-6) */}
            <div className="md:col-span-6 relative">
              <input
                type="text"
                placeholder="ابحث بالاسم، الأجهزة، السباكة، الدواء، أو رقم الهاتف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f4f2e8] dark:bg-[#151f1b] border border-[#d5ceb6] dark:border-[#24332a] rounded-2xl pr-10 pl-4 py-2.5 text-xs text-right focus:outline-none focus:border-emerald-700 dark:focus:border-emerald-500 text-[#1a231f] dark:text-white transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-[#8a846f] dark:text-[#506056] absolute right-3.5 top-3" />
            </div>

            {/* Governorate Dropdown (Lg: col-3) */}
            <div className="md:col-span-3 relative">
              <select
                value={selectedGovernorate}
                onChange={(e) => {
                  setSelectedGovernorate(e.target.value);
                  setSelectedCity('all');
                }}
                className="w-full bg-[#f4f2e8] dark:bg-[#151f1b] border border-[#d5ceb6] dark:border-[#24332a] rounded-2xl pr-8 pl-3 py-2.5 text-xs text-right focus:outline-none focus:border-emerald-700 dark:focus:border-emerald-500 text-[#1a231f] dark:text-white font-bold cursor-pointer transition-all shadow-inner"
              >
                <option value="all">📍 كل المحافظات المصرية</option>
                {EGYPT_GOVERNORATES.map(gov => (
                  <option key={gov.id} value={gov.name}>محافظة {gov.name}</option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-emerald-800 dark:text-emerald-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* City Cascading Dropdown (Lg: col-3) */}
            <div className="md:col-span-3 relative">
              <select
                value={selectedCity}
                disabled={selectedGovernorate === 'all'}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-[#f4f2e8] dark:bg-[#151f1b] border border-[#d5ceb6] dark:border-[#24332a] rounded-2xl pr-8 pl-3 py-2.5 text-xs text-right focus:outline-none focus:border-emerald-700 dark:focus:border-emerald-500 text-[#1a231f] dark:text-white font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-inner"
              >
                <option value="all">🏙️ كل المراكز والأحياء</option>
                {currentGovCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <Layers className="w-4 h-4 text-emerald-800 dark:text-emerald-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>

          </div>

          {/* Middle Row: Category Horizontal Slider */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
              }`}
            >
              جميع التصنيفات
            </button>

            <button
              onClick={() => setSelectedCategory('medical')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'medical'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
              }`}
            >
              أجهزة طبية 🩺
            </button>

            <button
              onClick={() => setSelectedCategory('emergency')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'emergency'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
              }`}
            >
              طوارئ وأدوية 💊
            </button>

            <button
              onClick={() => setSelectedCategory('crafts')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'crafts'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
              }`}
            >
              صنائعية وحرف 🔧
            </button>

            <button
              onClick={() => setSelectedCategory('food')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'food'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
              }`}
            >
              طعام وأسر منتجة 🍲
            </button>

            <button
              onClick={() => setSelectedCategory('education')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'education'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
              }`}
            >
              تعليم ودروس 📚
            </button>

            <button
              onClick={() => setSelectedCategory('clothes')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'clothes'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
              }`}
            >
              ملابس وتجهيز 👕
            </button>
          </div>

          {/* Sorting & Filter Actions Row */}
          <div className="flex flex-wrap justify-between items-center gap-2 pt-1 border-t border-stone-100 dark:border-slate-800 text-xs">
            
            <div className="flex items-center gap-2">
              {/* Bookmarks Filter */}
              <button
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  showBookmarksOnly
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-stone-100 dark:bg-slate-800 text-stone-600 dark:text-slate-300 hover:bg-stone-200'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current' : ''}`} />
                <span>المحفوظات ({bookmarkedIds.length})</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-xl text-stone-600 dark:text-slate-300">
                <ArrowUpDown className="w-3 h-3 text-stone-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'rating')}
                  className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
                >
                  <option value="newest">الأحدث نشرًا</option>
                  <option value="rating">الأعلى تقييمًا</option>
                </select>
              </div>
            </div>

            {/* Backup & Publication Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportData}
                className="flex items-center gap-1 text-[11px] font-bold text-stone-500 hover:text-stone-800 dark:hover:text-slate-200 cursor-pointer"
                title="تصدير نسخة احتياطية من البيانات"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">نسخ احتياطي</span>
              </button>

              <label
                className="flex items-center gap-1 text-[11px] font-bold text-stone-500 hover:text-stone-800 dark:hover:text-slate-200 cursor-pointer"
                title="استيراد بيانات"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">استيراد</span>
                <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
              </label>
            </div>

          </div>

        </div>
      </section>

      {/* Main Content Feed Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        
        {/* AdSense Top Featured Banner */}
        <AdSenseBanner format="horizontal" />

        {/* Feed Metrics Header */}
        <div className="flex justify-between items-center text-xs text-stone-500 dark:text-slate-400 font-bold border-b border-stone-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>عرض {filteredListings.length} خدمة وإعلان موثق بالدليل الخيري</span>
          </div>

          {(searchQuery || selectedGovernorate !== 'all' || selectedScope !== 'all' || selectedCategory !== 'all' || showBookmarksOnly) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-emerald-800 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط الفلاتر</span>
            </button>
          )}
        </div>

        {/* Listings Grid with In-Feed Ad Banner Placement */}
        {filteredListings.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 p-8 space-y-3">
            <Search className="w-10 h-10 text-stone-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-stone-800 dark:text-slate-200">لا توجد نتائج مطابقة لمحددات البحث الحالية</h3>
            <p className="text-xs text-stone-500 dark:text-slate-400 max-w-md mx-auto">
              جرّب تغيير المحافظة أو إلغاء فلتر البحث، أو كن أول من يضيف هذه الخدمة لأهالي منطقتك!
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer mt-2"
            >
              عرض كافة إعلانات الدليل
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredListings.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListingCard 
                  listing={item} 
                  isBookmarked={bookmarkedIds.includes(item.id)}
                  onToggleBookmark={handleToggleBookmark}
                />
                {/* Secondary In-feed Ad Banner after item #3 for high viewability */}
                {index === 2 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <AdSenseBanner format="horizontal" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-stone-200 dark:border-slate-800 py-6 text-center text-xs text-stone-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-3">
          <div className="flex flex-wrap justify-center items-center gap-4 font-bold text-stone-800 dark:text-slate-200 font-tajawal text-sm">
            <span>منصة «مِنَ النَّاسِ لِلنَّاسِ»</span>
            <span>·</span>
            <button 
              onClick={() => setIsCharterModalOpen(true)}
              className="text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <ScrollText className="w-3.5 h-3.5" />
              <span>ميثاق الوقف الرقمي</span>
            </button>
            <span>·</span>
            <button 
              onClick={() => setIsPublicationGuideOpen(true)}
              className="text-teal-700 dark:text-teal-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>دليل النشر والاستضافة المجانية</span>
            </button>
          </div>

          <p className="text-[11px] text-stone-400 dark:text-slate-500 max-w-xl mx-auto">
            جميع الخدمات والمعلومات مسجلة كخدمات أهليّة مجانية للتضامن الاجتماعي بدون أي عمولة أو رسوم. الإعلانات مخصصة 100% لتغطية السيرفرات وإعارة الأجهزة الطبية.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AddListingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddListing={handleAddListing}
      />

      <WaqfCharterModal
        isOpen={isCharterModalOpen}
        onClose={() => setIsCharterModalOpen(false)}
      />

      <PublicationGuideModal
        isOpen={isPublicationGuideOpen}
        onClose={() => setIsPublicationGuideOpen(false)}
      />

      {/* Smartphone Bottom Sticky Navigation Bar */}
      <MobileBottomNav
        activeTab={selectedScope === 'aid' ? 'aid' : 'all'}
        onSelectTab={(tab) => {
          if (tab === 'aid') setSelectedScope('aid');
          else setSelectedScope('all');
        }}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenCharterModal={() => setIsCharterModalOpen(true)}
      />

      {/* Offline Toast Indicator */}
      <OfflineIndicator />

    </div>
  );
}

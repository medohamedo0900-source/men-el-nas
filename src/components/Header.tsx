import React from 'react';
import { PWAInstallButton } from './PWAInstallButton';
import { HeartHandshake, PlusCircle, ScrollText, Sun, Moon, Rocket } from 'lucide-react';

interface HeaderProps {
  onOpenAddModal: () => void;
  onOpenCharterModal: () => void;
  onOpenPublicationGuide: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddModal,
  onOpenCharterModal,
  onOpenPublicationGuide,
  darkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0a231c]/95 dark:bg-[#080d0b]/95 backdrop-blur border-b border-[#0d362a] dark:border-[#1c2721] text-white px-4 md:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Zone 1: Brand Wordmark (Single element or clean lockup) */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 border border-emerald-500/40 flex items-center justify-center shadow-inner shrink-0">
            <HeartHandshake className="w-6 h-6 text-amber-300" />
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-black font-tajawal tracking-tight text-white flex items-center gap-1.5 leading-none">
              <span>مِنَ النَّاسِ لِلنَّاسِ</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 hidden sm:inline-block">
                الوقف الرقمي الخيري
              </span>
            </h1>
            <p className="text-[10px] text-emerald-200/80 font-sans mt-0.5">
              الدليل الأهلي والتضامن المحلي للمحافظات والمراكز المصرية
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation & Actions */}
        <div className="flex items-center gap-2">
          
          {/* Free Publish Guide Button */}
          <button
            onClick={onOpenPublicationGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-800/80 to-emerald-800/80 hover:from-teal-700 hover:to-emerald-700 border border-teal-500/40 text-teal-100 text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-sm"
            title="دليل نشر التطبيق مجاناً في دقيقتين"
          >
            <Rocket className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
            <span className="hidden sm:inline">انشر مجاناً</span>
          </button>

          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl bg-emerald-900/60 dark:bg-slate-800 border border-emerald-700/50 dark:border-slate-700 text-emerald-100 hover:text-white transition-colors cursor-pointer shrink-0"
            title={darkMode ? 'الوضع المضيء' : 'الوضع الليلي'}
            aria-label="تغيير مظهر الصفحة"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-200" />}
          </button>

          {/* Waqf Charter Button (Desktop) */}
          <button
            onClick={onOpenCharterModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900/60 border border-emerald-700/60 hover:bg-emerald-800 text-emerald-100 text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            <ScrollText className="w-3.5 h-3.5 text-amber-400" />
            <span>ميثاق الوقف</span>
          </button>

          {/* Add Listing Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-stone-950" />
            <span>أضف خدمة</span>
          </button>

        </div>

      </div>
    </header>
  );
};

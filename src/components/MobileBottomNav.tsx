import React from 'react';
import { Sparkles, Heart, PlusCircle, ScrollText } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'all' | 'aid';
  onSelectTab: (tab: 'all' | 'aid') => void;
  onOpenAddModal: () => void;
  onOpenCharterModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenAddModal,
  onOpenCharterModal,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-stone-200 dark:border-slate-800 shadow-2xl px-2 py-1.5 transition-colors">
      <div className="grid grid-cols-4 gap-1 text-center">
        
        {/* Tab 1: Home Feed */}
        <button
          onClick={() => onSelectTab('all')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'all'
              ? 'text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60'
              : 'text-stone-500 dark:text-slate-400 hover:text-stone-900'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">الرئيسية</span>
        </button>

        {/* Tab 2: Public Aid & Volunteering */}
        <button
          onClick={() => onSelectTab('aid')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'aid'
              ? 'text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60'
              : 'text-stone-500 dark:text-slate-400 hover:text-stone-900'
          }`}
        >
          <Heart className="w-5 h-5 mb-0.5 fill-current text-rose-600" />
          <span className="text-[10px]">الخير والتطوع</span>
        </button>

        {/* Tab 3: Add Listing */}
        <button
          onClick={onOpenAddModal}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-all cursor-pointer"
        >
          <PlusCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold">أضف خدمة</span>
        </button>

        {/* Tab 4: Waqf Charter */}
        <button
          onClick={onOpenCharterModal}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-stone-500 dark:text-slate-400 hover:text-stone-900 transition-all cursor-pointer"
        >
          <ScrollText className="w-5 h-5 mb-0.5 text-amber-600 dark:text-amber-400" />
          <span className="text-[10px]">ميثاق الوقف</span>
        </button>

      </div>
    </nav>
  );
};

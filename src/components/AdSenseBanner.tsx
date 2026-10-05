import React, { useEffect, useState } from 'react';
import { Sparkles, Megaphone, Settings2, Check, ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';

interface AdSenseBannerProps {
  slot?: string;
  format?: 'horizontal' | 'card' | 'badge';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slot,
  format = 'horizontal',
  className = '',
}) => {
  const [clientId, setClientId] = useState<string>('');
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    // 1. Try localStorage first
    const savedId = localStorage.getItem('adsense_client_id');
    // 2. Fallback to Vite env var
    const envId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

    const activeId = savedId || (envId && envId !== 'ca-pub-XXXXXXXXXXXXXXXX' ? envId : '');
    setClientId(activeId);
    setInputVal(activeId);

    if (activeId && activeId.startsWith('ca-pub-')) {
      // Inject Google AdSense Script dynamically
      const scriptId = 'google-adsense-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${activeId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }

      try {
        if (window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch (e) {
        console.error('AdSense push error', e);
      }
    }
  }, []);

  const handleSaveId = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputVal.trim();
    if (clean) {
      localStorage.setItem('adsense_client_id', clean);
      setClientId(clean);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        setShowConfig(false);
      }, 1500);
    } else {
      localStorage.removeItem('adsense_client_id');
      setClientId('');
      setShowConfig(false);
    }
  };

  // If valid publisher ID is present, render actual Google AdSense container
  if (clientId && clientId.startsWith('ca-pub-')) {
    return (
      <div className={`w-full overflow-hidden my-4 rounded-2xl bg-stone-50 dark:bg-slate-900 border border-stone-200/80 dark:border-slate-800 p-2 text-center ${className}`}>
        <div className="flex justify-between items-center px-2 py-1 text-[10px] text-stone-400 dark:text-slate-500 font-sans border-b border-stone-200/50 dark:border-slate-800 mb-2">
          <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-400 font-bold">
            <HeartHandshake className="w-3 h-3" />
            إعلان مدعوم لخدمة الوقف الرقمي
          </span>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-slate-300"
            title="تعديل معرف AdSense"
          >
            <Settings2 className="w-3 h-3" />
          </button>
        </div>

        <div className="min-h-[90px] flex items-center justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minWidth: '280px', minHeight: '90px', width: '100%' }}
            data-ad-client={clientId}
            data-ad-slot={slot || '1234567890'}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // Fallback: Elegant Waqf Revenue & Sponsorship Banner with 1-click AdSense connector
  return (
    <div className={`my-4 rounded-2xl bg-gradient-to-r from-emerald-900/10 via-teal-900/5 to-amber-900/10 dark:from-emerald-950/40 dark:via-slate-900/40 dark:to-amber-950/30 border border-emerald-700/20 dark:border-emerald-600/20 p-4 transition-all ${className}`}>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        
        {/* Waqf Ad Label */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-black border border-emerald-300 dark:border-emerald-700">
              <Megaphone className="w-3 h-3" />
              مساحة إعلانية ورعاية وقفية شفافة
            </span>
            <span className="text-[10px] text-stone-400 dark:text-slate-500 font-sans">
              Google AdSense Ready
            </span>
          </div>

          <p className="text-xs text-stone-700 dark:text-slate-300 font-sans leading-relaxed">
            جميع عوائد الإعلانات والرعايات مُسخرة بنسبة <strong>100%</strong> لخدمة أهالينا (السيرفرات، إعارة أجهزة الأكسجين والكراسي المتحركة، ومكافآت المتطوعين).
          </p>
        </div>

        {/* Action Button: Configure AdSense ID */}
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 text-stone-700 dark:text-slate-200 hover:bg-stone-50 dark:hover:bg-slate-700 text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Settings2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>ربط حساب AdSense</span>
          </button>
        </div>

      </div>

      {/* Quick In-App AdSense ID Config Form */}
      {showConfig && (
        <form onSubmit={handleSaveId} className="mt-3 pt-3 border-t border-emerald-900/10 dark:border-slate-800 flex flex-col sm:flex-row gap-2 items-center animate-in fade-in">
          <div className="flex-1 w-full text-right">
            <label className="block text-[11px] font-bold text-stone-600 dark:text-slate-300 mb-1">
              أدخل معرف الناشر في جوجل أدسنس (Publisher ID):
            </label>
            <input
              type="text"
              placeholder="مثال: ca-pub-1234567890123456"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-left font-mono focus:outline-none focus:border-emerald-600 text-stone-900 dark:text-white"
            />
          </div>

          <div className="flex gap-1.5 w-full sm:w-auto sm:self-end">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-4 py-1.5 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              {savedSuccess ? 'تم الحفظ!' : 'حفظ وتفعيل الإعلانات'}
            </button>
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="px-3 py-1.5 border border-stone-200 dark:border-slate-700 text-stone-500 rounded-xl text-xs hover:bg-stone-50 cursor-pointer"
            >
              إلغاء
            </button>
          </div>
        </form>
      )}

    </div>
  );
};

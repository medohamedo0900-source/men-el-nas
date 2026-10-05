import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Share, PlusSquare } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed standalone PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Android / Chromium / Desktop PWA prompt
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
        title="تثبيت التطبيق على الشاشة الرئيسية"
      >
        <Download className="w-3.5 h-3.5 text-emerald-200" />
        <span>تثبيت التطبيق</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 border border-emerald-700/60 text-emerald-100 hover:bg-emerald-800 text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
          <span>تثبيت آيفون</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-stone-900 space-y-4">
              <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-emerald-700" />
                  تثبيت على آيفون / آيباد
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="text-stone-400 hover:text-stone-700 cursor-pointer p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-stone-600 leading-relaxed font-sans">
                <div className="flex items-center gap-2 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-emerald-900">
                  <Share className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>1. اضغط على زر <strong>المشاركة (Share)</strong> في شريط متصفح سفاري بالأسفل.</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-emerald-900">
                  <PlusSquare className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>2. اختر <strong>إضافة إلى الشاشة الرئيسية (Add to Home Screen)</strong>.</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
              >
                حسناً، فهمت
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

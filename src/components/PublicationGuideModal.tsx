import React, { useState } from 'react';
import { Rocket, Globe, Server, Check, Copy, ExternalLink, X, Shield, Sparkles, Terminal } from 'lucide-react';

interface PublicationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublicationGuideModal: React.FC<PublicationGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-slate-800 text-stone-900 dark:text-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1 text-emerald-300 font-bold text-xs uppercase tracking-wider">
            <Rocket className="w-4 h-4 text-amber-400" />
            <span>دليل النشر والاستضافة المجانية الفورية</span>
          </div>

          <h2 className="text-2xl font-black font-tajawal leading-tight">
            كيف تنشر تطبيقك أونلاين مجاناً 100% في دقيقتين؟
          </h2>
          <p className="text-xs text-emerald-100/90 mt-1 font-sans">
            التطبيق مجهز بملفات الإعداد الكاملة (vercel.json و netlify.toml) ومستعد للإطلاق دون دفع أي سنت.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto font-sans">
          
          {/* Method 1: Vercel (Recommended) */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700/60 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs">▲</span>
                <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                  الخيار الأول: النشر عبر Vercel (الأسهل والأسرع - مجاناً)
                </h3>
              </div>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                موصى به
              </span>
            </div>

            <ol className="text-xs text-stone-600 dark:text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
              <li>ارفع كود المشروع إلى مستودعك الخاص على <strong>GitHub</strong>.</li>
              <li>ادخل إلى موقع <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 dark:text-emerald-400 font-bold underline inline-flex items-center gap-0.5">Vercel.com <ExternalLink className="w-3 h-3" /></a> وسجل دخولك بحساب جيت هب.</li>
              <li>اختر <strong>Import Project</strong> واختر المستودع، ثم اضغط <strong>Deploy</strong>.</li>
              <li>سيكون موقعك منشوراً فوراً برابط عالمي سريع يدعم SSL مجاني مدى الحياة!</li>
            </ol>

            <div className="bg-stone-900 text-stone-100 p-2.5 rounded-xl font-mono text-[11px] flex justify-between items-center">
              <span>npm i -g vercel && vercel --prod</span>
              <button
                onClick={() => copyToClipboard('npm i -g vercel && vercel --prod', 1)}
                className="text-stone-400 hover:text-white p-1"
                title="نسخ الأمر"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Method 2: Netlify */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">NL</span>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                الخيار الثاني: النشر عبر Netlify (سحب وإفلات مباشر)
              </h3>
            </div>

            <ol className="text-xs text-stone-600 dark:text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
              <li>قم ببناء المشروع محلياً عبر أمر: <code className="bg-stone-200 dark:bg-slate-700 px-1 py-0.5 rounded font-mono">npm run build</code> ليظهر لك مجلد <strong>dist</strong>.</li>
              <li>ادخل إلى <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="text-emerald-700 dark:text-emerald-400 font-bold underline inline-flex items-center gap-0.5">Netlify Drop <ExternalLink className="w-3 h-3" /></a> واسحب مجلد <strong>dist</strong> مباشرة للموقع.</li>
              <li>سيتم إطلاق الموقع خلال 5 ثوانٍ فقط برابط مجاني جاهز!</li>
            </ol>
          </div>

          {/* Method 3: Cloudflare Pages */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">CF</span>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                الخيار الثالث: Cloudflare Pages (باندويث وسرعة غير محدودة)
              </h3>
            </div>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed">
              اربط مستودعك بـ Cloudflare Pages مجاناً بدون أي حدود للباندويث مع حماية DDoS عالمية كاملة ونطاق فرعي مجاني أو ربط بنطاقك المخصص (.com أو .eg).
            </p>
          </div>

          {/* AdSense Approval Tips */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 space-y-2">
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>نصائح قبول إعلانات Google AdSense للمنصة:</span>
            </h4>
            <ul className="text-[11px] text-amber-950 dark:text-amber-200 space-y-1 list-disc list-inside leading-relaxed">
              <li>استخدم دومين مخصص (مثل <code className="font-mono">menelnas.org</code> أو غيرها) لسرعة القبول.</li>
              <li>ميثاق الوقف وصفحات الخصوصية مدمجة بالكامل وجاهزة لمتطلبات جوجل أدسنس.</li>
              <li>أدخل معرف الناشر <code className="font-mono">ca-pub-XXXXXXXXXX</code> عبر زر "ربط حساب AdSense" ليتم تفعيل الإعلانات فورياً.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-stone-50 dark:bg-slate-800/80 p-4 border-t border-stone-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-stone-900 dark:bg-slate-100 text-white dark:text-stone-900 text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
          >
            فهمت، شكراً لك
          </button>
        </div>

      </div>
    </div>
  );
};

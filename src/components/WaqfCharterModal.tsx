import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, Server, Heart, Users, Share2, Copy, Check, X, Sparkles } from 'lucide-react';

interface WaqfCharterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaqfCharterModal: React.FC<WaqfCharterModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const waqfShareMessage = `🌱 *من منصة من الناس للناس: الوقف الرقمي الخيري*

منصة أهليّة غير ربحية تهدف للربط بين أهالينا بالمحافظات والمراكز المصرية:
❤️ إعارة أجهزة طبية (أكسجين، كراسي متحركة) مجاناً.
💼 دليل الصنائعية والحرفيين بالأجر الرحيم.
📢 التكاتف لفك كرب الحالات العاجلة.

📜 عوائد المنصة وقف كامل (50% تطوير وسيرفرات، 30% أجهزة طبية ومساعدات، 20% مكافآت متطوعين).

انشر الخير وشارك المنصة مع أهلك وجيرانك:
${window.location.href}`;

  const handleShareWhatsApp = () => {
    const encodedText = encodeURIComponent(waqfShareMessage);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(waqfShareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-slate-800 text-stone-900 dark:text-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>ميثاق الوقف الرقمي الخيري والتأصيل الشرعي</span>
          </div>

          <h2 className="text-2xl font-black font-tajawal leading-tight">
            ميثاق منصة «مِنَ النَّاسِ لِلنَّاسِ»
          </h2>
          <p className="text-xs text-emerald-100/90 mt-1 font-sans leading-relaxed">
            نموذج عمل خيري غير ربحي (Digital Social Enterprise / Waqf) يهدف للوصول المستدام والخدمة الأهليّة المجانية المباشرة.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Covenant statement */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <span>عهد وأمانة الوقف الرقمي</span>
            </div>
            <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed font-sans">
              نتعهد أمام الله والأمة بأن هذه المنصة هي <strong>وقف إلكتروني أهلي غير ربحي</strong>. لا يُستخرج منها أي أرباح شخصية أو توزيعات للمؤسسين. كافة العوائد غير المباشرة (مثل الإعلانات الشفافة أو الاشتراطات الرمزية للدليل) تُعاد دحرجتها بالكامل لدعم المجتمع وتطوير المنصة.
            </p>
          </div>

          {/* Allocation Breakdown Chart / Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-slate-400">
              خارطة توزيع وتدوير عوائد الوقف الرقمي:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* 50% Servers & AI */}
              <div className="p-4 bg-stone-50 dark:bg-slate-800/60 border border-stone-200 dark:border-slate-700/60 rounded-2xl space-y-1">
                <div className="flex justify-between items-center text-emerald-800 dark:text-emerald-400">
                  <Server className="w-5 h-5" />
                  <span className="text-lg font-black font-mono">50%</span>
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-white">السيرفرات والتقنية</h4>
                <p className="text-[11px] text-stone-500 dark:text-slate-400 leading-relaxed">
                  تغطية تكاليف السيرفرات السريعة، استضافة قواعد البيانات، وأدوات الذكاء الاصطناعي الضامنة للخدمة.
                </p>
              </div>

              {/* 30% Medical Equipment */}
              <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 rounded-2xl space-y-1">
                <div className="flex justify-between items-center text-amber-800 dark:text-amber-400">
                  <Heart className="w-5 h-5 fill-amber-500/20" />
                  <span className="text-lg font-black font-mono">30%</span>
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-white">الأجهزة والمساعدات</h4>
                <p className="text-[11px] text-stone-500 dark:text-slate-400 leading-relaxed">
                  شراء أسطوانات أكسجين جديدة، كراسي متحركة، وأسرة طبية لإعارتها مجاناً كلياً لأهالينا.
                </p>
              </div>

              {/* 20% Field Volunteers */}
              <div className="p-4 bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-800/40 rounded-2xl space-y-1">
                <div className="flex justify-between items-center text-teal-800 dark:text-teal-400">
                  <Users className="w-5 h-5" />
                  <span className="text-lg font-black font-mono">20%</span>
                </div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-white">مكافآت المتطوعين</h4>
                <p className="text-[11px] text-stone-500 dark:text-slate-400 leading-relaxed">
                  مكافآت رمزية للشباب والمتطوعين الميدانيين بالقرى لتحديث أسعار الحرفيين وتدقيق الأجهزة.
                </p>
              </div>

            </div>
          </div>

          {/* Social Share Box */}
          <div className="border-t border-stone-200 dark:border-slate-800 pt-5 space-y-3">
            <h4 className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-emerald-700" />
              <span>ساهم في نشر رسالة الوقف الخيري مجاناً:</span>
            </h4>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>مشاركة الرسالة عبر واتساب</span>
              </button>

              <button
                onClick={handleCopyText}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم النسخ بنجاح!' : 'نسخ نص الوقف'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-50 dark:bg-slate-800/80 p-4 border-t border-stone-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-stone-900 dark:bg-slate-100 text-white dark:text-stone-900 text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
          >
            إغلاق الميثاق
          </button>
        </div>

      </div>
    </div>
  );
};

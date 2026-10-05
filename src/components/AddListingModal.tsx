import React, { useState } from 'react';
import { CommunityListing, ScopeType } from '../data/seedListings';
import { EGYPT_GOVERNORATES } from '../data/egyptData';
import { PlusCircle, X, Check, Heart, Briefcase, AlertCircle } from 'lucide-react';

interface AddListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (listing: CommunityListing) => void;
}

export const AddListingModal: React.FC<AddListingModalProps> = ({ isOpen, onClose, onAddListing }) => {
  const [scope, setScope] = useState<ScopeType>('aid');
  const [category, setCategory] = useState<CommunityListing['category']>('medical');
  const [title, setTitle] = useState('');
  const [governorate, setGovernorate] = useState(EGYPT_GOVERNORATES[0].name);
  const [city, setCity] = useState(EGYPT_GOVERNORATES[0].cities[0]);
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [price, setPrice] = useState('مجاناً (إعارة لوجه الله)');
  const [providerName, setProviderName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  // Selected Governorate Object to update city dropdown options
  const selectedGovObj = EGYPT_GOVERNORATES.find(g => g.name === governorate) || EGYPT_GOVERNORATES[0];

  const handleGovChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const govName = e.target.value;
    setGovernorate(govName);
    const govObj = EGYPT_GOVERNORATES.find(g => g.name === govName);
    if (govObj && govObj.cities.length > 0) {
      setCity(govObj.cities[0]);
    }
  };

  const handleScopeChange = (newScope: ScopeType) => {
    setScope(newScope);
    if (newScope === 'aid') {
      setPrice('مجاناً (إعارة لوجه الله)');
    } else if (newScope === 'craftsman') {
      setPrice('مصنعية رحيمة / سعر مناسب');
    } else {
      setPrice('مطلوب عاجل');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !phone.trim() || !description.trim()) return;

    // Format whatsapp number
    let formattedWa = whatsapp.trim() || phone.trim();
    if (formattedWa.startsWith('01')) {
      formattedWa = '2' + formattedWa;
    }

    const badgeText = 
      scope === 'aid' 
        ? 'الناس للناس ❤️ (مجاناً)' 
        : scope === 'craftsman' 
        ? 'صاحب حرفة/خدمة 💼' 
        : 'طلب مواطن عاجل 📢';

    const newListing: CommunityListing = {
      id: 'custom-' + Date.now(),
      scope,
      category,
      title: title.trim(),
      governorate,
      city,
      phone: phone.trim(),
      whatsapp: formattedWa,
      description: description.trim(),
      price: price.trim() || (scope === 'aid' ? 'مجاناً' : 'سعر عادل'),
      providerName: providerName.trim() || 'فاعل خير / أهالي المنطقة',
      badge: badgeText,
      dateAdded: new Date().toISOString().split('T')[0],
      verified: true
    };

    onAddListing(newListing);
    onClose();

    // Reset Form
    setTitle('');
    setDescription('');
    setPhone('');
    setWhatsapp('');
    setProviderName('');
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

          <div className="flex items-center gap-2 mb-1 text-emerald-300 font-bold text-xs uppercase tracking-wider">
            <PlusCircle className="w-4 h-4 text-emerald-300" />
            <span>إضافة إعلان جديد في الدليل الأهلي</span>
          </div>

          <h2 className="text-2xl font-black font-tajawal leading-tight">
            أضف خدمة أو طلب لمساعدة الأهالي
          </h2>
          <p className="text-xs text-emerald-100/90 mt-1 font-sans">
            ساهم في إفادة أهالي منطقتك ومحافظتك مباشرة بدون أي وسيط أو عمولة.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Scope Selector Segment */}
          <div>
            <label className="block text-xs font-bold text-stone-600 dark:text-slate-300 mb-2">
              اختر نطاق الخدمة / الإعلان:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleScopeChange('aid')}
                className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2 cursor-pointer ${
                  scope === 'aid'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20 font-bold'
                    : 'bg-stone-50 dark:bg-slate-800/50 border-stone-200 dark:border-slate-700 text-stone-600 dark:text-slate-400 hover:bg-stone-100'
                }`}
              >
                <Heart className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <div className="text-xs font-bold">الخير والتطوع</div>
                  <div className="text-[10px] opacity-80">100% مجاناً لوجه الله</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleScopeChange('craftsman')}
                className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2 cursor-pointer ${
                  scope === 'craftsman'
                    ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-600 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/20 font-bold'
                    : 'bg-stone-50 dark:bg-slate-800/50 border-stone-200 dark:border-slate-700 text-stone-600 dark:text-slate-400 hover:bg-stone-100'
                }`}
              >
                <Briefcase className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <div className="text-xs font-bold">صنائعية وأرزاق</div>
                  <div className="text-[10px] opacity-80">حرفي / خدمة رحيمة</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleScopeChange('urgent')}
                className={`p-3 rounded-xl border text-right transition-all flex items-center gap-2 cursor-pointer ${
                  scope === 'urgent'
                    ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-600 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20 font-bold'
                    : 'bg-stone-50 dark:bg-slate-800/50 border-stone-200 dark:border-slate-700 text-stone-600 dark:text-slate-400 hover:bg-stone-100'
                }`}
              >
                <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                <div>
                  <div className="text-xs font-bold">طلب مواطن عاجل</div>
                  <div className="text-[10px] opacity-80">حالة طارئة أو دواء ناقص</div>
                </div>
              </button>
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-slate-200 mb-1">
              عنوان الخدمة أو الإعلان:
            </label>
            <input
              type="text"
              required
              placeholder="مثال: إعارة أسطوانة أكسجين، سباك أجهزة وسخانات، مطلوب دواء انسولين"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-right focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
            />
          </div>

          {/* Governorate and City cascading dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-200 mb-1">
                المحافظة:
              </label>
              <select
                value={governorate}
                onChange={handleGovChange}
                className="w-full bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-right focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
              >
                {EGYPT_GOVERNORATES.map(gov => (
                  <option key={gov.id} value={gov.name}>{gov.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-200 mb-1">
                المركز / الحي:
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-right focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
              >
                {selectedGovObj.cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category & Provider Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-200 mb-1">
                التصنيف الرئيسي:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CommunityListing['category'])}
                className="w-full bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-right focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
              >
                <option value="medical">أجهزة ومستلزمات طبية 🩺</option>
                <option value="emergency">طوارئ وأدوية 💊</option>
                <option value="crafts">صنائعية وحرف وصيانة 🔧</option>
                <option value="food">طعام وأسر منتجة 🍲</option>
                <option value="education">تعليم ودروس تقوية 📚</option>
                <option value="clothes">ملابس وتجهيز عرائس 👕</option>
                <option value="transport">مواصلات وخدمات 🚗</option>
                <option value="electronics">إلكترونيات وأجهزة 💻</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-200 mb-1">
                اسم مقدم الخدمة أو المعلن:
              </label>
              <input
                type="text"
                placeholder="مثال: الحاج مصطفى، جمعية شباب الخير، الأسطى علي"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
                className="w-full bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-right focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Contact Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-200 mb-1">
                رقم الهاتف المباشر:
              </label>
              <input
                type="tel"
                required
                placeholder="مثال: 01012345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-left font-mono focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-slate-200 mb-1">
                رقم الواتساب (اختياري):
              </label>
              <input
                type="tel"
                placeholder="مثال: 01012345678 (إن يختلف)"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-left font-mono focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Price / Terms */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-slate-200 mb-1">
              مقابل الخدمة / المقابل المطلوب:
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-right focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500"
            />
          </div>

          {/* Description Body */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-slate-200 mb-1">
              تفاصيل الإعلان والمواصفات:
            </label>
            <textarea
              required
              rows={3}
              placeholder="اكتب تفاصيل دقيقة عن الخدمة، شروط الإعارة، أو مواعيد التواصل..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 rounded-xl p-3 text-xs text-right focus:outline-none focus:border-emerald-600 dark:focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Submit buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-stone-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-200 dark:border-slate-700 rounded-xl text-xs font-bold text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              نشر الإعلان بالدليل الآن
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

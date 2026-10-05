import React, { useState, useEffect } from 'react';
import { Plus, Gift, Users, HeartHandshake, ShieldAlert, BadgeCheck, Phone, CheckCircle, Sparkles, Building2, Eye } from 'lucide-react';

interface FreeItem {
  id: string;
  title: string;
  category: string;
  description: string;
  donorName: string;
  city: string;
  status: 'available' | 'claimed' | 'delivered';
  dateAdded: string;
}

interface EmergencyCase {
  id: string;
  title: string;
  category: string;
  target: number;
  current: number;
  description: string;
  seekerName: string;
  city: string;
  dateAdded: string;
}

export default function PeopleToPeople() {
  const [items, setItems] = useState<FreeItem[]>([]);
  const [cases, setCases] = useState<EmergencyCase[]>([]);
  
  // Toggle forms
  const [showItemForm, setShowItemForm] = useState(false);
  const [showCaseForm, setShowCaseForm] = useState(false);

  // New Item states
  const [itemTitle, setItemTitle] = useState('');
  const [itemCategory, setItemCategory] = useState('medical');
  const [itemDesc, setItemDesc] = useState('');
  const [itemDonor, setItemDonor] = useState('');
  const [itemCity, setItemCity] = useState('');

  // New Case states
  const [caseTitle, setCaseTitle] = useState('');
  const [caseCategory, setCaseCategory] = useState('debt');
  const [caseTarget, setCaseTarget] = useState('5000');
  const [caseDesc, setCaseDesc] = useState('');
  const [caseSeeker, setCaseSeeker] = useState('');
  const [caseCity, setCaseCity] = useState('');

  // Active filtering
  const [itemFilter, setItemFilter] = useState('all');
  const [caseFilter, setCaseFilter] = useState('all');

  // Input state for micro P2P donations
  const [donationAmount, setDonationAmount] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load physical items
    const savedItems = localStorage.getItem('p2p_donation_items');
    if (savedItems) {
      try { setItems(JSON.parse(savedItems)); } catch (e) { console.error(e); }
    } else {
      const defaultItems: FreeItem[] = [
        {
          id: 'item-1',
          title: 'كرسي طبي متحرك بحالة ممتازة وجديدة',
          category: 'medical',
          description: 'كرسي متحرك طبي مريح للأوزان المتوسطة، نظيف تماماً وتم استخدامه لشهرين فقط. نهديه لمن يحتاجه كأمانة وصدقة.',
          donorName: 'أبو عبد الله الغامدي',
          city: 'الرياض',
          status: 'available',
          dateAdded: '2026-09-20'
        },
        {
          id: 'item-2',
          title: 'جهاز لابتوب مستعمل مخصص للتعليم المنزلي',
          category: 'education',
          description: 'جهاز لابتوب ديل صالح لتصفح الإنترنت ومتابعة الدروس المدرسية، مع الشاحن والشنطة. صدقة جارية لطالب علم مجتهد.',
          donorName: 'أم مريم',
          city: 'القاهرة',
          status: 'available',
          dateAdded: '2026-09-28'
        },
        {
          id: 'item-3',
          title: 'سلة غذائية كاملة للأسر المتعففة',
          category: 'food',
          description: 'تتكون من أرز، زيت، سكر، تمر، معكرونة، وحليب مجفف. تكفي أسرة متوسطة لمدة شهر كامل بحول الله.',
          donorName: 'فاعل خير',
          city: 'جدة',
          status: 'claimed',
          dateAdded: '2026-10-01'
        }
      ];
      setItems(defaultItems);
      localStorage.setItem('p2p_donation_items', JSON.stringify(defaultItems));
    }

    // Load emergency cases
    const savedCases = localStorage.getItem('p2p_solidarity_cases');
    if (savedCases) {
      try { setCases(JSON.parse(savedCases)); } catch (e) { console.error(e); }
    } else {
      const defaultCases: EmergencyCase[] = [
        {
          id: 'case-1',
          title: 'سداد مصروفات دراسية متبقية لـ 3 أيتام',
          category: 'education',
          target: 4500,
          current: 3100,
          description: 'أخوة يتامى مهددون بالفصل من المدرسة لعدم سداد بقية المصروفات الإدارية للفصل الحالي. المبلغ الإجمالي 4500 ريال.',
          seekerName: 'والدة الأيتام (أرملة)',
          city: 'الدمام',
          dateAdded: '2026-09-15'
        },
        {
          id: 'case-2',
          title: 'شراء علاج وجرعات طبية مخصصة لمريض كبد',
          category: 'medical',
          target: 8000,
          current: 7800,
          description: 'حالة طبية حرجة لأب متعفف يعيل أسرة من 5 أفراد، يحتاج لجرعة دواء عاجلة غير متوفرة في التأمين الحكومي.',
          seekerName: 'د. خالد (طبيب متابع)',
          city: 'المنصورة',
          dateAdded: '2026-09-25'
        },
        {
          id: 'case-3',
          title: 'فك كربة إيجار متأخر لأرملة عاجزة عن الكسب',
          category: 'debt',
          target: 12000,
          current: 4000,
          description: 'أرملة تلقت إنذاراً بالإخلاء من الشقة السكنية البسيطة التي تؤويها مع بناتها بسبب تراكم إيجار 4 أشهر.',
          seekerName: 'جار الحالة',
          city: 'مكة المكرمة',
          dateAdded: '2026-10-02'
        }
      ];
      setCases(defaultCases);
      localStorage.setItem('p2p_solidarity_cases', JSON.stringify(defaultCases));
    }
  }, []);

  const saveItems = (updated: FreeItem[]) => {
    setItems(updated);
    localStorage.setItem('p2p_donation_items', JSON.stringify(updated));
  };

  const saveCases = (updated: EmergencyCase[]) => {
    setCases(updated);
    localStorage.setItem('p2p_solidarity_cases', JSON.stringify(updated));
  };

  // Add Free Item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim() || !itemDesc.trim()) return;

    const newItem: FreeItem = {
      id: 'item-' + Date.now(),
      title: itemTitle.trim(),
      category: itemCategory,
      description: itemDesc.trim(),
      donorName: itemDonor.trim() || 'فاعل خير',
      city: itemCity.trim() || 'الرياض',
      status: 'available',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    const updated = [newItem, ...items];
    saveItems(updated);

    // Reset
    setItemTitle('');
    setItemDesc('');
    setItemDonor('');
    setItemCity('');
    setShowItemForm(false);
  };

  // Add Emergency Case
  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseTitle.trim() || !caseDesc.trim()) return;

    const newCase: EmergencyCase = {
      id: 'case-' + Date.now(),
      title: caseTitle.trim(),
      category: caseCategory,
      target: parseFloat(caseTarget) || 3000,
      current: 0,
      description: caseDesc.trim(),
      seekerName: caseSeeker.trim() || 'حالة متعففة',
      city: caseCity.trim() || 'الرياض',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    const updated = [newCase, ...cases];
    saveCases(updated);

    // Reset
    setCaseTitle('');
    setCaseDesc('');
    setCaseSeeker('');
    setCaseCity('');
    setCaseTarget('5000');
    setShowCaseForm(false);
  };

  // Claim Free Item
  const handleClaimItem = (id: string) => {
    const updated = items.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          status: item.status === 'available' ? 'claimed' as const : 'available' as const
        };
      }
      return item;
    });
    saveItems(updated);
  };

  // Change Item Delivery Status
  const handleDeliverItem = (id: string) => {
    const updated = items.map(item => {
      if (item.id === id) {
        return { ...item, status: 'delivered' as const };
      }
      return item;
    });
    saveItems(updated);
  };

  // Simulate Contributing money to Emergency Case
  const handleDonateToCase = (id: string) => {
    const amtStr = donationAmount[id];
    const amtVal = parseFloat(amtStr);
    if (isNaN(amtVal) || amtVal <= 0) return;

    const updated = cases.map(c => {
      if (c.id === id) {
        const newCurrent = Math.min(c.current + amtVal, c.target);
        return { ...c, current: newCurrent };
      }
      return c;
    });

    saveCases(updated);
    setDonationAmount(prev => ({ ...prev, [id]: '' }));
  };

  const filteredItems = items.filter(item => {
    if (itemFilter === 'all') return true;
    return item.category === itemFilter;
  });

  const filteredCases = cases.filter(c => {
    if (caseFilter === 'all') return true;
    return c.category === caseFilter;
  });

  // Global counts for Dashboard
  const availableItemsCount = items.filter(i => i.status === 'available').length;
  const claimedItemsCount = items.filter(i => i.status !== 'available').length;
  const coveredCasesCount = cases.filter(c => c.current >= c.target).length;
  const activeCasesCount = cases.filter(c => c.current < c.target).length;

  return (
    <div className="space-y-12">
      
      {/* Introduction Dashboard & Counters */}
      <div className="bg-white rounded-2xl border border-stone-100 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-islamic flex items-center gap-2">
              <HeartHandshake className="w-6 h-6 text-emerald-700 shrink-0" />
              خدمة «مِنَ النَّاسِ لِلنَّاسِ» للتكافل الأهلي والتبادل العيني
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              منصة تضامن مجتمعي مباشرة تتيح للناس مشاركة الأغراض العينية مجانًا وسداد ديون وحالات الكرب الطارئة للأسر المتعففة بنية البر المباشر.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => {
                setShowItemForm(!showItemForm);
                setShowCaseForm(false);
              }}
              className="px-3.5 py-2 bg-emerald-800 text-white font-bold rounded-lg text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              {showItemForm ? 'إلغاء النموذج' : 'أعلن عن تبرع عيني'}
            </button>
            <button
              onClick={() => {
                setShowCaseForm(!showCaseForm);
                setShowItemForm(false);
              }}
              className="px-3.5 py-2 bg-amber-700 text-white font-bold rounded-lg text-xs hover:bg-amber-600 transition-colors cursor-pointer"
            >
              {showCaseForm ? 'إلغاء النموذج' : 'سجل حالة كرب طارئة'}
            </button>
          </div>
        </div>

        {/* Dashboard stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-stone-100">
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/50">
            <span className="text-[10px] font-bold text-stone-500 uppercase">أغراض عينية متاحة حالياً</span>
            <span className="text-xl md:text-2xl font-mono font-extrabold text-stone-900 block mt-1 tabular-nums">{availableItemsCount}</span>
            <span className="text-[9px] text-stone-400 block mt-0.5">تبادل مباشر بدون وسيط</span>
          </div>
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/50">
            <span className="text-[10px] font-bold text-stone-500 uppercase">أغراض وصلت لمستحقيها</span>
            <span className="text-xl md:text-2xl font-mono font-extrabold text-emerald-800 block mt-1 tabular-nums">{claimedItemsCount}</span>
            <span className="text-[9px] text-emerald-600 block mt-0.5">كتب الله أجر الواقفين</span>
          </div>
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/50">
            <span className="text-[10px] font-bold text-stone-500 uppercase">حالات كرب نشطة تطلب العون</span>
            <span className="text-xl md:text-2xl font-mono font-extrabold text-amber-800 block mt-1 tabular-nums">{activeCasesCount}</span>
            <span className="text-[9px] text-amber-600 block mt-0.5">بانتظار مساهماتكم الكريمة</span>
          </div>
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/50">
            <span className="text-[10px] font-bold text-stone-500 uppercase">حالات كرب تم سدادها كلياً</span>
            <span className="text-xl md:text-2xl font-mono font-extrabold text-emerald-800 block mt-1 tabular-nums">{coveredCasesCount}</span>
            <span className="text-[9px] text-emerald-600 block mt-0.5">أجر ممتد وفرج دنيوي وآخري</span>
          </div>
        </div>
      </div>

      {/* Forms Segment (Conditional Display) */}
      <div className="space-y-4">
        
        {/* 1. Add Donation Item Form */}
        {showItemForm && (
          <form onSubmit={handleAddItem} className="bg-white rounded-2xl border-2 border-emerald-800/10 p-6 md:p-8 space-y-4">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">تقديم غرض عيني مجاني (من الناس للناس)</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">اسم الغرض المعروض للتبرع</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: لابتوب للدراسة، كرسي متحرك طبي، سرير كهربائي لمريض"
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">اسم المتبرع (أو فاعل خير)</label>
                <input
                  type="text"
                  placeholder="مثال: أم عبد الرحمن، فاعل خير"
                  value={itemDonor}
                  onChange={(e) => setItemDonor(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">التصنيف</label>
                <select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
                >
                  <option value="medical">معدات ومستلزمات طبية</option>
                  <option value="education">أجهزة تعليمية وكتب دراسية</option>
                  <option value="food">مواد وسلال غذائية</option>
                  <option value="clothes">ملابس شتوية وأغطية</option>
                  <option value="furniture">أثاث وأجهزة منزلية أساسية</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">المدينة والمنطقة</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: الرياض، القاهرة، مكة، طنطا"
                  value={itemCity}
                  onChange={(e) => setItemCity(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
                />
              </div>
              <div className="flex items-end">
                <span className="text-[10px] text-stone-400 font-medium leading-relaxed">
                  * يُشترط أن يكون الغرض بحالة صالحة للاستخدام المباشر صونًا لكرامة المستحق.
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">تفاصيل إضافية عن الحالة/الغرض وكيفية التسليم</label>
              <textarea
                required
                rows={3}
                placeholder="يرجى كتابة تفاصيل دقيقة عن حالة الغرض وطريقة التواصل للتسليم..."
                value={itemDesc}
                onChange={(e) => setItemDesc(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-xs focus:outline-none focus:border-emerald-600 text-right resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowItemForm(false)}
                className="px-3 py-2 border border-stone-200 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
              >
                عرض الغرض وتعميده بالمنصة
              </button>
            </div>
          </form>
        )}

        {/* 2. Add Emergency Case Form */}
        {showCaseForm && (
          <form onSubmit={handleAddCase} className="bg-white rounded-2xl border-2 border-amber-800/10 p-6 md:p-8 space-y-4">
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">تسجيل حالة كرب/تضامن مجتمعي طارئة (من الناس للناس)</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">عنوان الحالة المستحقة للعون</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: سداد ديون متراكمة، كفالة طالب يتيم، عملية جراحية"
                  value={caseTitle}
                  onChange={(e) => setCaseTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">اسم الباحث أو المسؤول عن تتبع الحالة</label>
                <input
                  type="text"
                  placeholder="مثال: جار الحالة، إمام المسجد، الباحث الاجتماعي"
                  value={caseSeeker}
                  onChange={(e) => setCaseSeeker(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">نوع الكربة / الحالة</label>
                <select
                  value={caseCategory}
                  onChange={(e) => setCaseCategory(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
                >
                  <option value="debt">سداد دين متراكم / غارمين</option>
                  <option value="medical">تكاليف عملية جراحية أو علاج حرج</option>
                  <option value="education">رسوم دراسية لليتامى</option>
                  <option value="rent">سداد إيجار متأخر لآرامل</option>
                  <option value="marriage">مستلزمات تيسير زواج يتيمات</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">المدينة أو المحافظة</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مكة، الإسكندرية، القصيم، الجيزة"
                  value={caseCity}
                  onChange={(e) => setCaseCity(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">المبلغ المطلوب بالكامل لفك الكربة</label>
                <input
                  type="number"
                  required
                  min="100"
                  value={caseTarget}
                  onChange={(e) => setCaseTarget(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">شرح مفصل ومستقل لظروف الحالة (بدون كشف الهويات لحفظ كرامتهم)</label>
              <textarea
                required
                rows={3}
                placeholder="يرجى كتابة قصة مستوفية للوضع الصحي أو المادي الصعب ومصارف صرف التبرع المتراكم..."
                value={caseDesc}
                onChange={(e) => setCaseDesc(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-xs focus:outline-none focus:border-emerald-600 text-right resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCaseForm(false)}
                className="px-3 py-2 border border-stone-200 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-700 text-white rounded-lg text-xs font-bold hover:bg-amber-600 transition-colors"
              >
                إدراج الحالة وتنشيط الدعم
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Main Sections: Left side Physical items swap, Right side emergency campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* RIGHT Column (Lg: col-7): Urgent Cases P2P Campaigns (صناديق فك الكرب) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center bg-stone-100 border border-stone-200/60 p-4 rounded-xl">
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-serif-islamic flex items-center gap-1">
                <Building2 className="w-4 h-4 text-amber-700 shrink-0" />
                صناديق التضامن الأهلي وسداد الديون
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5">مساهمات نقدية جماعية مباشرة لفك كرب الحالات الطارئة وسداد معضلاتهم.</p>
            </div>
            
            {/* Filter */}
            <select
              value={caseFilter}
              onChange={(e) => setCaseFilter(e.target.value)}
              className="bg-white border border-stone-200 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-stone-700 focus:outline-none"
            >
              <option value="all">كل الحالات</option>
              <option value="debt">ديون وغارمين</option>
              <option value="medical">عمليات وعلاج</option>
              <option value="education">رسوم دراسية</option>
              <option value="rent">إيجارات متأخرة</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredCases.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-stone-150">
                <Users className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-xs text-stone-500 font-semibold">لا توجد حالات مسجلة في هذا القسم حالياً.</p>
              </div>
            ) : (
              filteredCases.map((c) => {
                const percent = Math.min(Math.round((c.current / c.target) * 100), 100);
                const isSatisfied = c.current >= c.target;

                return (
                  <div key={c.id} className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 hover:shadow-sm transition-all">
                    
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-sm font-extrabold text-stone-900 leading-snug">{c.title}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-stone-500 mt-1 font-serif-islamic">
                          <span>الجهة المدخلة: {c.seekerName}</span>
                          <span aria-hidden="true">·</span>
                          <span>المدينة: {c.city}</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-semibold shrink-0">
                        {c.category === 'debt' ? 'ديون وغارمين' : c.category === 'medical' ? 'علاج طبي' : c.category === 'education' ? 'تعليم أيتام' : 'تضامن أهلي'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed font-normal bg-stone-50 p-3 rounded-lg border border-stone-100">
                      {c.description}
                    </p>

                    {/* Progress tracking bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline text-xs text-stone-600">
                        <span>المبلغ المستهدف الإجمالي:</span>
                        <span className="font-mono font-bold text-stone-900 tabular-nums">
                          {c.current.toLocaleString()} / {c.target.toLocaleString()} <span className="text-[10px] font-normal text-stone-500">ر.س / ج.م</span>
                        </span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${isSatisfied ? 'bg-emerald-600' : 'bg-amber-600'}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-500 font-semibold">
                        <span>اكتمل بنسبة {percent}%</span>
                        {isSatisfied && (
                          <span className="text-emerald-700 flex items-center gap-0.5">
                            <CheckCircle className="w-3.5 h-3.5" />
                            تم سداد كربته بالكامل، الحمد لله
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Simulation action row */}
                    {!isSatisfied && (
                      <div className="border-t border-stone-100 pt-3 flex gap-2 justify-end items-center">
                        <input
                          type="number"
                          placeholder="مبلغ المساعدة..."
                          value={donationAmount[c.id] || ''}
                          onChange={(e) => setDonationAmount({ ...donationAmount, [c.id]: e.target.value })}
                          className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-right focus:outline-none focus:border-amber-600 w-28 sm:w-36"
                        />
                        <button
                          onClick={() => handleDonateToCase(c.id)}
                          className="px-3.5 py-1.5 bg-amber-700 text-white font-bold rounded-lg text-xs hover:bg-amber-600 transition-colors cursor-pointer shrink-0"
                        >
                          المساهمة الآن
                        </button>
                      </div>
                    )}

                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* LEFT Column (Lg: col-5): Free items exchange hub (سوق العطاء العيني الأهلي) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex justify-between items-center bg-stone-100 border border-stone-200/60 p-4 rounded-xl">
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-serif-islamic flex items-center gap-1">
                <Gift className="w-4 h-4 text-emerald-700 shrink-0" />
                سوق العطاء العيني والتبادل المجاني
              </h3>
              <p className="text-[11px] text-stone-500 mt-0.5">أغراض فائضة ومستلزمات طبية/منزلية تقدم مجانًا بنية البر للأهالي.</p>
            </div>
            
            {/* Filter */}
            <select
              value={itemFilter}
              onChange={(e) => setItemFilter(e.target.value)}
              className="bg-white border border-stone-200 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-stone-700 focus:outline-none"
            >
              <option value="all">كل التصنيفات</option>
              <option value="medical">معدات طبية</option>
              <option value="education">كتب وأجهزة</option>
              <option value="food">سلال غذائية</option>
              <option value="clothes">ملابس وأغطية</option>
              <option value="furniture">أثاث منزلي</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-stone-150">
                <Gift className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="text-xs text-stone-500 font-semibold">لا توجد أغراض معروضة في هذا القسم حالياً.</p>
              </div>
            ) : (
              filteredItems.map((item) => {
                const isClaimed = item.status === 'claimed';
                const isDelivered = item.status === 'delivered';

                return (
                  <div key={item.id} className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 hover:shadow-sm transition-all">
                    
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-xs font-bold text-stone-900 leading-snug">{item.title}</h4>
                      <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold shrink-0 ${
                        item.status === 'available' ? 'bg-emerald-50 text-emerald-800' : 'bg-stone-100 text-stone-500'
                      }`}>
                        {item.status === 'available' ? 'متاح للطلب' : isClaimed ? 'محجوز للتسليم' : 'تم التسليم والمباركة'}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-stone-100 pt-2 font-serif-islamic">
                      <span>الواهب: {item.donorName}</span>
                      <span>المدينة: {item.city}</span>
                    </div>

                    {/* Operational interaction buttons */}
                    <div className="flex justify-end gap-1.5 pt-1.5">
                      {item.status === 'available' && (
                        <button
                          onClick={() => handleClaimItem(item.id)}
                          className="w-full text-center px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-[10px] rounded-lg transition-colors cursor-pointer"
                        >
                          طلب الغرض مجاناً للتكافل
                        </button>
                      )}
                      
                      {isClaimed && (
                        <div className="flex gap-1.5 w-full">
                          <button
                            onClick={() => handleClaimItem(item.id)}
                            className="w-1/2 text-stone-500 border border-stone-200 hover:bg-stone-50 text-[10px] font-semibold py-1 rounded-lg cursor-pointer"
                          >
                            تراجع عن الطلب
                          </button>
                          <button
                            onClick={() => handleDeliverItem(item.id)}
                            className="w-1/2 bg-emerald-800 text-white hover:bg-emerald-700 text-[10px] font-bold py-1 rounded-lg cursor-pointer flex items-center justify-center gap-0.5"
                          >
                            <BadgeCheck className="w-3 h-3" />
                            تأكيد استلام الغرض
                          </button>
                        </div>
                      )}

                      {isDelivered && (
                        <span className="text-[10px] text-emerald-800 font-bold flex items-center gap-0.5 bg-emerald-50/60 px-3 py-1 rounded-lg w-full justify-center">
                          <BadgeCheck className="w-3.5 h-3.5" />
                          تم التسليم في أبهى صور الأمانة
                        </span>
                      )}
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

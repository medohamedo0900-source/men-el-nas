import React, { useState } from 'react';
import { Sparkles, ArrowLeftRight, Droplet, BookOpen, Heart, Landmark, GraduationCap, ChevronRight, TrendingUp } from 'lucide-react';

interface Sector {
  id: string;
  name: string;
  icon: React.ReactNode;
  unitCost: number; // Cost of 1 unit of impact (in selected currency)
  unitName: string;
  unitPlural: string;
  description: string;
  statement: string;
}

const SECTORS: Sector[] = [
  {
    id: 'water',
    name: 'سُقيا الماء وتشييد الآبار',
    icon: <Droplet className="w-5 h-5 text-emerald-600" />,
    unitCost: 0.1, // 0.1 currency unit per Liter of water provided annually
    unitName: 'لتر ماء نقي',
    unitPlural: 'لترات ماء نقي',
    description: 'المساهمة في حفر الآبار الارتوازية وتمديد شبكات المياه للمناطق النائية والجافة.',
    statement: 'توفير مياه عذبة صالحة للشرب لقرى ومجتمعات تعاني من الشح المائي.'
  },
  {
    id: 'education',
    name: 'التعليم وكفالة طالب العلم',
    icon: <GraduationCap className="w-5 h-5 text-emerald-600" />,
    unitCost: 150, // 150 units to sponsor a student's basic educational needs for a year
    unitName: 'حقيبة تعليمية وطالب مكفول',
    unitPlural: 'حقائب وأدوات كفالة طلاب علم',
    description: 'توفير الرعاية الأكاديمية والكتب والأقلام وبناء الفصول الدراسية للطلاب المتعففين.',
    statement: 'إنقاذ عقول من الجهل وفتح آفاق مهنية واعدة لجيل كامل من الشباب اليتيم.'
  },
  {
    id: 'healthcare',
    name: 'الرعاية الطبية والدواء للأيتام',
    icon: <Heart className="w-5 h-5 text-emerald-600" />,
    unitCost: 75, // 75 units sponsors a medical diagnostic/treatment cycle
    unitName: 'جرعة علاجية/جلسة غسيل',
    unitPlural: 'جرعات وجلسات علاجية للمرضى',
    description: 'تمويل عيادات الوقف، توفير أجهزة غسيل الكلى، وصرف الدواء المجاني لأصحاب الأمراض المزمنة.',
    statement: 'تخفيف الآلام وصون كرامة المرضى العاجزين عن دفع تكاليف العلاج.'
  },
  {
    id: 'quran',
    name: 'طباعة وتوزيع المصاحف وعمارة المساجد',
    icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
    unitCost: 15, // 15 units to print and distribute 1 Holy Quran
    unitName: 'مصحف شريف موقوف مروّج',
    unitPlural: 'مصاحف شريفة مطبوعة وموزعة',
    description: 'طباعة المصحف الشريف وتوزيعه في أفريقيا والمناطق المحرومة، والمساهمة في فرش وبناء بيوت الله.',
    statement: 'الأجر المستمر مع كل آية تُتلى وحرف يُرتل في بقاع الأرض.'
  },
  {
    id: 'empowerment',
    name: 'تمكين الأسر المنتجة والتنمية المستدامة',
    icon: <Landmark className="w-5 h-5 text-emerald-600" />,
    unitCost: 1200, // 1200 units setup cost for small sewing shop or trade kit
    unitName: 'مشروع تنموي لأسرة متعففة',
    unitPlural: 'أسر مستقرة ومُمكَّنة مهنياً',
    description: 'توفير أدوات الإنتاج (مكائن خياطة، عربات بيع، ورش حرفية) للأرامل والأسر المحتاجة.',
    statement: 'تحويل الأسر المستهلكة إلى أسر منتجة تصون نفسها وتستغني عن الصدقة الدورية.'
  }
];

const CURRENCIES = [
  { code: 'SAR', name: 'ريال سعودي', symbol: 'ر.س' },
  { code: 'EGP', name: 'جنيه مصري', symbol: 'ج.م' },
  { code: 'AED', name: 'درهم إماراتي', symbol: 'د.إ' },
  { code: 'USD', name: 'دولار أمريكي', symbol: '$' },
  { code: 'KWD', name: 'دينار كويتي', symbol: 'د.ك' }
];

export default function WaqfCalculator() {
  const [amount, setAmount] = useState<number>(1000);
  const [selectedSector, setSelectedSector] = useState<string>('water');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('SAR');
  const [customAmountInput, setCustomAmountInput] = useState<string>('');

  const currentSector = SECTORS.find(s => s.id === selectedSector) || SECTORS[0];
  const currency = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];

  // Mathematical variables
  const EXPECTED_YIELD_RATE = 0.10; // 10% expected annual return from highly regulated endowment investments
  const annualYield = amount * EXPECTED_YIELD_RATE;
  
  // Dynamic impact calculations
  const calculateImpact = (years: number) => {
    const totalYield = annualYield * years;
    const impactQuantity = totalYield / currentSector.unitCost;
    return Math.floor(impactQuantity);
  };

  const presetAmounts = [100, 500, 1000, 5000, 10000, 25000, 50000, 100000];

  const handleCustomAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(customAmountInput);
    if (!isNaN(val) && val > 0) {
      setAmount(val);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-islamic flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-emerald-700 shrink-0" />
          حاسبة الأثر الوقفي المستدام
        </h2>
        <p className="text-sm text-stone-600 mt-1">
          اكتشف كيف تدوم وتتضاعف صدقتك الوقفية عبر الزمن. مبدأ الوقف يحافظ على أصل تبرعك (الرصيد الوقفي) ويستثمره لينفق عوائده باستمرار.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Settings Control Column */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Currency Switcher */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-2">عملة الحساب والتطبيق</label>
            <div className="grid grid-cols-5 gap-1 p-1 bg-stone-50 rounded-lg border border-stone-200/60">
              {CURRENCIES.map(c => (
                <button
                  key={c.code}
                  onClick={() => setSelectedCurrency(c.code)}
                  className={`py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                    selectedCurrency === c.code
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>

          {/* Amount Slider & Presets */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-stone-500">رأس المال الوقفي المقترح</label>
              <span className="text-lg font-bold text-emerald-800 font-mono tabular-nums">
                {amount.toLocaleString()} <span className="text-xs font-normal font-sans text-stone-500">{currency.symbol}</span>
              </span>
            </div>

            <input
              type="range"
              min="100"
              max="100000"
              step="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-emerald-700 mb-4"
            />

            {/* Presets Grid */}
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {presetAmounts.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setAmount(p);
                    setCustomAmountInput('');
                  }}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    amount === p
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {p.toLocaleString()} {currency.symbol}
                </button>
              ))}
            </div>

            {/* Custom Amount Input Form */}
            <form onSubmit={handleCustomAmountSubmit} className="flex gap-2">
              <input
                type="number"
                placeholder="أدخل مبلغاً مخصصاً..."
                value={customAmountInput}
                onChange={(e) => setCustomAmountInput(e.target.value)}
                className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-600 text-right"
              />
              <button
                type="submit"
                className="bg-stone-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors shrink-0"
              >
                تطبيق المبلغ
              </button>
            </form>
          </div>

          {/* Sectors Selection (أبواب الوقف) */}
          <div>
            <label className="block text-xs font-semibold text-stone-500 mb-2">اختر باب الوقف الخيري</label>
            <div className="space-y-2">
              {SECTORS.map((sector) => (
                <button
                  key={sector.id}
                  onClick={() => setSelectedSector(sector.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-right transition-all ${
                    selectedSector === sector.id
                      ? 'bg-emerald-950/5 border-emerald-600/50 shadow-sm ring-1 ring-emerald-600/20'
                      : 'bg-white border-stone-200/80 hover:bg-stone-50'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-emerald-50 shrink-0">
                    {sector.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-stone-900 truncate">{sector.name}</div>
                    <div className="text-[11px] text-stone-500 truncate mt-0.5">{sector.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Output Metrics Column */}
        <div className="lg:col-span-7 bg-stone-50 border border-stone-200/50 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="border-b border-stone-200 pb-4 mb-4">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">النموذج المالي المستدام للوقف</div>
              <h3 className="text-lg font-bold text-stone-900 font-serif-islamic">معادلة الأثر المتضاعف والمستمر</h3>
            </div>

            {/* Top Cards for financial distribution */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-stone-200 p-4 rounded-xl">
                <span className="block text-[11px] font-bold text-stone-500">رأس المال الموقوف (يُحفظ ويُستثمر)</span>
                <span className="text-lg font-bold text-stone-900 font-mono tabular-nums block mt-1">
                  {amount.toLocaleString()} <span className="text-xs text-stone-500 font-normal">{currency.symbol}</span>
                </span>
                <span className="text-[10px] text-stone-400 block mt-1">أصل الوقف ثابت لا يقل ولا يتم صرفه أبداً</span>
              </div>
              <div className="bg-white border border-stone-200 p-4 rounded-xl">
                <span className="block text-[11px] font-bold text-stone-500">العائد السنوي المتوقع المتاح للصرف</span>
                <span className="text-lg font-bold text-emerald-700 font-mono tabular-nums block mt-1">
                  {annualYield.toLocaleString()} <span className="text-xs text-stone-500 font-normal">{currency.symbol}</span>
                </span>
                <span className="text-[10px] text-emerald-600 block mt-1">يمثل عائد 10% ينفق بالكامل في الخير سنوياً</span>
              </div>
            </div>

            {/* Dynamic visual indicator explanation of the sector */}
            <div className="bg-emerald-950 text-emerald-100 p-4 rounded-xl mb-6">
              <div className="text-xs font-semibold text-emerald-300 mb-1">بيان أثر النفقات الوقفية الجارية:</div>
              <p className="text-xs leading-relaxed font-serif-islamic text-stone-100">
                &ldquo; {currentSector.statement} عوائد الوقف تذهب مباشرة لدعم هذا المستهدف بشكل دائم ومتجدد عاماً تلو الآخر. &rdquo;
              </p>
            </div>

            {/* Chronological Timeline Impact */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-stone-500 mb-2">الأثر التراكمي للخير عبر الأجيال (عدد الوحدات المستفيدة):</h4>
              
              <div className="space-y-3">
                {/* Year 1 */}
                <div className="flex items-center gap-3 bg-white border border-stone-200/80 rounded-xl p-3">
                  <div className="w-12 h-10 rounded-lg bg-stone-100 flex flex-col justify-center items-center text-stone-600 shrink-0 font-mono">
                    <span className="text-xs font-bold">1</span>
                    <span className="text-[9px]">سنة</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-stone-500">العائد المنصرف التراكمي: <strong className="font-mono text-stone-800">{annualYield.toLocaleString()} {currency.symbol}</strong></span>
                    <div className="text-sm font-bold text-stone-900 mt-0.5 flex items-center justify-between">
                      <span className="truncate">{currentSector.name}</span>
                      <span className="font-mono text-emerald-700 tabular-nums shrink-0">{calculateImpact(1).toLocaleString()} {calculateImpact(1) === 1 ? currentSector.unitName : currentSector.unitPlural}</span>
                    </div>
                  </div>
                </div>

                {/* Year 5 */}
                <div className="flex items-center gap-3 bg-white border border-stone-200/80 rounded-xl p-3">
                  <div className="w-12 h-10 rounded-lg bg-stone-100 flex flex-col justify-center items-center text-stone-600 shrink-0 font-mono">
                    <span className="text-xs font-bold">5</span>
                    <span className="text-[9px]">سنوات</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-stone-500">العائد المنصرف التراكمي: <strong className="font-mono text-stone-800">{(annualYield * 5).toLocaleString()} {currency.symbol}</strong></span>
                    <div className="text-sm font-bold text-stone-900 mt-0.5 flex items-center justify-between">
                      <span className="truncate">{currentSector.name}</span>
                      <span className="font-mono text-emerald-700 tabular-nums shrink-0">{(calculateImpact(5)).toLocaleString()} {calculateImpact(5) === 1 ? currentSector.unitName : currentSector.unitPlural}</span>
                    </div>
                  </div>
                </div>

                {/* Year 25 */}
                <div className="flex items-center gap-3 bg-white border border-stone-200/80 rounded-xl p-3">
                  <div className="w-12 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex flex-col justify-center items-center text-emerald-700 shrink-0 font-mono">
                    <span className="text-xs font-bold">25</span>
                    <span className="text-[9px]">جيل كامل</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-emerald-700/80">العائد المنصرف التراكمي: <strong className="font-mono text-emerald-900">{(annualYield * 25).toLocaleString()} {currency.symbol}</strong></span>
                    <div className="text-sm font-bold text-stone-900 mt-0.5 flex items-center justify-between">
                      <span className="truncate">{currentSector.name}</span>
                      <span className="font-mono text-emerald-700 font-extrabold tabular-nums shrink-0">{(calculateImpact(25)).toLocaleString()} {calculateImpact(25) === 1 ? currentSector.unitName : currentSector.unitPlural}</span>
                    </div>
                  </div>
                </div>

                {/* Year 100 */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-amber-50/40 border border-amber-200/40 rounded-xl p-3">
                  <div className="w-12 h-10 rounded-lg bg-amber-50 border border-amber-200 flex flex-col justify-center items-center text-amber-800 shrink-0 font-mono">
                    <span className="text-xs font-bold">100</span>
                    <span className="text-[9px] font-bold">قرن كامل</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-amber-800">العائد المنصرف التراكمي: <strong className="font-mono text-stone-900">{(annualYield * 100).toLocaleString()} {currency.symbol}</strong></span>
                    <div className="text-sm font-bold text-stone-950 mt-0.5 flex items-center justify-between">
                      <span className="truncate font-serif-islamic font-bold text-amber-900">أثر جاري مستمر لـ 100 عام!</span>
                      <span className="font-mono text-emerald-800 font-extrabold text-base tabular-nums shrink-0">{(calculateImpact(100)).toLocaleString()} {calculateImpact(100) === 1 ? currentSector.unitName : currentSector.unitPlural}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-200/60 pt-4 mt-6 flex items-center justify-between text-xs text-stone-500">
            <span>* الأرقام مبنية على محاكاة لاستثمارات وقفيّة بعائد سنوي متحفظ 10%.</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              أجر لا ينفذ وأثر لا ينقطع
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

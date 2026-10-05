import React, { useState, useEffect } from 'react';
import { Download, Printer, Share2, Award, Sparkles, RefreshCw, Feather } from 'lucide-react';

interface WaqfCertificateProps {
  initialValues?: {
    name: string;
    beneficiary: string;
    sector: string;
    amount: number;
  } | null;
  currencySymbol: string;
}

const SECTOR_TITLES: Record<string, string> = {
  water: 'سُقيا الماء العذبة وحفر الآبار',
  education: 'التعليم النافع وكفالة طلاب العلم',
  healthcare: 'الرعاية الطبية المستدامة وصرف الدواء',
  quran: 'طباعة وتوزيع المصحف الشريف وعمارة المساجد',
  empowerment: 'تمكين الأسر المتعففة والتنمية المهنية'
};

const DUAS = [
  'تقبل الله صدقتكم وطهر أموالكم وجعلها حجاباً لكم من النار وصدقة جارية لا تنقطع.',
  'كتب الله أجركم، وضاعف ثوابكم، وبارك في أرزاقكم، وجعلها صدقة مقبولة ودعوة مستجابة.',
  'جعل الله هذا الوقف نوراً في الدارين، وبركة في الأهل والولد، وذخراً ليوم اللقاء.',
  'تقبل الله منكم هذا العطاء المبارك وجعله صدقة جارية ممتدة الأثر ورفعة للدرجات.'
];

export default function WaqfCertificate({ initialValues, currencySymbol }: WaqfCertificateProps) {
  const [name, setName] = useState('فاعل خير');
  const [beneficiary, setBeneficiary] = useState('عن والدي ووالدتي وعائلتي الكريمة');
  const [sector, setSector] = useState('water');
  const [amount, setAmount] = useState(1000);
  const [duaIndex, setDuaIndex] = useState(0);
  const [gregorianDate, setGregorianDate] = useState('');
  const [hijriDate, setHijriDate] = useState('');

  // Handle incoming trigger values from the portfolio screen
  useEffect(() => {
    if (initialValues) {
      if (initialValues.name) setName(initialValues.name);
      if (initialValues.beneficiary) setBeneficiary(initialValues.beneficiary);
      if (initialValues.sector) setSector(initialValues.sector);
      if (initialValues.amount) setAmount(initialValues.amount);
    }
  }, [initialValues]);

  // Set default current date on load
  useEffect(() => {
    const today = new Date();
    const formattedGregorian = today.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setGregorianDate(formattedGregorian);

    // Approximate Hijri Year calculation
    const hijriYear = Math.floor((today.getFullYear() - 622) * (33 / 32));
    const formattedHijri = `رَبيع الآخر ${hijriYear} هـ`;
    setHijriDate(formattedHijri);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 md:p-8 shadow-sm">
      
      <div className="mb-6 pb-4 border-b border-stone-200">
        <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-islamic flex items-center gap-2">
          <Feather className="w-6 h-6 text-emerald-700 shrink-0" />
          منشئ الشهادات الوقفية والصدقة الجارية
        </h2>
        <p className="text-sm text-stone-600 mt-1">
          أنشئ شهادة وقفية مخصصة ومصممة بأرفع معايير الفن الإسلامي لتكريم أصحاب الوقف أو لتقديمها كهدية معنوية صدقة جارية للوالدين أو المتوفين.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: live interactive input controls */}
        <div className="lg:col-span-5 bg-stone-50 border border-stone-200 p-6 rounded-2xl space-y-4">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">تخصيص بيانات الشهادة</div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">اسم المانح / صاحب الوقف</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right font-medium"
              placeholder="مثال: صالح بن عبد الله، أو يترك كفاعل خير"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">اسم المهدى إليه (النية أو المبرة)</label>
            <input
              type="text"
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
              className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right font-medium"
              placeholder="مثال: صدقة جارية عن روح المرحوم..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">قطاع الوقف</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
              >
                {Object.entries(SECTOR_TITLES).map(([key, value]) => (
                  <option key={key} value={key}>{value.substring(0, 30)}...</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">القيمة الوقفية ({currencySymbol})</label>
              <input
                type="number"
                min="10"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
              />
            </div>
          </div>

          {/* Custom Duas selector */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-stone-600">صيغة الدعاء والتبريك المقترحة</label>
              <button
                type="button"
                onClick={() => setDuaIndex((prev) => (prev + 1) % DUAS.length)}
                className="text-[11px] text-emerald-800 font-bold flex items-center gap-0.5 hover:underline"
              >
                <RefreshCw className="w-3 h-3" />
                تغيير الدعاء
              </button>
            </div>
            <textarea
              readOnly
              value={DUAS[duaIndex]}
              className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-700 resize-none h-16 text-right focus:outline-none leading-relaxed"
            />
          </div>

          {/* Interactive Date overrides */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[10px] font-semibold text-stone-500 mb-0.5">التاريخ الميلادي</label>
              <input
                type="text"
                value={gregorianDate}
                onChange={(e) => setGregorianDate(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-right focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-stone-500 mb-0.5">التاريخ الهجري (تقريبي)</label>
              <input
                type="text"
                value={hijriDate}
                onChange={(e) => setHijriDate(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs text-right focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-800 text-white font-bold rounded-lg text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              طباعة أو حفظ الشهادة كملف PDF
            </button>
          </div>
        </div>

        {/* Right Side: The live royal certificate preview */}
        <div className="lg:col-span-7 bg-stone-100 p-4 md:p-6 rounded-2xl flex justify-center items-center">
          
          {/* Main print target container */}
          <div 
            id="print-certificate-target"
            className="w-full max-w-[500px] aspect-[3/4] bg-stone-50 border-[12px] border-amber-950/5 p-6 md:p-8 rounded-xl shadow-xl border-double relative overflow-hidden flex flex-col justify-between text-center select-none"
            style={{
              backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #faf9f5 100%)',
              borderImage: 'linear-gradient(to bottom right, #b45309, #d97706, #78350f) 20'
            }}
          >
            {/* Islamic Watermark Vector Background (Simulated through styling overlay) */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
              <svg className="w-96 h-96" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="50" cy="50" r="45" />
                <polygon points="50,5 95,50 50,95 5,50" />
                <polygon points="50,15 85,50 50,85 15,50" />
                <polygon points="50,25 75,50 50,75 25,50" />
                <circle cx="50" cy="50" r="10" />
              </svg>
            </div>

            {/* Inner Border Line */}
            <div className="absolute inset-2 border border-amber-600/30 rounded pointer-events-none" />

            {/* Certificate Header Block */}
            <div className="space-y-3 z-10">
              <div className="text-emerald-800 flex justify-center items-center gap-1">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span className="font-serif-islamic font-bold text-xl tracking-widest text-emerald-900">وَقْفٌ خَيْرِيٌّ دَائِمٌ</span>
                <Sparkles className="w-5 h-5 text-amber-600" />
              </div>
              
              {/* Quranic Verse */}
              <div className="bg-emerald-950/5 border-y border-amber-600/25 py-2 px-1 text-center">
                <p className="font-serif-islamic text-[11px] md:text-xs text-amber-900 font-medium leading-relaxed max-w-sm mx-auto">
                  « لَن تَنَالُواْ ٱلْبِرَّ حَتَّىٰ تُنفِقُواْ مِمَّا تُحِبُّونَ ۚ وَمَا تُنفِقُواْ مِن شَىْءٍ فَإِنَّ ٱللَّهَ بِهِۦ عَلِيمٌ »
                </p>
                <span className="text-[8px] text-stone-500 font-serif-islamic font-bold block mt-0.5">سورة آل عمران، الآية ٩٢</span>
              </div>
            </div>

            {/* Certificate Body Block */}
            <div className="my-6 space-y-4 z-10">
              <h3 className="font-serif-islamic text-2xl md:text-3xl font-extrabold text-stone-900 tracking-wide">
                شَهَادَةُ تَوْثِيقِ وَقْفِيَّة
              </h3>

              <p className="text-xs md:text-sm text-stone-700 leading-relaxed font-serif-islamic px-2">
                بِحَمْدِ اللهِ تَعَالَى وَتَوْفِيقِهِ، فَقَدْ تَقَرَّرَ تَوْثِيقُ وَقْفٍ مُسْتَدَامٍ وَتَسْجِيلِهِ فِي مَبَرَّةِ هَذِهِ المَنَصَّةِ الخَيْرِيَّةِ، بِنِيَّةٍ صَالِحَةٍ خَالِصَةٍ لِوَجْهِ اللهِ الكَرِيم.
              </p>

              {/* Donor Name Label */}
              <div className="space-y-1">
                <span className="text-[10px] text-stone-500 block">بِمُسَاهَمَةِ وَإِنْفَاقِ الجِهَةِ الوَاقِفَة:</span>
                <span className="text-base md:text-lg font-bold text-emerald-800 border-b border-stone-300 pb-1 px-6 inline-block font-serif-islamic min-w-[200px]">
                  {name || 'فاعل خير'}
                </span>
              </div>

              {/* Beneficiary Name Label */}
              {beneficiary && (
                <div className="space-y-0.5">
                  <span className="text-[9px] text-stone-500 block">مُهْدَاةٌ وَمَوْقُوفَةٌ لِـ (صَاحِبِ الأَثَر):</span>
                  <span className="text-xs md:text-sm font-semibold text-amber-800 font-serif-islamic">
                    {beneficiary}
                  </span>
                </div>
              )}

              {/* Sector details */}
              <div className="bg-stone-100/60 border border-stone-200/50 p-3 rounded-lg max-w-xs mx-auto">
                <span className="text-[9px] text-stone-500 block">البَابُ الخَيْرِيُّ المَوْقُوفُ عَلَيْهِ:</span>
                <span className="text-xs md:text-sm font-bold text-stone-900 font-serif-islamic block mt-0.5">
                  {SECTOR_TITLES[sector] || sector}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold block mt-1 font-mono tabular-nums">
                  بِقِيمَةٍ وَقْفِيَّة: {amount.toLocaleString()} {currencySymbol}
                </span>
              </div>

              {/* Dua Block */}
              <p className="text-[11px] leading-relaxed text-emerald-800 font-serif-islamic font-bold px-4">
                &ldquo; {DUAS[duaIndex]} &rdquo;
              </p>
            </div>

            {/* Certificate Footer Stamp & Dates */}
            <div className="border-t border-stone-200/80 pt-4 flex justify-between items-end text-right z-10">
              
              {/* Dates */}
              <div className="space-y-0.5 text-[9px] text-stone-500 font-serif-islamic">
                <div>التحرير في: <span className="font-mono tabular-nums">{gregorianDate}</span></div>
                <div>الموافق لـ: <span className="font-mono">{hijriDate}</span></div>
              </div>

              {/* Royal Seal / Stamp Representation */}
              <div className="relative flex items-center justify-center shrink-0">
                <div className="w-14 h-14 rounded-full border-2 border-double border-amber-600 flex items-center justify-center bg-amber-50/50 transform rotate-12 shadow-sm">
                  <div className="w-11 h-11 rounded-full border border-dashed border-amber-600/60 flex flex-col items-center justify-center text-[8px] font-bold text-amber-800 font-serif-islamic leading-none select-none">
                    <span>مَوْقُوفٌ</span>
                    <span className="font-semibold text-[7px] text-emerald-800 mt-0.5">وَقْفٌ صَحِيحٌ</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Styled Printable Frame CSS Injector */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-certificate-target, #print-certificate-target * {
            visibility: visible;
          }
          #print-certificate-target {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(1.2);
            width: 100% !important;
            max-width: 550px !important;
            box-shadow: none !important;
            border: 20px double #78350f !important;
            background-color: #ffffff !important;
          }
        }
      `}</style>

    </div>
  );
}

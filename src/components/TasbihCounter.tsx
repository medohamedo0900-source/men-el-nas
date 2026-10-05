import React, { useState } from 'react';
import { RefreshCw, Sparkles, BookOpen, Heart, MessageSquareDot } from 'lucide-react';

const DHIKR_PRESETS = [
  { text: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ', target: 33, meaning: 'تُقِرّ بتنزيه الخالق وجميل تسبيحه، تمحو الخطايا ولو كانت مثل زبد البحر.' },
  { text: 'الْحَمْدُ للهِ كَثِيرًا', target: 33, meaning: 'الاعتراف بدائم النعم والفضل، والحمد ملء الميزان وباعث المزيد.' },
  { text: 'أَسْتَغْفِرُ اللهَ الْعَظِيمَ', target: 33, meaning: 'مفتاح الرزق وممحاة الذنوب وجالب السكينة والفرج العظيم.' },
  { text: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ', textFull: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', target: 10, meaning: 'أفضل ما قاله النبيون، حرز وحصن من الشيطان ورفع للدرجات.' },
  { text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ', target: 10, meaning: 'صلاة واحدة من العبد يصلي بها الله عليه عشراً، ونوال لشفاعة المصطفى.' }
];

const HADITHS = [
  'عن أبي هريرة رضي الله عنه أن رسول الله ﷺ قال: « إِذَا مَاتَ ابنُ آدمَ انْقَطَعَ عَمَلُهُ إِلَّا مِنْ ثَلَاثٍ: صَدَقَةٌ جَارِيَةٌ، أَوْ عِلْمٌ يُنْتَفَعُ بِهِ، أَوْ وَلَدٌ صَالِحٌ يَدْعُو لَهُ ».',
  'قال رسول الله ﷺ: « إِنَّ مِمَّا يَلْحَقُ الْمُؤْمِنَ مِنْ عَمَلِهِ وَحَسَنَاتِهِ بَعْدَ مَوْتِهِ: عِلْمًا عَلَّمَهُ وَنَشَرَهُ، وَوَلَدًا صَالِحًا تَرَكَهُ، وَمُصْحَفًا وَرَّثَهُ، أَوْ مَسْجِدًا بَنَاهُ، أَوْ بَيْتًا لِابْنِ السَّبِيلِ بَنَاهُ، أَوْ نَهْرًا أَجْرَاهُ، أَوْ صَدَقَةً أَخْرَجَهَا مِنْ مَالِهِ فِي صِحَّتِهِ وَحَيَاتِهِ يَلْحَقُهُ مِنْ بَعْدِ مَوْتِهِ ».',
  'قال ﷺ: « كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله وبحمده، سبحان الله العظيم ».'
];

export default function TasbihCounter() {
  const [selectedDhikr, setSelectedDhikr] = useState(0);
  const [count, setCount] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [pulse, setPulse] = useState(false);

  const dhikr = DHIKR_PRESETS[selectedDhikr];
  const progressPercent = Math.min((count / dhikr.target) * 100, 100);

  const handleIncrement = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 150);

    const nextCount = count + 1;
    setSessionTotal((prev) => prev + 1);

    if (nextCount >= dhikr.target) {
      setCount(0);
      setCycles((prev) => prev + 1);
    } else {
      setCount(nextCount);
    }
  };

  const handleReset = () => {
    setCount(0);
    setSessionTotal(0);
    setCycles(0);
  };

  const selectDhikrHandler = (index: number) => {
    setSelectedDhikr(index);
    setCount(0);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-islamic flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-700 shrink-0" />
          مسبحة الأثر الروحي والصدقات الجارية
        </h2>
        <p className="text-sm text-stone-600 mt-1">
          قال لقمان لابنه: «يا بني عود لسانك: اللهم اغفر لي، فإن لله ساعات لا يرد فيها سائلاً». اربط عطاءك المالي الدائم بذكر الله المستمر في كل حين.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Presets Selection Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider">اختر الورد اليومي</label>
          <div className="grid grid-cols-1 gap-2">
            {DHIKR_PRESETS.map((preset, index) => (
              <button
                key={preset.text}
                onClick={() => selectDhikrHandler(index)}
                className={`w-full text-right p-3 rounded-xl border transition-all ${
                  selectedDhikr === index
                    ? 'bg-emerald-50 border-emerald-500 shadow-sm ring-1 ring-emerald-500/20'
                    : 'bg-white border-stone-200/80 hover:bg-stone-50'
                }`}
              >
                <div className="text-sm font-bold text-stone-900 font-serif-islamic">{preset.text}</div>
                <div className="text-[10px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">{preset.meaning}</div>
                <div className="text-[9px] text-emerald-800 font-bold mt-1">المستهدف: {preset.target} تكرارات</div>
              </button>
            ))}
          </div>

          {/* Spiritual wisdom card */}
          <div className="bg-emerald-950 text-emerald-100 p-4 rounded-xl space-y-2 mt-4">
            <div className="text-xs font-bold text-emerald-300 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              من مشكاة النبوة:
            </div>
            <p className="text-[11px] leading-relaxed font-serif-islamic text-stone-100">
              {HADITHS[selectedDhikr % HADITHS.length]}
            </p>
          </div>
        </div>

        {/* Counter UI Interaction Center */}
        <div className="lg:col-span-8 bg-stone-50 border border-stone-200 p-6 md:p-8 rounded-2xl flex flex-col justify-between items-center text-center">
          
          <div className="w-full">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">عداد الورد الحالي</div>
            <h3 className="text-xl md:text-2xl font-serif-islamic font-bold text-stone-900 leading-snug px-4 min-h-[3.5rem] flex items-center justify-center">
              {dhikr.textFull || dhikr.text}
            </h3>
          </div>

          {/* Interactive Circle Click Trigger */}
          <div className="relative my-8 select-none">
            
            {/* Background decorative animated ring */}
            <div className="absolute inset-0 rounded-full bg-emerald-700/5 animate-pulse" />
            
            <button
              onClick={handleIncrement}
              className={`w-48 h-48 md:w-56 md:h-56 rounded-full bg-white border-[6px] border-emerald-900/10 shadow-2xl flex flex-col justify-center items-center relative z-10 focus:outline-none transition-transform duration-75 cursor-pointer ${
                pulse ? 'scale-95 border-emerald-600' : 'hover:scale-[1.02]'
              }`}
            >
              
              {/* Circular SVG Progress Overlay */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="#10b981"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progressPercent) / 100}
                  className="transition-all duration-300"
                />
              </svg>

              <span className="text-4xl md:text-5xl font-mono font-extrabold text-stone-900 tracking-tight tabular-nums">
                {count}
              </span>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">
                تكرار من {dhikr.target}
              </span>

              <div className="mt-3 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-[10px] flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 fill-emerald-800" />
                اضغط للتسبيح
              </div>

            </button>
          </div>

          {/* Statistics summary row */}
          <div className="w-full grid grid-cols-3 gap-2 border-t border-stone-200/60 pt-4">
            <div className="text-center">
              <span className="text-[10px] text-stone-500 block">الدورات المكتملة</span>
              <span className="text-lg font-bold text-stone-900 font-mono tabular-nums block mt-0.5">{cycles}</span>
            </div>
            <div className="text-center border-x border-stone-200">
              <span className="text-[10px] text-stone-500 block">مجموع الجلسة الحالية</span>
              <span className="text-lg font-bold text-emerald-800 font-mono tabular-nums block mt-0.5">{sessionTotal}</span>
            </div>
            <div className="text-center flex items-center justify-center">
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-stone-500 hover:text-stone-950 text-[10px] font-bold p-1 bg-white border border-stone-200 rounded-lg hover:shadow-sm transition-all"
                title="تصفير العداد"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                إعادة ضبط
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

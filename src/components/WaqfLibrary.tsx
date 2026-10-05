import React, { useState } from 'react';
import { BookOpen, HelpCircle, ChevronDown, Landmark, Sparkles, Lightbulb } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'ما هو الوقف الخيري لغةً واصطلاحاً؟',
    answer: 'الوقف في اللغة يعني الحبس والمنع. وفي الاصطلاح الشرعي: هو "حبس العين وتسبيل المنفعة". والمقصود هو تجميد أصل مالي أو عقاري أو نقدي بحيث لا يُباع ولا يُوهب ولا يُورث، وتوجيه أرباحه وعوائده الاستثمارية بالكامل للإنفاق في سبل الخير والمصالح العامة.'
  },
  {
    question: 'كيف يختلف الوقف الخيري عن الصدقة العادية والزكاة؟',
    answer: 'الصدقة العادية تُنفق عينها وتنتهي بمجرد دفعها (مثال: تقديم طعام لفقير). والزكاة لها مصارف شرعية ثمانية محددة ويجب صرفها بالكامل خلال العام. أما الوقف، فأصله دائم لا ينفد، ويبقى رصيده يُدر أرباحاً جارية تُنفق على المصارف الخيرية باستمرار على مدار عقود وقرون دون فناء.'
  },
  {
    question: 'هل يجوز وقف النقود والأسهم المالية إلكترونياً؟',
    answer: 'نعم، أجاز مجمع الفقه الإسلامي وهيئات كبار العلماء وقف النقود والأسهم والوحدات الاستثمارية. حيث يتم استثمار هذه المبالغ النقدية في صناديق وقفية آمنة تخضع لرقابة شرعية مشددة، ويتم صرف ريعها الاستثماري السنوي في الأبواب الخيرية المحددة للوقف.'
  },
  {
    question: 'ما هي شروط صحة الوقف في الشريعة الإسلامية؟',
    answer: 'يُشترط في الوقف: أهلية الواقف (أن يكون بالغاً عاقلاً مختاراً)، كون الموقوف مما ينتفع به مع بقاء أصله، تحديد جهة الخير الموقوف عليها (جهة بر لا معصية فيها)، وصيغة الوقف اللفظية أو الفعلية الدالة على إرادة الوقف والتأبيد.'
  },
  {
    question: 'هل يمكنني جعل الوقف صدقة جارية عن والدي المتوفين؟',
    answer: 'نعم بلا شك، بل هو من أفضل وجوه البر بالوالدين بعد وفاتهما. عن سعد بن عبادة رضي الله عنه قال: قلت يا رسول الله، إن أمي ماتت أفأتصدق عنها؟ قال: نعم، قلت فأي الصدقة أفضل؟ قال: «سُقيا الماء». وهذا أصل في جواز ومستحب الوقف وصرف عوائده ثواباً للمتوفين.'
  }
];

const HISTORIC_FACTS = [
  {
    title: 'وقف المكتبات والكتب العامة',
    content: 'في العهد العباسي والأندلسي، كانت المكتبات الكبرى كبيت الحكمة تُشيّد وتُدار بالكامل عبر الأوقاف الخيرية، التي شملت رواتب النساخ، والمترجمين، وتوفير الورق والحبر مجاناً لطلاب العلم.'
  },
  {
    title: 'أوقاف الرعاية الطبية والمستشفيات',
    content: 'البيمارستانات (المستشفيات الإسلامية التاريخية) كانت تقدّم العلاج والعمليات وصرف الأدوية بالمجان للفقراء والأغنياء على السواء، بتمويل كامل من أراضٍ ومزارع موقوفة ومخصصة لعلاج المرضى.'
  },
  {
    title: 'أوقاف رعاية الحيوانات والطيور',
    content: 'امتدت حضارة الأوقاف لتشمل الحيوانات؛ حيث تأسست أوقاف مخصصة لفرش الحبوب على أسطح المساجد لإطعام الطيور المهاجرة، وأوقاف أخرى لعلاج الخيول والجمال الهرمة وإيوائها.'
  },
  {
    title: 'وقف تيسير الزواج والأعراس',
    content: 'وجدت في دمشق والقاهرة أوقاف تسمى "وقف تيسير الأعراس"، مخصصة لإعارة الحلي والملابس الفاخرة للعرائس الفقيرات ليلة زفافهن، ليدخلن البهجة على قلوبهن دون تكلفة.'
  }
];

export default function WaqfLibrary() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-white rounded-2xl border border-stone-100 p-6 md:p-8 shadow-sm">
      
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-stone-900 font-serif-islamic flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-700 shrink-0" />
          مكتبة المعرفة الوقفية والفقهية
        </h2>
        <p className="text-sm text-stone-600 mt-1">
          تعرّف على فقه الوقف وأحكامه الشرعية، واطلع على صفحات ناصعة من تاريخ الأوقاف الإسلامية الحضاري وكيف أسست للتكافل والتنمية الاجتماعية.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FAQs Accordion Block */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            الأسئلة الشائعة والأحكام الفقهية
          </div>

          <div className="space-y-2">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-stone-50 border border-stone-200/60 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-right p-4 font-bold text-xs md:text-sm text-stone-900 flex justify-between items-center hover:bg-stone-100/50 transition-colors cursor-pointer"
                  >
                    <span className="font-serif-islamic tracking-wide">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="p-4 pt-0 border-t border-stone-200/40 text-xs text-stone-600 leading-relaxed font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Historic & Inspiring Snippets Block */}
        <div className="lg:col-span-5 bg-stone-50 border border-stone-200 p-6 rounded-2xl space-y-6">
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
            <Landmark className="w-4 h-4" />
            روائع من تاريخ الأوقاف الإسلامية
          </div>

          <div className="space-y-4">
            {HISTORIC_FACTS.map((fact, index) => (
              <div key={index} className="bg-white border border-stone-200/60 p-4 rounded-xl space-y-1 hover:border-amber-700/20 transition-all">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 font-serif-islamic">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{fact.title}</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
                  {fact.content}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Callout */}
          <div className="bg-emerald-950 text-emerald-100 p-4 rounded-xl flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-[10px] leading-relaxed">
              <span className="font-bold block text-white mb-0.5">هل تعلم؟</span>
              أن أقدم وقف خيري مستمر في العالم الإسلامي هو بستان نخيل الصحابي الجليل عمر بن الخطاب رضي الله عنه في خيبر، وكذلك بئر رومة الذي اشتراه عثمان بن عفان رضي الله عنه وسبّله للمسلمين.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

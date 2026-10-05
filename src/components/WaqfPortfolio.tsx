import React, { useState, useEffect } from 'react';
import { Plus, Trash2, PiggyBank, Heart, Sparkles, Award, ArrowUpRight } from 'lucide-react';

interface PortfolioItem {
  id: string;
  name: string;
  sector: string;
  target: number;
  current: number;
  beneficiary: string;
  dateCreated: string;
}

interface WaqfPortfolioProps {
  onTriggerCertificate: (name: string, beneficiary: string, sector: string, amount: number) => void;
  currencySymbol: string;
}

const SECTOR_LABELS: Record<string, string> = {
  water: 'سُقيا الماء وتشييد الآبار',
  education: 'التعليم وكفالة طالب العلم',
  healthcare: 'الرعاية الطبية والدواء للأيتام',
  quran: 'طباعة المصاحف وعمارة المساجد',
  empowerment: 'تمكين الأسر المنتجة والتنمية'
};

export default function WaqfPortfolio({ onTriggerCertificate, currencySymbol }: WaqfPortfolioProps) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [sector, setSector] = useState('water');
  const [target, setTarget] = useState('10000');
  const [current, setCurrent] = useState('1000');
  const [beneficiary, setBeneficiary] = useState('');

  // Deposit state
  const [depositAmount, setDepositAmount] = useState<Record<string, string>>({});

  // Load items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('waqf_portfolio_items');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading portfolio from local storage", e);
      }
    } else {
      // Seed default items if empty
      const defaultItems: PortfolioItem[] = [
        {
          id: '1',
          name: 'وقف سقيا الماء الارتوازي',
          sector: 'water',
          target: 15000,
          current: 4500,
          beneficiary: 'لوالدي ووالدتي رحمة الله عليهما',
          dateCreated: '2026-05-12'
        },
        {
          id: '2',
          name: 'صدقة جارية لكفالة طلاب علم الحلقات',
          sector: 'education',
          target: 5000,
          current: 5000,
          beneficiary: 'صدقة عن عائلتي الكريمة',
          dateCreated: '2026-08-01'
        }
      ];
      setItems(defaultItems);
      localStorage.setItem('waqf_portfolio_items', JSON.stringify(defaultItems));
    }
  }, []);

  const saveToStorage = (updated: PortfolioItem[]) => {
    setItems(updated);
    localStorage.setItem('waqf_portfolio_items', JSON.stringify(updated));
  };

  const handleAddFund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      name: name.trim(),
      sector,
      target: parseFloat(target) || 5000,
      current: parseFloat(current) || 0,
      beneficiary: beneficiary.trim() || 'عن نفسي وأهلي',
      dateCreated: new Date().toISOString().split('T')[0]
    };

    const updated = [newItem, ...items];
    saveToStorage(updated);
    
    // Reset form
    setName('');
    setBeneficiary('');
    setTarget('10000');
    setCurrent('1000');
    setShowAddForm(false);
  };

  const handleDeleteFund = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    saveToStorage(updated);
  };

  const handleDeposit = (id: string) => {
    const amountStr = depositAmount[id];
    const amountVal = parseFloat(amountStr);
    if (isNaN(amountVal) || amountVal <= 0) return;

    const updated = items.map(item => {
      if (item.id === id) {
        const newCurrent = Math.min(item.current + amountVal, item.target * 5); // Allow overflow but track properly
        return { ...item, current: newCurrent };
      }
      return item;
    });

    saveToStorage(updated);
    setDepositAmount(prev => ({ ...prev, [id]: '' }));
  };

  // Portfolio total statistics
  const totalInvested = items.reduce((acc, curr) => acc + curr.current, 0);
  const totalTarget = items.reduce((acc, curr) => acc + curr.target, 0);
  const activeCount = items.length;

  return (
    <div className="space-y-6">
      
      {/* Overview Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-stone-100 p-5 shadow-sm">
          <div className="text-xs font-semibold text-stone-500 mb-1">إجمالي الأوقاف المسجلة</div>
          <div className="text-2xl font-bold text-stone-900 font-mono tabular-nums flex items-baseline gap-1">
            {activeCount}
            <span className="text-xs font-normal text-stone-500 font-sans">أوعية وقفية</span>
          </div>
          <div className="text-[10px] text-emerald-600 font-medium mt-1">تنمو عوائدها وأجرها باستمرار</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-100 p-5 shadow-sm">
          <div className="text-xs font-semibold text-stone-500 mb-1">مجموع رأس المال الوقفي (المحاكي)</div>
          <div className="text-2xl font-bold text-emerald-800 font-mono tabular-nums">
            {totalInvested.toLocaleString()} <span className="text-xs font-normal text-stone-500 font-sans">{currencySymbol}</span>
          </div>
          <div className="text-[10px] text-stone-400 mt-1">الأصل محمي ومحفوظ بالكامل كأصول وقفية</div>
        </div>

        <div className="bg-white rounded-xl border border-stone-100 p-5 shadow-sm">
          <div className="text-xs font-semibold text-stone-500 mb-1">العائد السنوي الدائم المتاح للصرف</div>
          <div className="text-2xl font-bold text-amber-700 font-mono tabular-nums">
            {(totalInvested * 0.1).toLocaleString()} <span className="text-xs font-normal text-stone-500 font-sans">{currencySymbol}</span>
          </div>
          <div className="text-[10px] text-amber-600 font-semibold mt-1">يوزّع بنسبة 100% في أبواب الخير سنوياً</div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex justify-between items-center bg-stone-50 border border-stone-200/60 p-4 rounded-xl">
        <div>
          <h3 className="text-sm font-bold text-stone-900 font-serif-islamic">محفظتي للأوقاف والصدقات الجارية</h3>
          <p className="text-xs text-stone-500 mt-0.5">أنشئ صناديق وقفية افتراضية مخصصة، وراقب نمو الصدقة المستمرة لك أو لمن تحب.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          {showAddForm ? 'إلغاء الإضافة' : 'إنشاء صندوق وقفي جديد'}
        </button>
      </div>

      {/* Add New Fund Form Panel */}
      {showAddForm && (
        <form onSubmit={handleAddFund} className="bg-stone-50 border border-emerald-800/10 rounded-2xl p-6 space-y-4">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">تأسيس وقف خيري جديد</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">اسم الصندوق الوقفي</label>
              <input
                type="text"
                required
                placeholder="مثال: وقف سقيا الماء الارتوازي، كفالة طالب علم الأيتام"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">الواقف / المهدى إليه (النية)</label>
              <input
                type="text"
                placeholder="مثال: عن والدي ووالدتي، صدقة جارية عن عائلتي"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">باب الوقف</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
              >
                {Object.entries(SECTOR_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">المبلغ المستهدف للصندوق ({currencySymbol})</label>
              <input
                type="number"
                required
                min="100"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">المساهمة الوقفية المبدئية ({currencySymbol})</label>
              <input
                type="number"
                required
                min="0"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600 text-right"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-2 border border-stone-200 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-100"
            >
              تراجع
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
            >
              تأسيس الصندوق وتعميده
            </button>
          </div>
        </form>
      )}

      {/* Funds Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-stone-50 rounded-2xl border border-stone-200/60">
            <PiggyBank className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-stone-700">لا يوجد صناديق وقفية نشطة حالياً</h4>
            <p className="text-xs text-stone-500 mt-1">ابدأ بإنشاء صندوقك الوقفي الأول لتبدأ تتبع عوائدك المستدامة.</p>
          </div>
        ) : (
          items.map((item) => {
            const percentage = Math.min(Math.round((item.current / item.target) * 100), 100);
            const isCompleted = item.current >= item.target;

            return (
              <div key={item.id} className="bg-white rounded-2xl border border-stone-200/80 p-5 flex flex-col justify-between hover:shadow-md hover:border-emerald-700/20 transition-all">
                
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] text-stone-400 font-mono">{item.dateCreated}</span>
                    <button
                      onClick={() => handleDeleteFund(item.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="حذف الصندوق"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Headings */}
                  <div className="mb-4">
                    <h4 className="text-sm font-extrabold text-stone-900 leading-snug">{item.name}</h4>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium mt-1">
                      <span>الباب:</span>
                      <span>{SECTOR_LABELS[item.sector] || item.sector}</span>
                    </div>
                    {item.beneficiary && (
                      <div className="text-[11px] text-stone-500 italic mt-1 font-serif-islamic">
                        النية: {item.beneficiary}
                      </div>
                    )}
                  </div>

                  {/* Fund Metrics Progress */}
                  <div className="space-y-1 mb-5">
                    <div className="flex justify-between items-baseline text-xs text-stone-600">
                      <span>المساهمة الوقفية الحالية:</span>
                      <span className="font-mono font-bold text-stone-950 tabular-nums">
                        {item.current.toLocaleString()} / {item.target.toLocaleString()}{' '}
                        <span className="text-[10px] font-normal text-stone-500">{currencySymbol}</span>
                      </span>
                    </div>
                    
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          isCompleted ? 'bg-emerald-600' : 'bg-amber-600'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-semibold text-stone-500">
                      <span>اكتمال التأسيس: {percentage}%</span>
                      {isCompleted && (
                        <span className="text-emerald-700 flex items-center gap-0.5">
                          <Award className="w-3 h-3" />
                          مكتمل ومستدام بالكامل
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions for each fund card */}
                <div className="border-t border-stone-100 pt-3 flex flex-col sm:flex-row gap-2 justify-between items-center">
                  
                  {/* Simulate Deposit input and button */}
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <input
                      type="number"
                      placeholder={`مبلغ المساهمة...`}
                      value={depositAmount[item.id] || ''}
                      onChange={(e) => setDepositAmount({ ...depositAmount, [item.id]: e.target.value })}
                      className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-[11px] w-full sm:w-24 focus:outline-none focus:border-emerald-600 text-right"
                    />
                    <button
                      onClick={() => handleDeposit(item.id)}
                      className="bg-stone-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      إضافة مساهمة
                    </button>
                  </div>

                  {/* Certificate Link trigger */}
                  <button
                    onClick={() => onTriggerCertificate(item.name, item.beneficiary, item.sector, item.current)}
                    className="w-full sm:w-auto flex items-center justify-center gap-1 px-2.5 py-1.5 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>استخراج الشهادة</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}

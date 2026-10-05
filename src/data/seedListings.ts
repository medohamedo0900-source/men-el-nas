export type ScopeType = 'aid' | 'craftsman' | 'urgent';

export interface CommunityListing {
  id: string;
  scope: ScopeType; // 'aid' (الناس للناس مجاناً) | 'craftsman' (حرفي/أرزاق) | 'urgent' (طلب عاجل)
  category: 'medical' | 'emergency' | 'food' | 'crafts' | 'education' | 'transport' | 'electronics' | 'clothes';
  title: string;
  governorate: string;
  city: string;
  phone: string;
  whatsapp: string;
  description: string;
  price: string;
  providerName: string;
  rating?: number;
  badge: string;
  dateAdded: string;
  verified?: boolean;
}

export const SEED_LISTINGS: CommunityListing[] = [
  // A. الخير والتطوع (Public Aid & Volunteering - 100% Free)
  {
    id: 'aid-1',
    scope: 'aid',
    category: 'medical',
    title: 'إعارة أسطوانة أكسجين طبية + منظم مجاناً',
    governorate: 'المنيا',
    city: 'ملوي',
    phone: '01012345678',
    whatsapp: '201012345678',
    description: 'أسطوانة أكسجين 40 لتر جاهزة مع منظم ومستلزمات نُعيرها لوجه الله تعالى لحالات ضيق التنفس المرضية مجاناً حتى الشفاء.',
    price: 'مجاناً (إعارة لوجه الله)',
    providerName: 'جمعية شباب الخير بملوي',
    rating: 4.9,
    badge: 'الناس للناس ❤️ (مجاناً)',
    dateAdded: '2026-10-01',
    verified: true
  },
  {
    id: 'aid-2',
    scope: 'aid',
    category: 'medical',
    title: 'كرسي متحرك طبي حديث للإعارة الفورية',
    governorate: 'المنيا',
    city: 'المنيا (المركز)',
    phone: '01123456789',
    whatsapp: '201123456789',
    description: 'كرسي متحرك كبار سن بحالة ممتازة مخصص لإعارة المرضى وكبار السن مجاناً بدون مقابل.',
    price: 'مجاناً (إعارة لوجه الله)',
    providerName: 'الحاج مسعود (فاعل خير)',
    rating: 5.0,
    badge: 'الناس للناس ❤️ (مجاناً)',
    dateAdded: '2026-09-28',
    verified: true
  },
  {
    id: 'aid-3',
    scope: 'aid',
    category: 'emergency',
    title: 'شبكة متبرعين بالدم طوارئ - فصيلة O+ و A-',
    governorate: 'القاهرة',
    city: 'المعادي',
    phone: '01234567890',
    whatsapp: '201234567890',
    description: 'مجموعة متطوعين جاهزون للتبرع بالدم فوراً للحالات الحرجة والعمليات بمستشفيات المعادي والقصر العيني.',
    price: 'مجاناً (تبرع لله)',
    providerName: 'فريق شريان الحياة',
    rating: 4.8,
    badge: 'الناس للناس ❤️ (مجاناً)',
    dateAdded: '2026-10-03',
    verified: true
  },
  {
    id: 'aid-4',
    scope: 'aid',
    category: 'clothes',
    title: 'بنك ملابس شتوية مجاني للأسر المتعففة والتجهيز',
    governorate: 'أسيوط',
    city: 'ديروط',
    phone: '01098765432',
    whatsapp: '201098765432',
    description: 'ملابس وأغطية شتوية جديدة ومستعملة بحالة ممتازة للأطفال والأسر وتجهيز العرائس اليتيمات مجاناً.',
    price: 'مجاناً (تضامن أهلي)',
    providerName: 'مبادرة ثوب ودفء',
    rating: 4.9,
    badge: 'الناس للناس ❤️ (مجاناً)',
    dateAdded: '2026-09-25',
    verified: true
  },
  {
    id: 'aid-5',
    scope: 'aid',
    category: 'education',
    title: 'دروس تقوية ومراجعات مجانية لطلاب الثانوية',
    governorate: 'الجيزة',
    city: 'الهرم',
    phone: '01555443322',
    whatsapp: '201555443322',
    description: 'استاذ فيزياء متطوع يقدم حصص مراجعة مجانية لطلاب الثانوية العامة غير القادرين كل يوم جمعة.',
    price: 'مجاناً (تطوع علمي)',
    providerName: 'أ. محمد السعيد',
    rating: 5.0,
    badge: 'الناس للناس ❤️ (مجاناً)',
    dateAdded: '2026-09-30',
    verified: true
  },

  // B. الصنائعية والمهن الحرة (Local Craftsmen & Small Businesses)
  {
    id: 'craft-1',
    scope: 'craftsman',
    category: 'crafts',
    title: 'سباك وصيانات منزلية أمنة وأسعار رحيمة',
    governorate: 'المنيا',
    city: 'ملوي',
    phone: '01011122233',
    whatsapp: '201011122233',
    description: 'تأسيس وصيانة كافة أعمال السباكة، تسليك انسدادات، تركيزات فلاتر وسخانات. خصم خاص للأسر المتعففة والمساجد.',
    price: 'سعر مناسب / مصنعية رحيمة',
    providerName: 'الأسطى مصطفى السباك',
    rating: 4.9,
    badge: 'صاحب حرفة/خدمة 💼',
    dateAdded: '2026-10-02',
    verified: true
  },
  {
    id: 'craft-2',
    scope: 'craftsman',
    category: 'crafts',
    title: 'كهربائي سيليسيون وصيانة أجهزة منزلية',
    governorate: 'القاهرة',
    city: 'مدينة نصر',
    phone: '01222334455',
    whatsapp: '201222334455',
    description: 'إصلاح جميع أعطال الكهرباء المنزلية، تركيب كشافات طوارئ، وصيانة الغسالات والمراوح بأمانة وضمان.',
    price: 'معاينة 50 ج.م فقط',
    providerName: 'الأسطى حسن الكهربائي',
    rating: 4.8,
    badge: 'صاحب حرفة/خدمة 💼',
    dateAdded: '2026-09-29',
    verified: true
  },
  {
    id: 'craft-3',
    scope: 'craftsman',
    category: 'food',
    title: 'وجبات أكل بيتي صحي ونظيف للأسر والمغتربين',
    governorate: 'الإسكندرية',
    city: 'سموحة',
    phone: '01144556677',
    whatsapp: '201144556677',
    description: 'طواجن، خضار، محاشي، ومخبوزات بيتي بسمن بلدي ونظافة فائقة للطلبة والموظفين بأسعار اقتصادية.',
    price: 'أسعار تبدأ من 35 ج.م',
    providerName: 'مطبخ أم أحمد للأكل البيتي',
    rating: 5.0,
    badge: 'صاحب حرفة/خدمة 💼',
    dateAdded: '2026-10-01',
    verified: true
  },
  {
    id: 'craft-4',
    scope: 'craftsman',
    category: 'crafts',
    title: 'فني تكييفات وتبريد - تنظيف وصيانة وتعبئة فريون',
    governorate: 'الجيزة',
    city: '6 أكتوبر',
    phone: '01066778899',
    whatsapp: '201066778899',
    description: 'فني متمرس لفك وتركيب التكييفات وشحن فريون أصلي وصيانة الثلاجات بأسعار عادلة ومواعيد دقيقة.',
    price: 'خدمة عادلة مع ضمان',
    providerName: 'م. أحمد التبريد',
    rating: 4.7,
    badge: 'صاحب حرفة/خدمة 💼',
    dateAdded: '2026-09-27',
    verified: true
  },

  // C. طلبات المواطنين العاجلة (Urgent Citizen Requests)
  {
    id: 'urg-1',
    scope: 'urgent',
    category: 'medical',
    title: 'مطلوب دواء انسولين ناقص حرِج لحالة مسنة',
    governorate: 'المنيا',
    city: 'سمالوط',
    phone: '01033445566',
    whatsapp: '201033445566',
    description: 'نبحث عن دواء إنسولين من نوع (Lantus) غير متوفر في صيدليات سمالوط لمسنة تعاني من ارتفاع السكر.',
    price: 'شراء فور بسعره الرسمي',
    providerName: 'المواطن محمود فتحي',
    rating: 5.0,
    badge: 'طلب مواطن عاجل 📢',
    dateAdded: '2026-10-04',
    verified: false
  },
  {
    id: 'urg-2',
    scope: 'urgent',
    category: 'medical',
    title: 'البحث عن سرير رعاية مركزة عاجل لجلطة مخية',
    governorate: 'القاهرة',
    city: 'حلوان',
    phone: '01277889900',
    whatsapp: '201277889900',
    description: 'مطلوب سرير عناية مركزة متوفر بمستشفى حكومي أو خاص بسعر مناسب لحالة نجلنا الحرجة فوراً.',
    price: 'طلب عاجل جداً',
    providerName: 'عائلة الأستاذ إبراهيم',
    rating: 5.0,
    badge: 'طلب مواطن عاجل 📢',
    dateAdded: '2026-10-04',
    verified: false
  },
  {
    id: 'urg-3',
    scope: 'urgent',
    category: 'crafts',
    title: 'مطلوب نجار أمين لإصلاح باب شقة مكسور طارئ',
    governorate: 'سوهاج',
    city: 'طهطا',
    phone: '01188990011',
    whatsapp: '201188990011',
    description: 'انكسر قفل وباب الشقة الرئيسي ونحتاج نجار أخشاب للحضور فوراً لإصلاحه وتأمين الشقة.',
    price: 'يدفع المصنعية فوراً',
    providerName: 'أم عبد الرحمن',
    rating: 4.8,
    badge: 'طلب مواطن عاجل 📢',
    dateAdded: '2026-10-03',
    verified: false
  }
];

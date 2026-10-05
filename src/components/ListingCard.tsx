import React, { useState, useEffect } from 'react';
import { CommunityListing } from '../data/seedListings';
import { Phone, MessageCircle, Share2, Copy, Check, MapPin, BadgeCheck, Star, Bookmark } from 'lucide-react';

interface ListingCardProps {
  listing: CommunityListing;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ 
  listing, 
  isBookmarked = false,
  onToggleBookmark 
}) => {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  useEffect(() => {
    setBookmarked(isBookmarked);
  }, [isBookmarked]);

  const handleBookmarkClick = () => {
    const next = !bookmarked;
    setBookmarked(next);
    if (onToggleBookmark) {
      onToggleBookmark(listing.id);
    }
  };

  // Pre-fill WhatsApp message text
  const whatsappMessage = encodeURIComponent(
    `السلام عليكم ورحمة الله وبركاته، تواصلت معك بخصوص الإعلان المذكور على منصة (من الناس للناس):\n\n` +
    `*${listing.title}*\n` +
    `📍 الموقع: ${listing.governorate} - ${listing.city}\n\n` +
    `أرجو توضيح التفاصيل المتاحة، وجزاكم الله خيراً.`
  );

  const handleShareOrCopy = async () => {
    const shareData = {
      title: `${listing.title} | من الناس للناس`,
      text: `🌱 *من منصة من الناس للناس - ${listing.badge}*\n` +
        `عنوان الإعلان: ${listing.title}\n` +
        `📍 الموقع: ${listing.governorate} - ${listing.city}\n` +
        `👤 المقدم: ${listing.providerName}\n` +
        `💰 المقابل: ${listing.price}\n` +
        `📞 للتواصل: ${listing.phone}\n` +
        `📝 التفاصيل: ${listing.description}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    navigator.clipboard.writeText(shareData.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Scope specific styling configurations
  const getBadgeStyle = () => {
    switch (listing.scope) {
      case 'aid':
        return 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-700/60';
      case 'craftsman':
        return 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-300/80 dark:border-amber-700/60';
      case 'urgent':
        return 'bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 border-rose-300/80 dark:border-rose-700/60';
    }
  };

  return (
    <div className="bg-[#ffffff] dark:bg-[#111714] rounded-2xl border border-[#e4e0d2] dark:border-[#1f2823] p-5 shadow-sm hover:shadow-md hover:border-emerald-800/60 dark:hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 relative group">
      
      {/* Top Header Row */}
      <div className="space-y-2">
        <div className="flex justify-between items-start gap-2">
          
          {/* Badge */}
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${getBadgeStyle()}`}>
            {listing.badge}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Governorate and City location pill */}
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-500 dark:text-slate-400 bg-stone-100 dark:bg-slate-800 px-2.5 py-1 rounded-full shrink-0">
              <MapPin className="w-3 h-3 text-emerald-700 dark:text-emerald-400" />
              <span>{listing.governorate} · {listing.city}</span>
            </span>

            {/* Bookmark button */}
            <button
              onClick={handleBookmarkClick}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                bookmarked
                  ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/60'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-slate-200 bg-stone-100 dark:bg-slate-800'
              }`}
              title={bookmarked ? 'إزالة من المحفوظات' : 'حفظ في المفضلة'}
              aria-label="حفظ في المفضلة"
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

        </div>

        {/* Title */}
        <h3 className="text-base md:text-lg font-bold text-stone-900 dark:text-white leading-snug font-tajawal">
          {listing.title}
        </h3>

        {/* Provider Name & Rating */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-slate-400 pt-0.5">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-stone-800 dark:text-slate-200">{listing.providerName}</span>
            {listing.verified && (
              <span title="موثق في الدليل الأهلي" className="inline-flex items-center">
                <BadgeCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              </span>
            )}
          </div>

          {listing.rating && (
            <div className="flex items-center gap-1 font-mono font-bold text-amber-600 dark:text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{listing.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-[#2b352e] dark:text-[#d0d7d3] leading-relaxed font-sans bg-[#faf9f5] dark:bg-[#151d19]/60 p-3 rounded-xl border border-[#ece9dd] dark:border-[#212924]">
        {listing.description}
      </p>

      {/* Price / Terms Indicator */}
      <div className="flex justify-between items-center border-t border-[#ece9dd] dark:border-[#212924] pt-3 text-xs">
        <span className="text-[#7c786a] dark:text-[#7f8f84] font-semibold text-[11px]">مقابل الخدمة:</span>
        <span className={`font-bold font-sans ${
          listing.scope === 'aid' 
            ? 'text-emerald-800 dark:text-emerald-400 font-serif-islamic text-sm' 
            : listing.scope === 'urgent'
            ? 'text-rose-700 dark:text-rose-400'
            : 'text-[#1a231f] dark:text-white font-mono'
        }`}>
          {listing.price}
        </span>
      </div>

      {/* Action Buttons Row (Direct 0-Commission Contact) */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        
        {/* Phone Call Button */}
        <a
          href={`tel:${listing.phone}`}
          className="flex items-center justify-center gap-1 py-2 px-2.5 bg-[#104f3f] hover:bg-[#0c3c30] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
          title="اتصال هاتفي مباشر"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>اتصال</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${listing.whatsapp}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 py-2 px-2.5 bg-[#104f3f]/10 dark:bg-[#104f3f]/30 border border-[#104f3f]/30 text-[#104f3f] dark:text-[#a0e4d2] hover:bg-[#104f3f]/20 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
          title="مراسلة فورية عبر واتساب"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#104f3f] dark:text-emerald-400" />
          <span>واتساب</span>
        </a>

        {/* Share/Copy Details Button */}
        <button
          onClick={handleShareOrCopy}
          className="flex items-center justify-center gap-1 py-2 px-2.5 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
          title="مشاركة تفاصيل الإعلان"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copied ? 'تم النسخ' : 'مشاركة'}</span>
        </button>

      </div>

    </div>
  );
};

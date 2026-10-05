import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 z-50 flex items-center justify-between gap-2 rounded-xl bg-amber-600/95 text-white px-4 py-2.5 text-xs font-semibold shadow-xl border border-amber-500/50 backdrop-blur">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 text-amber-100 shrink-0 animate-pulse" />
        <span>وضع عدم الاتصال — يتم استخدام البيانات المحفوظة محلياً.</span>
      </div>
      <span className="text-[10px] bg-amber-800/80 px-2 py-0.5 rounded-md shrink-0">بدون إنترنت</span>
    </div>
  );
};

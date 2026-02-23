import { Coffee, X } from 'lucide-react';
import { useState } from 'react';

export function DonationBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [hiding, setHiding] = useState(false);

  if (window.electronAPI !== undefined || dismissed) return null;

  const handleDismiss = () => {
    setHiding(true);
    setTimeout(() => setDismissed(true), 300);
  };

  return (
    <div
      className="flex items-center justify-between gap-3 px-4 text-sm text-white shrink-0 overflow-hidden transition-all duration-300 ease-in-out"
      style={{
        backgroundColor: '#13c269',
        maxHeight: hiding ? '0' : '48px',
        paddingTop: hiding ? '0' : '',
        paddingBottom: hiding ? '0' : '',
        opacity: hiding ? 0 : 1,
      }}
    >
      <div className="flex items-center gap-2 min-w-0 py-1.5">
        <Coffee className="w-4 h-4 shrink-0" />
        <span className="truncate">
          Proxxied is free and open source — We want to keep it ad free and easy to use. If it saves you money on proxies, consider supporting development!
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0 py-1.5">
        <a
          href="https://buymeacoffee.com/kaiserclipston"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded px-3 py-0.5 text-xs font-semibold text-white transition-colors whitespace-nowrap"
          style={{ backgroundColor: '#136cc2' }}
        >
          Offer Support
        </a>
        <button
          onClick={handleDismiss}
          className="p-0.5 rounded hover:bg-white/20 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

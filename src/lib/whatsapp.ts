import { siteConfig } from '@/data/siteConfig';

export function getWhatsAppUrl(customMessage?: string): string {
  const cleanNumber = siteConfig.whatsappRaw;
  const message = customMessage || siteConfig.defaultWhatsAppMessage;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(customMessage?: string, newTab: boolean = true) {
  const url = getWhatsAppUrl(customMessage);
  if (typeof window !== 'undefined') {
    if (newTab) {
      // Direct navigation that works across mobile apps and desktop browsers
      const win = window.open(url, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = url;
      }
    } else {
      window.location.href = url;
    }
  }
}

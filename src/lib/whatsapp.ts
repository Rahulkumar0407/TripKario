import { siteConfig } from '@/data/site';

export function getWhatsAppUrl(customMessage?: string): string {
  const cleanNumber = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const message = customMessage || `Hi ${siteConfig.name}, I am exploring trips on your website and would like to plan a journey!`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(customMessage?: string) {
  const url = getWhatsAppUrl(customMessage);
  window.open(url, '_blank', 'noopener,noreferrer');
}

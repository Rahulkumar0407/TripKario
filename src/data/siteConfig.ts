/**
 * TripKario — Central Canonical Brand & Contact Configuration
 * Single source of truth for business contact details, social links, and brand identity.
 */

export const siteConfig = {
  brandName: 'TripKario',
  guideName: 'TripKaro Guide',
  legalName: 'TripKario Holidays',
  tagline: 'Trips across India, planned around you.',
  address: 'D-115 UGF KH NO-863 CHHATTRPUR EXTN NEW DELHI 110074',
  email: 'tripkario1811@gmail.com',
  phone: '+91 99580 34778',
  phoneRaw: '+919958034778',
  phoneDisplay: '+91 99580 34778',
  whatsappNumber: '+919958034778',
  whatsappRaw: '919958034778',
  whatsappDisplay: '+91 99580 34778',
  instagram: 'https://www.instagram.com/tripkario_com/',
  instagramHandle: '@tripkario_com',
  website: 'https://tripkario.com',
  defaultWhatsAppMessage: 'Hi TripKario, I want help planning a trip.',
} as const;

export function getWhatsAppLink(customMessage?: string) {
  const message = customMessage || siteConfig.defaultWhatsAppMessage;
  return `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(message)}`;
}

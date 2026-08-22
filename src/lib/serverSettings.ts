import { supabaseServer } from '@/lib/supabase/server';

export interface SiteSettings {
  id?: string;
  companyName?: string;
  phone?: string;
  email?: string;
  whatsappNumber?: string;
  address?: string;
  description?: string;
  signatureEnabled: boolean;
  signatureName: string;
  signaturePrefix: string;
  updatedAt?: string;
}

export const defaultSiteSettings: SiteSettings = {
  companyName: 'TripKario',
  phone: '+91 98765 43210',
  email: 'hello@tripkario.com',
  whatsappNumber: '+919876543210',
  address: 'New Delhi, India',
  description: 'Curated unhurried journeys across India. Confirmed hotels, private cars, zero rush.',
  signatureEnabled: true,
  signatureName: 'Yashi',
  signaturePrefix: 'with love,',
};

// In-memory fallback for local development or disconnected mode
let cachedSettings: SiteSettings = { ...defaultSiteSettings };

export async function getCanonicalSiteSettings(): Promise<SiteSettings> {
  if (!supabaseServer) {
    return cachedSettings;
  }

  try {
    const { data, error } = await supabaseServer
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn('Could not query site_settings from Supabase:', error.message);
      return cachedSettings;
    }

    if (data) {
      const merged: SiteSettings = {
        id: data.id,
        companyName: data.company_name ?? defaultSiteSettings.companyName,
        phone: data.phone ?? defaultSiteSettings.phone,
        email: data.email ?? defaultSiteSettings.email,
        whatsappNumber: data.whatsapp_number ?? defaultSiteSettings.whatsappNumber,
        address: data.address ?? defaultSiteSettings.address,
        description: data.description ?? defaultSiteSettings.description,
        signatureEnabled: data.signature_enabled !== undefined && data.signature_enabled !== null
          ? Boolean(data.signature_enabled)
          : defaultSiteSettings.signatureEnabled,
        signatureName: data.signature_name || defaultSiteSettings.signatureName,
        signaturePrefix: data.signature_prefix || defaultSiteSettings.signaturePrefix,
        updatedAt: data.updated_at,
      };
      cachedSettings = merged;
      return merged;
    }
  } catch (err) {
    console.warn('Failed in getCanonicalSiteSettings:', err);
  }

  return cachedSettings;
}

export async function saveCanonicalSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getCanonicalSiteSettings();
  const updated: SiteSettings = {
    ...current,
    ...settings,
    updatedAt: new Date().toISOString(),
  };

  cachedSettings = updated;

  if (!supabaseServer) {
    return updated;
  }

  try {
    // Map camelCase to snake_case for PostgreSQL
    const dbPayload: Record<string, any> = {
      updated_at: updated.updatedAt,
    };

    if (settings.companyName !== undefined) dbPayload.company_name = settings.companyName;
    if (settings.phone !== undefined) dbPayload.phone = settings.phone;
    if (settings.email !== undefined) dbPayload.email = settings.email;
    if (settings.whatsappNumber !== undefined) dbPayload.whatsapp_number = settings.whatsappNumber;
    if (settings.address !== undefined) dbPayload.address = settings.address;
    if (settings.description !== undefined) dbPayload.description = settings.description;
    if (settings.signatureEnabled !== undefined) dbPayload.signature_enabled = settings.signatureEnabled;
    if (settings.signatureName !== undefined) dbPayload.signature_name = settings.signatureName;
    if (settings.signaturePrefix !== undefined) dbPayload.signature_prefix = settings.signaturePrefix;

    if (current.id) {
      const { data, error } = await supabaseServer
        .from('site_settings')
        .update(dbPayload)
        .eq('id', current.id)
        .select()
        .maybeSingle();

      if (!error && data) {
        return {
          ...updated,
          id: data.id,
        };
      }
    } else {
      const { data, error } = await supabaseServer
        .from('site_settings')
        .insert([dbPayload])
        .select()
        .maybeSingle();

      if (!error && data) {
        return {
          ...updated,
          id: data.id,
        };
      }
    }
  } catch (err) {
    console.warn('Failed in saveCanonicalSiteSettings on Supabase:', err);
  }

  return updated;
}

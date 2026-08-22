import { supabaseServer } from '@/lib/supabase/server';

export interface CanonicalTeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string | null;
  phone?: string;
  email?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://mock-tripkario.supabase.co'
  );
};

/**
 * Authoritative read of team members from Supabase PostgreSQL
 */
export async function getAllCanonicalTeamMembers(onlyActive: boolean = false): Promise<CanonicalTeamMember[]> {
  if (isSupabaseConfigured()) {
    try {
      let query = supabaseServer.from('team_members').select('*').order('display_order', { ascending: true });
      if (onlyActive) {
        query = query.eq('is_active', true);
      }
      const { data, error } = await query;
      if (error) {
        console.error('[serverTeam] Supabase team query error:', error.message);
        return [];
      }
      if (data && Array.isArray(data)) {
        return data.map((row: any, idx: number) => ({
          id: row.id,
          name: row.name,
          role: row.role,
          bio: row.bio || '',
          photoUrl: row.photo_url || null,
          phone: row.phone || '',
          email: row.email || '',
          displayOrder: typeof row.display_order === 'number' ? row.display_order : idx + 1,
          isActive: row.is_active ?? true,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }));
      }
    } catch (dbErr: any) {
      console.error('[serverTeam] Supabase team query exception:', dbErr.message);
      return [];
    }
  }

  return [];
}

/**
 * Authoritative save/update of a team member to Supabase PostgreSQL
 */
export async function saveCanonicalTeamMember(member: Partial<CanonicalTeamMember> & { name: string; role: string }): Promise<CanonicalTeamMember> {
  const id = member.id || crypto.randomUUID();

  const formatted: CanonicalTeamMember = {
    id,
    name: member.name.trim(),
    role: member.role.trim(),
    bio: member.bio ? member.bio.trim() : '',
    photoUrl: member.photoUrl ? member.photoUrl.trim() : null,
    phone: member.phone ? member.phone.trim() : '',
    email: member.email ? member.email.trim() : '',
    displayOrder: typeof member.displayOrder === 'number' ? member.displayOrder : 1,
    isActive: member.isActive ?? true,
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    const payload: any = {
      name: formatted.name,
      role: formatted.role,
      bio: formatted.bio,
      photo_url: formatted.photoUrl,
      phone: formatted.phone || null,
      email: formatted.email || null,
      display_order: formatted.displayOrder,
      is_active: formatted.isActive,
      updated_at: formatted.updatedAt,
    };
    if (isUUID) {
      payload.id = id;
    }

    const { data, error } = await supabaseServer
      .from('team_members')
      .upsert(payload, { onConflict: isUUID ? 'id' : undefined })
      .select('*')
      .single();

    if (error) {
      console.error('[serverTeam] Supabase upsert error:', error.message);
      throw new Error(`Database error: ${error.message}`);
    }

    if (data) {
      formatted.id = data.id;
      formatted.createdAt = data.created_at;
    }
  }

  return formatted;
}

/**
 * Authoritative delete of a team member from Supabase PostgreSQL
 */
export async function deleteCanonicalTeamMember(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const { error } = await supabaseServer.from('team_members').delete().eq('id', id);
    if (error) {
      console.error('[serverTeam] Supabase delete error:', error.message);
      throw new Error(`Database error: ${error.message}`);
    }
  }

  return true;
}

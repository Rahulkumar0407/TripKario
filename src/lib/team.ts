export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string | null;
  phone?: string;
  email?: string;
  displayOrder?: number;
  isActive?: boolean;
}

/**
 * Loads current canonical active team members from localStorage cache if available in browser,
 * otherwise returns an empty array (NO FAKE / MOCK DATA).
 */
export function loadClientTeamMembers(): TeamMember[] {
  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem('tripkario_admin_team');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) {
          return parsed
            .filter((m: any) => m && m.name && m.isActive !== false)
            .map((m: any, idx: number) => ({
              id: m.id || `tm_${idx}`,
              name: m.name.trim(),
              role: m.role ? m.role.trim() : 'Trip Specialist',
              bio: m.bio ? m.bio.trim() : '',
              photoUrl: m.photoUrl ? m.photoUrl.trim() : null,
              phone: m.phone || '',
              email: m.email || '',
              displayOrder: typeof m.displayOrder === 'number' ? m.displayOrder : idx + 1,
              isActive: m.isActive ?? true,
            }))
            .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        }
      }
    } catch (e) {
      console.warn('Could not read admin team from localStorage:', e);
    }
  }
  return [];
}

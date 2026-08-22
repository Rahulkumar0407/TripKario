import { teamMembers as defaultTeamMembers, TeamMember } from '@/data/team';

export type { TeamMember };

/**
 * Loads current canonical active team members from localStorage if available in browser,
 * otherwise falls back to default empty team array.
 * Deterministically sorted by displayOrder.
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
  return defaultTeamMembers;
}

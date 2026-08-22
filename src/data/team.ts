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
 * Canonical baseline team members.
 * Purely data-driven: Starts empty until team members are added via the Admin Console.
 */
export const teamMembers: TeamMember[] = [];

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  getAllCanonicalTeamMembers,
  saveCanonicalTeamMember,
  deleteCanonicalTeamMember,
} from '@/lib/serverTeam';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get('active') === 'true';
    const members = await getAllCanonicalTeamMembers(activeOnly);
    return NextResponse.json({ success: true, count: members.length, team: members });
  } catch (err: any) {
    console.error('Failed to get team members:', err);
    return NextResponse.json({ error: 'Failed to retrieve team members' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { member, members } = body;

    if (Array.isArray(members)) {
      const savedList = [];
      for (const m of members) {
        if (m && m.name && m.role) {
          const saved = await saveCanonicalTeamMember(m);
          savedList.push(saved);
        }
      }
      try {
        revalidatePath('/team');
        revalidatePath('/adminconsole1811/team');
        revalidatePath('/');
      } catch (revalErr) {
        console.warn('Revalidation notice:', revalErr);
      }
      return NextResponse.json({ success: true, message: 'Team members saved successfully.', team: savedList });
    }

    const payload = member || body;
    if (!payload || !payload.name?.trim() || !payload.role?.trim()) {
      return NextResponse.json({ error: 'Name and Designation are required fields.' }, { status: 400 });
    }

    const saved = await saveCanonicalTeamMember(payload);

    try {
      revalidatePath('/team');
      revalidatePath('/adminconsole1811/team');
      revalidatePath('/');
    } catch (revalErr) {
      console.warn('Revalidation notice:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Team member saved successfully.',
      member: saved,
    });
  } catch (err: any) {
    console.error('Failed to save team member:', err);
    return NextResponse.json({ error: 'Failed to persist team member updates' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing team member id for deletion' }, { status: 400 });
    }

    await deleteCanonicalTeamMember(id);

    try {
      revalidatePath('/team');
      revalidatePath('/adminconsole1811/team');
      revalidatePath('/');
    } catch (revalErr) {
      console.warn('Revalidation notice:', revalErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully.',
      id,
    });
  } catch (err: any) {
    console.error('Failed to delete team member:', err);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}

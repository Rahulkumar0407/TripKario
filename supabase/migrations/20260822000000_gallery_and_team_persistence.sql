-- ==============================================================================
-- TRIPKARIO PRODUCTION DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- Migration: 20260822000000_gallery_and_team_persistence.sql
-- Description: Persistent Gallery Images and Team Members tables with RLS
-- ==============================================================================

-- 1. GALLERY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    location TEXT NOT NULL,
    caption TEXT,
    trip_id TEXT,
    trip_name TEXT,
    imagekit_file_id TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'update_gallery_images_updated_at'
    ) THEN
        CREATE TRIGGER update_gallery_images_updated_at 
        BEFORE UPDATE ON public.gallery_images 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- 2. TEAM MEMBERS TABLE (Ensure columns exist & photo_url is nullable)
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    photo_url TEXT,
    bio TEXT,
    phone TEXT,
    email TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure nullable photo_url and contact columns on pre-existing tables
DO $$
BEGIN
    ALTER TABLE public.team_members ALTER COLUMN photo_url DROP NOT NULL;
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

ALTER TABLE public.team_members ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.team_members ADD COLUMN IF NOT EXISTS email TEXT;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'update_team_members_updated_at'
    ) THEN
        CREATE TRIGGER update_team_members_updated_at 
        BEFORE UPDATE ON public.team_members 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- 3. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Clean existing policies if re-running migration
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public can view gallery images" ON public.gallery_images;
    DROP POLICY IF EXISTS "Public can view active team members" ON public.team_members;
    DROP POLICY IF EXISTS "Admin full access on gallery_images" ON public.gallery_images;
    DROP POLICY IF EXISTS "Admin full access on team_members" ON public.team_members;
END $$;

-- Public READ policies
CREATE POLICY "Public can view gallery images" 
ON public.gallery_images FOR SELECT 
USING (true);

CREATE POLICY "Public can view active team members" 
ON public.team_members FOR SELECT 
USING (is_active = true);

-- Authenticated Admin FULL ACCESS policies
CREATE POLICY "Admin full access on gallery_images" 
ON public.gallery_images FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Admin full access on team_members" 
ON public.team_members FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

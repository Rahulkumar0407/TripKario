-- ==============================================================================
-- TRIPKARIO PRODUCTION DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- Migration: 20260821000000_init_admin_schema.sql
-- Description: Complete schema for TripKario Business Admin System & Public Web
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. HELPER FUNCTION: auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ==============================================================================
-- 3. MEDIA & ASSET STORAGE TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    imagekit_file_id TEXT,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    alt_text TEXT,
    category TEXT NOT NULL DEFAULT 'Other', -- 'Hero', 'Destination', 'Trip', 'Itinerary', 'Past Trip', 'Team', 'Testimonial', 'Story', 'Other'
    photographer TEXT,
    source TEXT,
    license TEXT DEFAULT 'Commercial / Licensed',
    width INTEGER,
    height INTEGER,
    size_bytes BIGINT,
    mime_type TEXT,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON public.media FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 4. SITE SETTINGS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL DEFAULT 'TripKario',
    phone TEXT DEFAULT '+91 98765 43210',
    email TEXT DEFAULT 'hello@tripkario.com',
    whatsapp_number TEXT DEFAULT '+919876543210',
    address TEXT DEFAULT 'New Delhi, India',
    description TEXT DEFAULT 'Curated unhurried journeys across India. Confirmed hotels, private cars, zero rush.',
    instagram_url TEXT DEFAULT 'https://instagram.com/tripkario',
    facebook_url TEXT DEFAULT 'https://facebook.com/tripkario',
    youtube_url TEXT DEFAULT 'https://youtube.com/tripkario',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/company/tripkario',
    logo_url TEXT,
    favicon_url TEXT,
    footer_copyright TEXT DEFAULT '© 2026 TripKario. All rights reserved.',
    signature_enabled BOOLEAN DEFAULT TRUE,
    signature_name TEXT DEFAULT 'Yashi',
    signature_prefix TEXT DEFAULT 'with love,',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 5. HOMEPAGE SECTIONS CONFIGURATION
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key TEXT UNIQUE NOT NULL, -- 'hero', 'featured_trips', 'destinations', 'travel_styles', 'field_notes', 'testimonials', 'team', 'custom_trip', 'final_cta'
    title TEXT NOT NULL,
    subtitle TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    settings JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 6. HERO SLIDES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    destination TEXT NOT NULL,
    tagline TEXT NOT NULL,
    short_vibe TEXT,
    route TEXT,
    duration TEXT,
    starting_price TEXT,
    image_url TEXT NOT NULL,
    media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    cta_text TEXT DEFAULT 'Explore Destination',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_hero_slides_updated_at BEFORE UPDATE ON public.hero_slides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 7. DESTINATIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    region TEXT NOT NULL, -- 'North India', 'South India', 'North East', 'West India', etc.
    short_description TEXT,
    full_description TEXT,
    cover_image_url TEXT NOT NULL,
    media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    starting_price INTEGER,
    highlights TEXT[] DEFAULT '{}',
    best_time_to_visit TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON public.destinations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 8. TRIPS (PACKAGES) TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
    destination_name TEXT NOT NULL,
    duration_days INTEGER NOT NULL DEFAULT 5,
    duration_nights INTEGER NOT NULL DEFAULT 4,
    duration_text TEXT NOT NULL, -- '4 Nights · 5 Days'
    price_per_person INTEGER NOT NULL,
    price_formatted TEXT NOT NULL, -- '₹24,999'
    cover_image_url TEXT NOT NULL,
    media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    overview TEXT,
    highlights TEXT[] DEFAULT '{}',
    inclusions TEXT[] DEFAULT '{}',
    exclusions TEXT[] DEFAULT '{}',
    hotels_info TEXT,
    transport_info TEXT,
    meals_info TEXT,
    status TEXT DEFAULT 'published', -- 'draft', 'published', 'archived'
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON public.trips FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 9. ITINERARY DAYS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.itinerary_days (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    location TEXT,
    description TEXT NOT NULL,
    cover_image_url TEXT,
    media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    activities TEXT[] DEFAULT '{}',
    meals_included TEXT,
    stay_details TEXT,
    travel_time TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_itinerary_days_updated_at BEFORE UPDATE ON public.itinerary_days FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 10. TESTIMONIALS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    location TEXT,
    quote TEXT NOT NULL,
    trip_name TEXT,
    trip_destination TEXT,
    rating NUMERIC(2,1) DEFAULT 5.0,
    review_date TEXT,
    avatar_url TEXT,
    photo_url TEXT,
    original_screenshot_url TEXT,
    source TEXT DEFAULT 'Google', -- 'Google', 'Direct', 'WhatsApp', 'Instagram'
    is_real BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 11. TEAM MEMBERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    bio TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 12. ENQUIRIES (LEADS) TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    destination TEXT,
    trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
    travel_dates TEXT,
    traveller_count TEXT,
    budget_range TEXT,
    message TEXT,
    source TEXT DEFAULT 'Website Modal', -- 'Website Modal', 'Hero Search', 'Chatbot', 'WhatsApp'
    status TEXT DEFAULT 'New', -- 'New', 'Contacted', 'Planning', 'Quoted', 'Booked', 'Lost'
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 13. CHATBOT NODES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.chatbot_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    step_key TEXT UNIQUE NOT NULL,
    question TEXT NOT NULL,
    options JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{ label: "Honeymoon", next_step: "kashmir_options" }]
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 14. WHATSAPP SETTINGS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.whatsapp_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_number TEXT NOT NULL DEFAULT '+919876543210',
    default_message TEXT NOT NULL DEFAULT 'Hi TripKario, I would like help planning a trip.',
    button_label TEXT DEFAULT 'Chat with Human Concierge',
    chatbot_handoff_message TEXT DEFAULT 'Hi TripKario, I just completed the trip planner on your website and want to finalize my itinerary.',
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 15. ACTIVITY LOGS (ADMIN AUDIT TRAIL)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email TEXT NOT NULL,
    action_type TEXT NOT NULL, -- 'create', 'update', 'delete', 'publish', 'login'
    entity_type TEXT NOT NULL, -- 'trip', 'destination', 'media', 'settings', 'testimonial', 'enquiry'
    entity_name TEXT,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 16. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (for public marketing site)
CREATE POLICY "Public can view active media" ON public.media FOR SELECT USING (true);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view active homepage sections" ON public.homepage_sections FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active hero slides" ON public.hero_slides FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active destinations" ON public.destinations FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view published trips" ON public.trips FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view itinerary days" ON public.itinerary_days FOR SELECT USING (true);
CREATE POLICY "Public can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active team members" ON public.team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public can submit enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view active chatbot nodes" ON public.chatbot_nodes FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view whatsapp settings" ON public.whatsapp_settings FOR SELECT USING (is_active = true);

-- AUTHENTICATED ADMIN FULL ACCESS POLICIES
CREATE POLICY "Admin full access on media" ON public.media FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on homepage_sections" ON public.homepage_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on hero_slides" ON public.hero_slides FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on destinations" ON public.destinations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on trips" ON public.trips FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on itinerary_days" ON public.itinerary_days FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on team_members" ON public.team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on enquiries" ON public.enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on chatbot_nodes" ON public.chatbot_nodes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on whatsapp_settings" ON public.whatsapp_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on activity_logs" ON public.activity_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);

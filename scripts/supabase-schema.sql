-- ============================================================
-- Article Space: Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- profiles (replaces both 'users' and 'profile' json-server collections)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar TEXT,
  roles TEXT[] NOT NULL DEFAULT ARRAY['USER'],
  features JSONB NOT NULL DEFAULT '{}',
  json_settings JSONB NOT NULL DEFAULT '{}',
  first_name TEXT,
  last_name TEXT,
  age INTEGER,
  currency TEXT,
  country TEXT,
  city TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- articles
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  img TEXT,
  type TEXT[] NOT NULL DEFAULT ARRAY['IT'],
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  content TEXT,
  fts TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(subtitle, '') || ' ' || coalesce(content, ''))
  ) STORED
);
CREATE INDEX idx_articles_fts ON public.articles USING GIN (fts);
CREATE INDEX idx_articles_user_id ON public.articles(user_id);
CREATE INDEX idx_articles_created_at ON public.articles(created_at DESC);
CREATE INDEX idx_articles_type ON public.articles USING GIN (type);

-- comments
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_comments_article_id ON public.comments(article_id);

-- article_ratings
CREATE TABLE public.article_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rate INTEGER NOT NULL CHECK (rate >= 1 AND rate <= 5),
  feedback TEXT,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);
CREATE INDEX idx_article_ratings_article ON public.article_ratings(article_id);

-- profile_ratings
CREATE TABLE public.profile_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rate INTEGER NOT NULL CHECK (rate >= 1 AND rate <= 5),
  feedback TEXT,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_profile_ratings_profile ON public.profile_ratings(profile_id);

-- notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  href TEXT,
  unread BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);

-- ============================================================
-- RLS Policies
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, self-update
CREATE POLICY "Profiles readable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Articles: public read, auth insert, owner/admin update & delete
CREATE POLICY "Articles readable by everyone" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Auth users create articles" ON public.articles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owner/admin update articles" ON public.articles FOR UPDATE USING (
  auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND 'ADMIN' = ANY(roles))
);
CREATE POLICY "Owner/admin delete articles" ON public.articles FOR DELETE USING (
  auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND 'ADMIN' = ANY(roles))
);

-- Comments: public read, auth insert, owner delete
CREATE POLICY "Comments readable by everyone" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Auth users create comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own comments" ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- Article ratings: public read, self insert/update
CREATE POLICY "Ratings readable by everyone" ON public.article_ratings FOR SELECT USING (true);
CREATE POLICY "Users insert own ratings" ON public.article_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own ratings" ON public.article_ratings FOR UPDATE USING (auth.uid() = user_id);

-- Profile ratings: public read, self insert
CREATE POLICY "Profile ratings readable" ON public.profile_ratings FOR SELECT USING (true);
CREATE POLICY "Users insert own profile ratings" ON public.profile_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Notifications: user sees own only, can update own (mark read)
CREATE POLICY "Users view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- Auto-create profile on signup (trigger)
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, split_part(new.email, '@', 1));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

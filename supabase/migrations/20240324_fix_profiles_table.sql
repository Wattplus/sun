-- Supprime d'abord la table si elle existe
DROP TABLE IF EXISTS public.profiles;

-- Crée la table avec toutes les colonnes nécessaires
CREATE TABLE public.profiles (
    id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email text UNIQUE NOT NULL,
    first_name text,
    last_name text,
    phone text,
    postal_code text,
    client_type text,
    monthly_bill text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Active RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Supprime les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Crée les nouvelles politiques
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Donne les permissions nécessaires
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- Vérifie que la table a été créée correctement
SELECT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'client_type'
);
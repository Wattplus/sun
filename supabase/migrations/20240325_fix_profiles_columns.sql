-- Vérifie si la colonne client_type existe, sinon l'ajoute
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 
                   FROM information_schema.columns 
                   WHERE table_name='profiles' 
                   AND column_name='client_type') THEN
        ALTER TABLE profiles ADD COLUMN client_type text;
    END IF;
END $$;

-- Vérifie si la colonne monthly_bill existe, sinon l'ajoute
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 
                   FROM information_schema.columns 
                   WHERE table_name='profiles' 
                   AND column_name='monthly_bill') THEN
        ALTER TABLE profiles ADD COLUMN monthly_bill text;
    END IF;
END $$;

-- Met à jour les politiques RLS
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

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

-- Vérifie que les colonnes ont été créées
SELECT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'client_type'
);

SELECT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'monthly_bill'
);
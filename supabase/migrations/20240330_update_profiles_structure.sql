-- Drop existing table
DROP TABLE IF EXISTS public.profiles;

-- Recreate profiles table with correct structure
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

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone."
    ON profiles FOR SELECT
    USING ( true );

CREATE POLICY "Users can insert their own profile."
    ON profiles FOR INSERT
    WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
    ON profiles FOR UPDATE
    USING ( auth.uid() = id );

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS profiles_client_type_idx ON public.profiles(client_type);

-- Add helpful comments
COMMENT ON TABLE public.profiles IS 'User profiles for the solar panel installation platform';
COMMENT ON COLUMN public.profiles.client_type IS 'Type of client (particulier/professionnel)';
COMMENT ON COLUMN public.profiles.monthly_bill IS 'Monthly electricity bill amount';
create table public.profiles (
    id uuid references auth.users on delete cascade,
    email text unique,
    first_name text,
    last_name text,
    phone text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    primary key (id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id);
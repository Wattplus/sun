create table public.leads (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    firstName text,
    lastName text,
    email text,
    phone text,
    postalCode text,
    monthlyBill text,
    clientType text,
    status text default 'new'
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable inserts for all users"
ON public.leads
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable update for authenticated users"
ON public.leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
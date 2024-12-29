-- Drop and recreate the leads table with the correct structure
DROP TABLE IF EXISTS public.leads;

CREATE TABLE public.leads (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    clienttype TEXT NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    monthlybill TEXT NOT NULL,
    postalcode TEXT NOT NULL,
    status TEXT DEFAULT 'new'::text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users"
ON public.leads FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert for all users"
ON public.leads FOR INSERT TO public WITH CHECK (true);
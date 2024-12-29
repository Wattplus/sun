-- Drop and recreate the leads table with the correct structure
DROP TABLE IF EXISTS public.leads;

CREATE TABLE public.leads (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    client_type TEXT NOT NULL,
    monthly_bill TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    status TEXT DEFAULT 'new'::text NOT NULL,
    notes TEXT,
    project_type TEXT,
    budget TEXT,
    address TEXT,
    city TEXT,
    electrical_type TEXT,
    roof_type TEXT,
    roof_orientation TEXT,
    assigned_to TEXT,
    purchased_by TEXT[]
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for authenticated users"
ON public.leads FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert for all users"
ON public.leads FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
ON public.leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads(email);
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads(status);
CREATE INDEX IF NOT EXISTS leads_postal_code_idx ON public.leads(postal_code);

-- Add comments for documentation
COMMENT ON TABLE public.leads IS 'Stores information about sales leads';
COMMENT ON COLUMN public.leads.client_type IS 'Type of client (particulier/professionnel)';
COMMENT ON COLUMN public.leads.monthly_bill IS 'Monthly electricity bill amount';
COMMENT ON COLUMN public.leads.status IS 'Current status of the lead';
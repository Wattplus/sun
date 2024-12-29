-- Add client_type column if it doesn't exist
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS client_type text;

-- Rename existing clientType to client_type if it exists
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'leads' AND column_name = 'clienttype') 
    THEN
        ALTER TABLE public.leads RENAME COLUMN clienttype TO client_type;
    END IF;
END $$;
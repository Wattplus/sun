-- Add client_type column to leads table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 
                   FROM information_schema.columns 
                   WHERE table_name='leads' 
                   AND column_name='client_type') THEN
        ALTER TABLE leads ADD COLUMN client_type text;
    END IF;
END $$;

-- Rename clientType to client_type if it exists
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 
               FROM information_schema.columns 
               WHERE table_name='leads' 
               AND column_name='clienttype') THEN
        ALTER TABLE leads RENAME COLUMN clienttype TO client_type;
    END IF;
END $$;
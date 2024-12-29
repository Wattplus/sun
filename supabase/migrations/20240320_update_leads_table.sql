-- Ensure all required columns exist
DO $$ 
BEGIN 
    -- Add columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'client_type') THEN
        ALTER TABLE leads ADD COLUMN client_type text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'monthly_bill') THEN
        ALTER TABLE leads ADD COLUMN monthly_bill text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'first_name') THEN
        ALTER TABLE leads ADD COLUMN first_name text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'last_name') THEN
        ALTER TABLE leads ADD COLUMN last_name text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'email') THEN
        ALTER TABLE leads ADD COLUMN email text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'phone') THEN
        ALTER TABLE leads ADD COLUMN phone text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'postal_code') THEN
        ALTER TABLE leads ADD COLUMN postal_code text;
    END IF;
END $$;

-- Rename any old column names if they exist
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'clienttype') THEN
        ALTER TABLE leads RENAME COLUMN clienttype TO client_type;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'monthlybill') THEN
        ALTER TABLE leads RENAME COLUMN monthlybill TO monthly_bill;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'firstname') THEN
        ALTER TABLE leads RENAME COLUMN firstname TO first_name;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'lastname') THEN
        ALTER TABLE leads RENAME COLUMN lastname TO last_name;
    END IF;
END $$;
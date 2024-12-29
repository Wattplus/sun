-- Supprime la table leads existante
DROP TABLE IF EXISTS public.leads;

-- Recrée la table leads avec la structure correcte
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
    status TEXT DEFAULT 'new'::text NOT NULL,
    notes TEXT,
    address TEXT,
    city TEXT,
    assignedto TEXT,
    purchasedby TEXT[]
);

-- Active la sécurité niveau ligne
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Crée les politiques de sécurité
CREATE POLICY "Enable read access for authenticated users"
ON public.leads FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert for all users"
ON public.leads FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users"
ON public.leads FOR UPDATE TO authenticated USING (true);

-- Ajoute des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads(email);
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads(status);
CREATE INDEX IF NOT EXISTS leads_postalcode_idx ON public.leads(postalcode);

-- Ajoute des commentaires pour la documentation
COMMENT ON TABLE public.leads IS 'Table stockant les leads des clients';
COMMENT ON COLUMN public.leads.clienttype IS 'Type de client (particulier/professionnel)';
COMMENT ON COLUMN public.leads.monthlybill IS 'Montant de la facture mensuelle';
COMMENT ON COLUMN public.leads.status IS 'Statut actuel du lead';
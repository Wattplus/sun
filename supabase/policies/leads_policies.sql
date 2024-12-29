-- Activer RLS sur la table leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion de données
CREATE POLICY "Enable inserts for all users"
ON public.leads
FOR INSERT
TO public
WITH CHECK (true);

-- Politique pour permettre la lecture des leads
CREATE POLICY "Enable read access for authenticated users"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- Politique pour permettre la mise à jour des leads
CREATE POLICY "Enable update for authenticated users"
ON public.leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
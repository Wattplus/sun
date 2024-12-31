import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useToast } from '@/components/ui/use-toast';
import { InstallerData } from '@/types/installer';

export const useInstallerData = () => {
  const [installer, setInstaller] = useState<InstallerData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInstallerData = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session?.user) {
          throw new Error('No authenticated user');
        }

        const { data, error } = await supabase
          .from('installers')
          .select('*')
          .eq('user_id', session.session.user.id)
          .single();

        if (error) throw error;

        if (data) {
          setInstaller({
            ...data,
            certifications: data.certifications as InstallerData['certifications'],
            installation_types: data.installation_types as InstallerData['installation_types'],
            visibility_settings: data.visibility_settings as InstallerData['visibility_settings'],
          });
        }
      } catch (error) {
        console.error('Error fetching installer:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger vos informations',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInstallerData();
  }, [toast]);

  return { installer, loading };
};
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useProfileData = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast.error("Utilisateur non authentifié");
          return;
        }

        // Get profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        // Get installer data
        const { data: installer } = await supabase
          .from('installers')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profile || installer) {
          setFormData({
            firstName: profile?.first_name || installer?.contact_name?.split(' ')[0] || '',
            lastName: profile?.last_name || installer?.contact_name?.split(' ')[1] || '',
            email: profile?.email || installer?.email || user.email || '',
            phone: profile?.phone || installer?.phone || '',
            website: installer?.website || '',
            description: installer?.description || '',
          });
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
        toast.error("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  return { formData, setFormData, loading };
};
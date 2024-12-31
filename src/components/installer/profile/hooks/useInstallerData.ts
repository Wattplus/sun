import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { InstallerData, VisibilitySettings } from "../types/installer.types";

export const useInstallerData = () => {
  const [installer, setInstaller] = useState<InstallerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstallerData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          toast.error("Vous devez être connecté pour accéder à cette page");
          return;
        }

        const { data, error } = await supabase
          .from("installers")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching installer data:", error);
          toast.error("Erreur lors de la récupération des données");
          return;
        }

        if (data) {
          // Convert JSON data to strongly typed data
          const visibilitySettings: VisibilitySettings = data.visibility_settings as VisibilitySettings || {
            showPhoneNumber: true,
            highlightProfile: false,
            acceptDirectMessages: true,
            showCertifications: true
          };

          const certifications = data.certifications as { [key: string]: boolean } || {
            qualiPV: false,
            rge: false,
            qualibat: false
          };

          const installationTypes = data.installation_types as { [key: string]: boolean } || {
            residential: false,
            commercial: false,
            industrial: false
          };

          setInstaller({
            ...data,
            visibility_settings: visibilitySettings,
            certifications,
            installation_types: installationTypes
          });
        }
      } catch (error) {
        console.error("Error in fetchInstallerData:", error);
        toast.error("Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchInstallerData();
  }, []);

  return { installer, loading };
};
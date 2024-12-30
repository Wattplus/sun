import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";

export const useInstallerBalance = () => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) {
          console.log("No session found");
          return;
        }

        const { data: installer, error } = await supabase
          .from('installers')
          .select('credits')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching installer credits:", error);
          toast.error("Erreur lors de la récupération du solde");
          return;
        }

        setBalance(installer?.credits || 0);
      } catch (error) {
        console.error("Error in fetchBalance:", error);
        toast.error("Erreur lors de la récupération du solde");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return { balance, isLoading };
};
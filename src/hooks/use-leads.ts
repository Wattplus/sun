import { useState, useEffect } from "react";
import { Lead } from "@/types/crm";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setLeads(data || []);
      } catch (err) {
        setError(err as Error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les leads",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return { leads, isLoading, error };
};
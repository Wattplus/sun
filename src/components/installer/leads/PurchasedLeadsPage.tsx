import { useState, useEffect } from "react";
import { Lead } from "@/types/crm";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/components/ui/use-toast";
import { LeadTable } from "./sections/LeadTable";
import { LeadStats } from "./sections/LeadStats";
import { LeadFilters } from "./sections/LeadFilters";
import { InstallerBreadcrumb } from "../InstallerBreadcrumb";

export const PurchasedLeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching leads:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les leads",
          variant: "destructive",
        });
        return;
      }

      setLeads(data || []);
    } catch (error) {
      console.error("Unexpected error fetching leads:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du chargement des leads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <InstallerBreadcrumb />
      <LeadStats leads={leads} />

      <div className="glass-panel p-6">
        <LeadFilters />
        <LeadTable leads={leads} loading={loading} />
      </div>
    </div>
  );
};

export default PurchasedLeadsPage;
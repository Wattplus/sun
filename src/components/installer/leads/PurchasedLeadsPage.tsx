import { useState, useEffect } from "react";
import { Lead } from "@/types/crm";
import { supabase } from "@/lib/supabase-client";
import { LeadTable } from "./sections/LeadTable";
import { LeadStats } from "./sections/LeadStats";
import { LeadFilters } from "./sections/LeadFilters";
import { InstallerBreadcrumb } from "../../installer/navigation/InstallerBreadcrumb";
import { useToast } from "@/components/ui/use-toast";

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

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-blue-500",
      contacted: "bg-yellow-500",
      qualified: "bg-green-500",
      assigned: "bg-purple-500",
      converted: "bg-emerald-500",
      lost: "bg-red-500"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const getStatusText = (status: string) => status;

  return (
    <div className="space-y-6">
      <InstallerBreadcrumb />
      <LeadStats leads={leads} />
      <div className="glass-panel p-6">
        <LeadFilters />
        <LeadTable 
          leads={leads}
          onEditClick={() => {}}
          onAssignClick={() => {}}
          onDeleteClick={() => {}}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />
      </div>
    </div>
  );
};
import { useEffect, useState } from "react";
import { Lead } from "@/types/crm";
import { supabase } from "@/lib/supabase-client";
import { LeadTable } from "./leads/LeadTable";
import { useToast } from "@/components/ui/use-toast";

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

export const PurchasedLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase.from("leads").select("*");
      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les leads",
          variant: "destructive",
        });
      } else {
        setLeads(data);
      }
    };

    fetchLeads();
  }, [toast]);

  return (
    <div>
      <LeadTable
        leads={leads}
        getStatusColor={getStatusColor}
      />
    </div>
  );
};

import { useState, useEffect } from "react";
import { Lead } from "@/types/crm";
import { supabase } from "@/lib/supabase-client";
import { LeadTable } from "./sections/LeadTable";
import { LeadStats } from "./sections/LeadStats";
import { LeadFilters } from "./sections/LeadFilters";
import { InstallerBreadcrumb } from "../../installer/navigation/InstallerBreadcrumb";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

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
      console.log("Fetching purchased leads...");
      
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        console.log("No authenticated user found");
        return;
      }

      const { data: installerData, error: installerError } = await supabase
        .from("installers")
        .select("id")
        .eq("user_id", session.session.user.id)
        .single();

      if (installerError) {
        console.error("Error fetching installer:", installerError);
        return;
      }

      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .contains('purchasedby', [installerData.id])
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching leads:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les leads",
          variant: "destructive",
        });
        return;
      }

      console.log("Fetched leads:", data?.length);
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

  const getStatusText = (status: string) => {
    const texts = {
      new: "Nouveau",
      contacted: "Contacté",
      qualified: "Qualifié",
      assigned: "Assigné",
      converted: "Converti",
      lost: "Perdu"
    };
    return texts[status as keyof typeof texts] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Mes Leads Achetés</h2>
        <p className="text-muted-foreground">
          Gérez et suivez vos leads achetés pour maximiser vos conversions
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <LeadStats leads={leads} />
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
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
        </Card>
      </div>
    </div>
  );
};
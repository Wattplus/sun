import { Lead } from "@/types/crm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase-client";

export const useLeadActions = (leads: Lead[], setLeads: (leads: Lead[]) => void) => {
  const { toast } = useToast();

  const handleDeleteLead = async (leadId: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", leadId);

      if (error) {
        console.error("Error deleting lead:", error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le lead",
          variant: "destructive",
        });
        return;
      }

      setLeads(leads.filter(lead => lead.id !== leadId));
      toast({
        title: "Lead supprimé",
        description: "Le lead a été supprimé définitivement.",
      });
    } catch (error) {
      console.error("Unexpected error deleting lead:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du lead",
        variant: "destructive",
      });
    }
  };

  const handleUpdateLead = async (updatedLead: Lead) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update(updatedLead)
        .eq("id", updatedLead.id);

      if (error) {
        console.error("Error updating lead:", error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le lead",
          variant: "destructive",
        });
        return;
      }

      setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
      toast({
        title: "Lead mis à jour",
        description: "Les modifications ont été enregistrées avec succès.",
      });
    } catch (error) {
      console.error("Unexpected error updating lead:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du lead",
        variant: "destructive",
      });
    }
  };

  return { handleDeleteLead, handleUpdateLead };
};
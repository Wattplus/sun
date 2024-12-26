import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Lead } from '@/types/crm';
import { useToast } from '@/hooks/use-toast';
import { mockPurchasedLeads } from '@/components/installer/dashboard/mockPurchasedLeads';

export const useLeadsSync = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: leads = mockPurchasedLeads, isLoading } = useQuery({
    queryKey: ['purchased-leads'],
    queryFn: async () => {
      // Return mock data for now
      return mockPurchasedLeads;
    }
  });

  const updateLead = useMutation({
    mutationFn: async (updatedLead: Lead) => {
      // Mock update - just return the updated lead
      return updatedLead;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchased-leads'] });
      toast({
        title: "Lead mis à jour",
        description: "Les modifications ont été enregistrées avec succès.",
      });
    }
  });

  return {
    leads,
    isLoading,
    updateLead: updateLead.mutate
  };
};
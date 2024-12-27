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
      // Simule une requête API - à remplacer par une vraie requête API plus tard
      return mockPurchasedLeads;
    },
    refetchInterval: 30000, // Rafraîchit toutes les 30 secondes
  });

  const updateLead = useMutation({
    mutationFn: async (updatedLead: Partial<Lead>) => {
      // Simule une mise à jour - à remplacer par une vraie requête API plus tard
      const leadIndex = mockPurchasedLeads.findIndex(lead => lead.id === updatedLead.id);
      if (leadIndex !== -1) {
        mockPurchasedLeads[leadIndex] = {
          ...mockPurchasedLeads[leadIndex],
          ...updatedLead,
        };
      }
      return mockPurchasedLeads[leadIndex];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchased-leads'] });
    },
  });

  return {
    leads,
    isLoading,
    updateLead: updateLead.mutate
  };
};
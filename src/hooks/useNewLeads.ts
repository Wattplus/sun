import { useState } from "react";
import { Lead } from "@/types/crm";
import { toast } from "sonner";
import { useLeadsFetching } from "./leads/useLeadsFetching";
import { useInstallerBalance } from "./installer/useInstallerBalance";
import { supabase } from "@/integrations/supabase/client";

export const useNewLeads = () => {
  const { leads } = useLeadsFetching();
  const { balance } = useInstallerBalance();
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<"default" | "asc" | "desc">("default");

  const calculateTotalPrice = () => {
    return selectedLeads.reduce((total, lead) => {
      return total + (lead.clienttype === 'professional' ? 49 : 26);
    }, 0);
  };

  const hasEnoughBalance = balance >= calculateTotalPrice();

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLeads(prev => 
      prev.some(l => l.id === lead.id)
        ? prev.filter(l => l.id !== lead.id)
        : [...prev, lead]
    );
  };

  const handleSelectAll = () => {
    setSelectedLeads(prev => 
      prev.length === leads.length ? [] : [...leads]
    );
  };

  const handlePurchase = async (paymentMethod: 'prepaid' | 'direct') => {
    const totalPrice = calculateTotalPrice();

    if (paymentMethod === 'prepaid' && !hasEnoughBalance) {
      toast.error("Solde insuffisant", {
        description: "Veuillez recharger votre compte pour acheter ces leads.",
      });
      return;
    }

    try {
      if (paymentMethod === 'prepaid') {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) {
          toast.error("Erreur d'authentification");
          return;
        }

        const { error } = await supabase.rpc('deduct_credits', {
          amount: totalPrice,
          user_id: session.user.id
        });

        if (error) throw error;

        toast.success("Leads achetés avec succès !");
      } else {
        const { data, error } = await supabase.functions.invoke('create-lead-checkout', {
          body: {
            leads: selectedLeads.map(lead => ({
              id: lead.id,
              priceId: lead.clienttype === 'professional' 
                ? 'price_1Qa0nUFOePj4Hv47Ih00CR8k' // 49€ pour les leads pro
                : 'price_1QaAlfFOePj4Hv475LWE2bGQ', // 26€ pour les particuliers
              type: 'mutualise'
            }))
          }
        });

        if (error) throw error;
        if (data?.url) window.location.href = data.url;
      }
    } catch (error) {
      console.error("Erreur lors de l'achat:", error);
      toast.error("Une erreur est survenue lors de l'achat");
    }
  };

  return {
    selectedLeads,
    showFilters,
    projectTypeFilter,
    selectedDepartments,
    priceFilter,
    balance,
    leads,
    hasEnoughBalance,
    setShowFilters,
    setProjectTypeFilter,
    setSelectedDepartments,
    setPriceFilter,
    handleLeadSelect,
    handleSelectAll,
    handlePurchase,
    calculateTotalPrice,
  };
};
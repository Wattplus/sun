import { useState, useEffect } from "react";
import { Lead } from "@/types/crm";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";

export const useNewLeads = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<"default" | "asc" | "desc">("default");
  const [balance, setBalance] = useState(0);
  const [leads, setLeads] = useState<Lead[]>([]);

  // Fetch leads from Supabase
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .eq('status', 'new')
          .is('purchasedby', null);

        if (error) {
          console.error("Error fetching leads:", error);
          toast.error("Erreur lors de la récupération des leads");
          return;
        }

        console.log("Fetched leads:", data);
        setLeads(data || []);
      } catch (error) {
        console.error("Error in fetchLeads:", error);
        toast.error("Erreur lors de la récupération des leads");
      }
    };

    fetchLeads();
  }, []);

  // Fetch installer balance
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
      }
    };

    fetchBalance();
  }, []);

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
        const response = await fetch("https://dqzsycxxgltztufrhams.supabase.co/functions/v1/create-lead-checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leads: selectedLeads.map(lead => ({
              id: lead.id,
              price: lead.clienttype === 'professional' ? 49 : 26
            }))
          }),
        });

        if (!response.ok) throw new Error();

        const { url } = await response.json();
        if (url) window.location.href = url;
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
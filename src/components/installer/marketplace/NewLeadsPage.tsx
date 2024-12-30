import { useState, useEffect } from "react";
import { Lead } from "@/types/crm";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { LeadsTable } from "./components/LeadsTable";
import { LeadsSummaryCards } from "./components/LeadsSummaryCards";
import { LeadsFilters } from "../dashboard/LeadsFilters";
import { LeadsHeader } from "./components/LeadsHeader";
import { LeadsSelection } from "./components/LeadsSelection";
import { useLeadOperations } from "@/hooks/useLeadOperations";
import { supabase } from "@/lib/supabase-client";

export const NewLeadsPage = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<"default" | "asc" | "desc">("default");
  const [balance, setBalance] = useState(0);
  
  const { leads } = useLeadOperations();
  const availableLeads = leads.filter(lead => !lead.purchasedby?.length);

  useEffect(() => {
    const fetchBalance = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return;

      const { data: installer } = await supabase
        .from('installers')
        .select('credits')
        .eq('user_id', session.user.id)
        .single();

      if (installer) {
        setBalance(installer.credits);
      }
    };

    fetchBalance();
  }, []);

  const calculateTotalPrice = () => {
    return selectedLeads.reduce((total, lead) => {
      return total + (lead.projectType === 'professional' ? 49 : 26);
    }, 0);
  };

  const hasEnoughBalance = balance >= calculateTotalPrice();
  
  console.log("[NewLeadsPage] Available leads:", availableLeads.length);
  
  const availableDepartments = Array.from(
    new Set(availableLeads.map(lead => lead.postalcode.substring(0, 2)))
  );

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLeads(prev => 
      prev.some(l => l.id === lead.id)
        ? prev.filter(l => l.id !== lead.id)
        : [...prev, lead]
    );
  };

  const handleSelectAll = () => {
    setSelectedLeads(prev => 
      prev.length === availableLeads.length ? [] : [...availableLeads]
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
        // Déduire du solde prépayé
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
        // Redirection vers la page de paiement Stripe
        const response = await fetch("https://dqzsycxxgltztufrhams.supabase.co/functions/v1/create-lead-checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leads: selectedLeads.map(lead => ({
              id: lead.id,
              price: lead.projectType === 'professional' ? 49 : 26
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

  const handlePrepaidAccount = () => {
    window.location.href = '/espace-installateur/compte/prepaye';
  };

  const handleExport = () => {
    // Implement export functionality here
    console.log("Export functionality to be implemented");
  };

  const filteredLeads = availableLeads
    .filter(lead => projectTypeFilter === "all" || lead.clienttype === projectTypeFilter)
    .filter(lead => selectedDepartments.length === 0 || selectedDepartments.includes(lead.postalcode.substring(0, 2)))
    .sort((a, b) => {
      if (priceFilter === "asc") return (a.price || 0) - (b.price || 0);
      if (priceFilter === "desc") return (b.price || 0) - (a.price || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background">
      <div className="max-w-[1400px] mx-auto p-6 space-y-8">
        <LeadsHeader 
          onToggleFilters={() => setShowFilters(!showFilters)}
          onPrepaidAccount={handlePrepaidAccount}
          onExport={handleExport}
        />

        {showFilters && (
          <Card className="p-4 border border-primary/20 bg-background/50 backdrop-blur-sm">
            <LeadsFilters
              availableDepartments={availableDepartments}
              selectedDepartments={selectedDepartments}
              projectTypeFilter={projectTypeFilter}
              priceFilter={priceFilter}
              onDepartmentSelect={(dept) => setSelectedDepartments(prev => [...prev, dept])}
              onDepartmentRemove={(dept) => setSelectedDepartments(prev => prev.filter(d => d !== dept))}
              onProjectTypeChange={setProjectTypeFilter}
              onPriceFilterChange={setPriceFilter}
            />
          </Card>
        )}

        <LeadsSelection 
          selectedLeads={selectedLeads}
          onClearSelection={() => setSelectedLeads([])}
          onPurchase={handlePurchase}
          hasEnoughBalance={hasEnoughBalance}
          totalPrice={calculateTotalPrice()}
        />
        
        <LeadsSummaryCards 
          availableLeads={availableLeads}
          selectedLeads={selectedLeads}
          balance={balance}
          onPrepaidAccount={handlePrepaidAccount}
        />

        <Card className="overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-sm">
          <div className="p-6">
            <div className="overflow-x-auto">
              <LeadsTable 
                leads={filteredLeads}
                selectedLeads={selectedLeads}
                onSelectAll={handleSelectAll}
                onSelectLead={handleLeadSelect}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
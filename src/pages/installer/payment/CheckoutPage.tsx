import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase-client";
import { Lead } from "@/types/crm";
import { CheckoutHeader } from "@/components/installer/checkout/CheckoutHeader";
import { CheckoutSummary } from "@/components/installer/checkout/CheckoutSummary";
import { CheckoutActions } from "@/components/installer/checkout/CheckoutActions";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchLeads = async () => {
      const leadIds = searchParams.get("leads")?.split(",") || [];
      
      if (leadIds.length === 0) {
        toast.error("Aucun lead sélectionné");
        navigate("/espace-installateur/leads/nouveaux");
        return;
      }

      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session) {
          toast.error("Vous devez être connecté");
          navigate("/login");
          return;
        }

        console.log("Fetching leads with IDs:", leadIds);
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .in("id", leadIds);

        if (error) {
          console.error("Error fetching leads:", error);
          toast.error("Erreur lors du chargement des leads");
          return;
        }

        if (!data || data.length === 0) {
          toast.error("Aucun lead trouvé");
          navigate("/espace-installateur/leads/nouveaux");
          return;
        }

        console.log("Fetched leads:", data);
        setLeads(data);
        
        const totalPrice = data.reduce((sum, lead) => {
          const basePrice = lead.clienttype === 'professional' ? 49 : 26;
          return sum + basePrice;
        }, 0);
        
        setTotal(totalPrice);
      } catch (error) {
        console.error("Error in fetchLeads:", error);
        toast.error("Une erreur est survenue");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [navigate, searchParams]);

  const handleCheckout = async () => {
    if (leads.length === 0) {
      toast.error("Aucun lead sélectionné");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-lead-checkout", {
        body: {
          leads: leads.map(lead => ({
            id: lead.id,
            type: "mutualise",
            clientType: lead.clienttype,
            price: lead.clienttype === 'professional' ? 49 : 26
          }))
        }
      });

      if (error) {
        console.error("Error creating checkout:", error);
        toast.error("Erreur lors de la création du paiement");
        return;
      }

      if (!data?.url) {
        console.error("No checkout URL returned:", data);
        toast.error("Erreur: URL de paiement manquante");
        return;
      }

      console.log("Redirecting to checkout URL:", data.url);
      window.location.href = data.url;
    } catch (error) {
      console.error("Error in handleCheckout:", error);
      toast.error("Une erreur est survenue lors de la création du paiement");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <CheckoutHeader />
        <CheckoutSummary leads={leads} total={total} />
        <CheckoutActions 
          isLoading={isLoading} 
          onCheckout={handleCheckout}
          leadsCount={leads.length}
        />
      </div>
    </div>
  );
};
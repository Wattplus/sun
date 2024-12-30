import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, ArrowLeft, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase-client";
import { Lead } from "@/types/crm";
import { CheckoutHeader } from "@/components/installer/checkout/CheckoutHeader";
import { CheckoutSummary } from "@/components/installer/checkout/CheckoutSummary";
import { CheckoutActions } from "@/components/installer/checkout/CheckoutActions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SavedCards } from "@/components/installer/dashboard/prepaid/SavedCards";

interface InstallerInfo {
  companyName: string;
  address: string;
  postalCode: string;
}

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [installerInfo, setInstallerInfo] = useState<InstallerInfo | null>(null);
  const [cards, setCards] = useState([
    {
      id: "1",
      last4: "4242",
      brand: "Visa",
      expMonth: 12,
      expYear: 2024,
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session) {
          toast.error("Vous devez être connecté");
          navigate("/login");
          return;
        }

        // Fetch installer info
        const { data: installerData, error: installerError } = await supabase
          .from("installers")
          .select("company_name, address, postal_code")
          .eq("user_id", session.session.user.id)
          .single();

        if (installerError) {
          console.error("Error fetching installer:", installerError);
        } else if (installerData) {
          setInstallerInfo({
            companyName: installerData.company_name,
            address: installerData.address,
            postalCode: installerData.postal_code,
          });
        }

        const leadIds = searchParams.get("leads")?.split(",") || [];
        if (leadIds.length === 0) {
          toast.error("Aucun lead sélectionné");
          navigate("/espace-installateur/leads/nouveaux");
          return;
        }

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

  const handleDeleteLead = (leadId: string) => {
    const newLeads = leads.filter(lead => lead.id !== leadId);
    setLeads(newLeads);
    
    const totalPrice = newLeads.reduce((sum, lead) => {
      const basePrice = lead.clienttype === 'professional' ? 49 : 26;
      return sum + basePrice;
    }, 0);
    setTotal(totalPrice);

    // Update URL with remaining lead IDs
    const newLeadIds = newLeads.map(lead => lead.id).join(",");
    if (newLeadIds) {
      navigate(`/espace-installateur/checkout?leads=${newLeadIds}`);
    } else {
      navigate("/espace-installateur/leads/nouveaux");
    }
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

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
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <CheckoutHeader />

        {installerInfo && (
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
            <h3 className="text-lg font-semibold mb-4">Informations de facturation</h3>
            <div className="space-y-2">
              <p className="text-white/80">{installerInfo.companyName}</p>
              <p className="text-white/60">{installerInfo.address}</p>
              <p className="text-white/60">{installerInfo.postalCode}</p>
            </div>
          </Card>
        )}

        <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
          <h3 className="text-lg font-semibold mb-4">Moyen de paiement</h3>
          <SavedCards
            cards={cards}
            onDeleteCard={handleDeleteCard}
            onAddCard={() => {}}
          />
        </Card>

        <CheckoutSummary 
          leads={leads} 
          total={total}
          onDeleteLead={handleDeleteLead}
        />
        
        <CheckoutActions 
          isLoading={isLoading} 
          onCheckout={handleCheckout}
          leadsCount={leads.length}
        />
      </div>
    </div>
  );
};
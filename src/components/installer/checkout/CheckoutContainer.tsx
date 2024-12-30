import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase-client";
import { Lead } from "@/types/crm";
import { CheckoutHeader } from "./sections/CheckoutHeader";
import { LeadsList } from "./sections/LeadsList";
import { CheckoutActions } from "./sections/CheckoutActions";
import { CompanyInfoCard } from "./CompanyInfoCard";
import { PaymentMethodsCard } from "./PaymentMethodsCard";

interface InstallerInfo {
  companyName: string;
  address: string;
  postalCode: string;
}

export const CheckoutContainer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [installerInfo, setInstallerInfo] = useState<InstallerInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session) {
          toast.error("Vous devez être connecté");
          navigate("/login");
          return;
        }

        const { data: installerData, error: installerError } = await supabase
          .from("installers")
          .select("company_name, address, postal_code")
          .eq("user_id", session.session.user.id)
          .maybeSingle();

        if (installerError) {
          console.error("Error fetching installer:", installerError);
          toast.error("Erreur lors du chargement des informations de l'installateur");
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
        console.error("Error in fetchData:", error);
        toast.error("Une erreur est survenue");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, searchParams]);

  const handleDeleteLead = (leadId: string) => {
    const newLeads = leads.filter(lead => lead.id !== leadId);
    setLeads(newLeads);
    
    const totalPrice = newLeads.reduce((sum, lead) => {
      const basePrice = lead.clienttype === 'professional' ? 49 : 26;
      return sum + basePrice;
    }, 0);
    setTotal(totalPrice);

    const newLeadIds = newLeads.map(lead => lead.id).join(",");
    if (newLeadIds) {
      navigate(`/espace-installateur/checkout?leads=${newLeadIds}`);
    } else {
      navigate("/espace-installateur/leads/nouveaux");
    }
  };

  const handleCheckout = async () => {
    if (leads.length === 0) {
      toast.error("Aucun lead sélectionné");
      return;
    }

    setIsProcessing(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        toast.error("Vous devez être connecté");
        navigate("/login");
        return;
      }

      console.log("Creating checkout session for leads:", leads);
      const { data, error } = await supabase.functions.invoke("create-lead-checkout", {
        body: {
          leads: leads.map(lead => ({
            id: lead.id,
            type: "mutualise",
            clientType: lead.clienttype,
            price: lead.clienttype === 'professional' ? 49 : 26,
            email: session.session.user.email
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

      console.log("Redirecting to Stripe checkout:", data.url);
      window.location.href = data.url;
    } catch (error) {
      console.error("Error in handleCheckout:", error);
      toast.error("Une erreur est survenue lors de la création du paiement");
    } finally {
      setIsProcessing(false);
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
        
        {installerInfo && (
          <CompanyInfoCard installerInfo={installerInfo} />
        )}

        <PaymentMethodsCard />

        <LeadsList 
          leads={leads} 
          total={total}
          onDeleteLead={handleDeleteLead}
        />
        
        <CheckoutActions 
          isLoading={isProcessing}
          onCheckout={handleCheckout}
          leadsCount={leads.length}
        />
      </div>
    </div>
  );
};
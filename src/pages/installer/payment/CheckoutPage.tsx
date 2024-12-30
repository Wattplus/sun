import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { Lead } from "@/types/crm";

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
        const totalPrice = data.reduce((sum, lead) => sum + (lead.price || 25), 0);
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
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        toast.error("Vous devez être connecté");
        navigate("/login");
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-lead-checkout", {
        body: {
          leads: leads.map(lead => ({
            id: lead.id,
            price: lead.price || 25,
            type: "mutualise"
          }))
        }
      });

      if (error) {
        console.error("Error creating checkout:", error);
        toast.error("Erreur lors de la création du paiement");
        return;
      }

      if (!data?.url) {
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
          onClick={() => navigate(-1)}
          className="text-white/60 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Paiement</h1>
                  <p className="text-white/60">
                    Achat de {leads.length} lead{leads.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex justify-between items-center p-4 rounded-lg bg-white/5"
                  >
                    <div>
                      <p className="font-medium">{lead.firstname} {lead.lastname}</p>
                      <p className="text-sm text-white/60">{lead.postalcode}</p>
                    </div>
                    <p className="font-medium">{lead.price || 25}€</p>
                  </div>
                ))}

                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Total</p>
                    <p className="text-xl font-bold">{total}€</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isLoading || leads.length === 0}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  "Procéder au paiement"
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
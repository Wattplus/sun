import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const leadIds = searchParams.get("leads")?.split(",") || [];
  const [leads, setLeads] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchLeads = async () => {
      if (leadIds.length === 0) {
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

      setLeads(data || []);
      const totalPrice = data?.reduce((sum, lead) => sum + (lead.price || 0), 0) || 0;
      setTotal(totalPrice);
    };

    fetchLeads();
  }, [leadIds, navigate]);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-lead-checkout", {
        body: {
          leads: leads.map(lead => ({
            id: lead.id,
            price: lead.price,
            type: "mutualise"
          }))
        }
      });

      if (error) throw error;
      if (!data?.url) throw new Error("No checkout URL returned");

      window.location.href = data.url;
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast.error("Erreur lors de la création du paiement");
    } finally {
      setIsLoading(false);
    }
  };

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
                      <p className="font-medium">{lead.firstname}</p>
                      <p className="text-sm text-white/60">{lead.postalcode}</p>
                    </div>
                    <p className="font-medium">{lead.price}€</p>
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
                disabled={isLoading}
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
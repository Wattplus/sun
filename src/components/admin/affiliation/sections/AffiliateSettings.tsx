import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";

export const AffiliateSettings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Paramètres des Commissions</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="commission-rate">Taux de Commission (%)</Label>
              <Input id="commission-rate" type="number" defaultValue="40" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-payout">Seuil Minimum de Paiement (€)</Label>
              <Input id="min-payout" type="number" defaultValue="100" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cookie-duration">Durée des Cookies (jours)</Label>
            <Input id="cookie-duration" type="number" defaultValue="30" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Paramètres du Programme</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Inscription Automatique</Label>
              <p className="text-sm text-muted-foreground">
                Approuver automatiquement les nouvelles inscriptions
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifications Email</Label>
              <p className="text-sm text-muted-foreground">
                Envoyer des notifications pour les nouvelles conversions
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Programme Public</Label>
              <p className="text-sm text-muted-foreground">
                Permettre aux nouveaux affiliés de s'inscrire
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Enregistrer les modifications
        </Button>
      </div>
    </motion.div>
  );
};
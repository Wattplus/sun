import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Cookie, Shield, Bell, Percent, Link, Wallet, Clock } from "lucide-react";
import { toast } from "sonner";

export const AffiliateSettings = () => {
  const handleSave = () => {
    toast.success("Paramètres enregistrés avec succès");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="commissions" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Commissions
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            Tracking
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Paramètres Généraux
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Programme Public</Label>
                  <p className="text-sm text-muted-foreground">
                    Permettre aux nouveaux affiliés de s'inscrire
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Validation Automatique</Label>
                  <p className="text-sm text-muted-foreground">
                    Approuver automatiquement les nouvelles inscriptions
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Protection Anti-Fraude</Label>
                  <p className="text-sm text-muted-foreground">
                    Activer la détection automatique de fraude
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="commissions">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Paramètres des Commissions
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="commission-rate">Taux de Commission (%)</Label>
                  <Input id="commission-rate" type="number" defaultValue="40" />
                  <p className="text-sm text-muted-foreground">
                    Pourcentage standard pour tous les affiliés
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-payout">Seuil Minimum de Paiement (€)</Label>
                  <Input id="min-payout" type="number" defaultValue="100" />
                  <p className="text-sm text-muted-foreground">
                    Montant minimum avant paiement
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="payment-frequency">Fréquence de Paiement</Label>
                <select 
                  id="payment-frequency"
                  className="w-full p-2 rounded-md border border-input bg-background"
                >
                  <option value="monthly">Mensuel</option>
                  <option value="biweekly">Bi-mensuel</option>
                  <option value="weekly">Hebdomadaire</option>
                </select>
                <p className="text-sm text-muted-foreground">
                  Fréquence des versements automatiques
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bonus de Performance</Label>
                  <p className="text-sm text-muted-foreground">
                    Activer les bonus pour les meilleurs affiliés
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tracking">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Link className="h-5 w-5" />
              Paramètres de Tracking
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cookie-duration">Durée des Cookies (jours)</Label>
                  <Input id="cookie-duration" type="number" defaultValue="30" />
                  <p className="text-sm text-muted-foreground">
                    Durée de vie des cookies de tracking
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attribution-window">Fenêtre d'Attribution (jours)</Label>
                  <Input id="attribution-window" type="number" defaultValue="7" />
                  <p className="text-sm text-muted-foreground">
                    Période de crédit pour les conversions
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Double Commission</Label>
                  <p className="text-sm text-muted-foreground">
                    Autoriser plusieurs affiliés pour une même conversion
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Attribution Premier Clic</Label>
                  <p className="text-sm text-muted-foreground">
                    Attribuer la commission au premier affilié
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Paramètres des Notifications
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Nouvelles Conversions</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifier les affiliés des nouvelles conversions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Paiements</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifier les affiliés des nouveaux paiements
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mises à jour Programme</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifier les changements du programme d'affiliation
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rapports de Performance</Label>
                  <p className="text-sm text-muted-foreground">
                    Envoyer des rapports hebdomadaires aux affiliés
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Enregistrer les modifications
        </Button>
      </div>
    </motion.div>
  );
};
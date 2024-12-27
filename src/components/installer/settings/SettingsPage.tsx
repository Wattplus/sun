import { Save, Settings, Bell, Shield, Palette, Globe, CreditCard, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const SettingsPage = () => {
  const handleSave = () => {
    toast.success("Paramètres sauvegardés avec succès");
  };

  const SettingsSection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <div className="glass-panel p-6 rounded-xl space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          Paramètres
        </h1>
        <Button onClick={handleSave} className="hover:scale-105 transition-transform">
          <Save className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <SettingsSection icon={Bell} title="Notifications">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifs">Notifications par email</Label>
                <p className="text-sm text-muted-foreground">Recevez des mises à jour par email</p>
              </div>
              <Switch id="email-notifs" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifs">Notifications push</Label>
                <p className="text-sm text-muted-foreground">Activez les notifications push</p>
              </div>
              <Switch id="push-notifs" />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection icon={Shield} title="Sécurité">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                <p className="text-sm text-muted-foreground">Renforcez la sécurité de votre compte</p>
              </div>
              <Switch id="two-factor" />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection icon={Palette} title="Apparence">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode">Mode sombre</Label>
                <p className="text-sm text-muted-foreground">Ajustez le thème de l'interface</p>
              </div>
              <Switch id="dark-mode" />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection icon={Globe} title="Langue et Région">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="language">Langue de l'interface</Label>
                <p className="text-sm text-muted-foreground">Choisissez votre langue préférée</p>
              </div>
              <select id="language" className="bg-background border border-input rounded-md px-3 py-2">
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection icon={CreditCard} title="Facturation">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="invoice-email">Emails de facturation</Label>
                <p className="text-sm text-muted-foreground">Recevez vos factures par email</p>
              </div>
              <Switch id="invoice-email" />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection icon={Lock} title="Confidentialité">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics">Partager les analytics</Label>
                <p className="text-sm text-muted-foreground">Aidez-nous à améliorer nos services</p>
              </div>
              <Switch id="analytics" />
            </div>
          </div>
        </SettingsSection>
      </motion.div>
    </div>
  );
};
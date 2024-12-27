import { Save, Settings, Bell, Shield, Palette, Globe, CreditCard, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-6 rounded-xl space-y-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold gradient-text">{title}</h2>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </motion.div>
  );

  const SettingItem = ({ label, description, children }: { label: string, description: string, children: React.ReactNode }) => (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-center justify-between p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/10"
    >
      <div>
        <Label className="text-base">{label}</Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Paramètres</h1>
        </div>
        <Button 
          onClick={handleSave}
          className="glass-button"
        >
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
          <SettingItem 
            label="Notifications par email"
            description="Recevez des mises à jour par email"
          >
            <Switch />
          </SettingItem>
          <SettingItem
            label="Notifications push"
            description="Activez les notifications push"
          >
            <Switch />
          </SettingItem>
        </SettingsSection>

        <SettingsSection icon={Shield} title="Sécurité">
          <SettingItem
            label="Authentification à deux facteurs"
            description="Renforcez la sécurité de votre compte"
          >
            <Switch />
          </SettingItem>
        </SettingsSection>

        <SettingsSection icon={Palette} title="Apparence">
          <SettingItem
            label="Mode sombre"
            description="Ajustez le thème de l'interface"
          >
            <Switch />
          </SettingItem>
        </SettingsSection>

        <SettingsSection icon={Globe} title="Langue et Région">
          <SettingItem
            label="Langue de l'interface"
            description="Choisissez votre langue préférée"
          >
            <select className="bg-background/50 border border-input rounded-md px-3 py-2">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </SettingItem>
        </SettingsSection>

        <SettingsSection icon={CreditCard} title="Facturation">
          <SettingItem
            label="Emails de facturation"
            description="Recevez vos factures par email"
          >
            <Switch />
          </SettingItem>
        </SettingsSection>

        <SettingsSection icon={Lock} title="Confidentialité">
          <SettingItem
            label="Partager les analytics"
            description="Aidez-nous à améliorer nos services"
          >
            <Switch />
          </SettingItem>
        </SettingsSection>
      </motion.div>
    </div>
  );
};
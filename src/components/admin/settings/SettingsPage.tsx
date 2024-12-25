import { Save, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const SettingsPage = () => {
  const handleSave = () => {
    toast.success("Paramètres sauvegardés avec succès");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          Paramètres
        </h1>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="glass-panel p-6 rounded-xl space-y-6">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifs">Notifications par email</Label>
              <Switch id="email-notifs" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifs">Notifications push</Label>
              <Switch id="push-notifs" />
            </div>
          </div>

          <Separator />

          <h2 className="text-lg font-semibold pt-4">Préférences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Mode sombre</Label>
              <Switch id="dark-mode" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics">Partager les analytics</Label>
              <Switch id="analytics" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
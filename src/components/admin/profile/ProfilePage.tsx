import { User, Settings, Shield, Key } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { toast } from "sonner";

const AdminProfilePage = () => {
  const handleSave = () => {
    toast.success("Profil mis à jour avec succès");
  };

  return (
    <div className="space-y-6">
      <AdminBreadcrumb />
      
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Profil Administrateur
          </h1>
          <Button onClick={handleSave}>
            Sauvegarder les modifications
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="glass-panel p-6 rounded-xl space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Admin Principal</h2>
                <p className="text-muted-foreground">admin@sunprospect.fr</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="Principal" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@sunprospect.fr" />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Sécurité
              </h3>
              <div className="space-y-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Authentification à deux facteurs
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Statut: Désactivé</p>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </p>
                </div>
                <Button variant="outline">Activer</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
import { Camera, Mail, Phone, MapPin, Building, Save } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ProfilePage = () => {
  const handleSave = () => {
    toast.success("Profil mis à jour avec succès");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profil Administrateur</h1>
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
        <div className="glass-panel p-6 rounded-xl">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <Button size="icon" variant="secondary" className="absolute bottom-0 right-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Photo de profil</h2>
              <p className="text-white/70">JPG, GIF ou PNG. Max 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                <Input id="email" type="email" defaultValue="john@example.com" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                <Input id="phone" type="tel" defaultValue="+33 6 12 34 56 78" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Entreprise</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                <Input id="company" defaultValue="Solar Company" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Localisation</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                <Input id="location" defaultValue="Paris, France" className="pl-10" />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Parlez-nous de vous..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
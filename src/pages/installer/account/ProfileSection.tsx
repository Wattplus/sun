import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Crown, Star, Award, Calendar, ArrowRight, Users, TrendingUp, Shield, MapPin, Search, MessageSquare, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const ProfileSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    siret: "",
    website: "",
    description: "",
    showPhoneNumber: true,
    highlightProfile: false,
    acceptDirectMessages: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleToggleChange = (field: string) => (checked: boolean) => {
    setFormData({
      ...formData,
      [field]: checked,
    });
  };

  const handleUpgradeToPremium = () => {
    toast({
      title: "Mise à niveau Premium",
      description: "Redirection vers les options d'abonnement...",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Formulaire principal */}
        <Card className="md:col-span-2 p-6 bg-white/5 backdrop-blur-sm border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Prénom"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                lightMode
              />
              <FormField
                label="Nom"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                lightMode
              />
              <FormField
                label="Email"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                lightMode
              />
              <FormField
                label="Téléphone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+33 6 12 34 56 78"
                lightMode
              />
              <FormField
                label="Entreprise"
                id="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nom de votre entreprise"
                lightMode
              />
              <FormField
                label="SIRET"
                id="siret"
                value={formData.siret}
                onChange={handleChange}
                placeholder="123 456 789 00012"
                lightMode
              />
              <FormField
                label="Site web"
                id="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="www.monentreprise.fr"
                lightMode
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Description de votre entreprise
              </label>
              <textarea
                className="w-full h-32 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus-visible:border-white p-3"
                placeholder="Décrivez votre entreprise, vos services et votre expertise..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-4 border-t border-white/10 pt-4">
              <h4 className="font-medium text-white">Options de visibilité</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Afficher le numéro de téléphone</Label>
                    <p className="text-sm text-white/60">Permettre aux clients de vous contacter directement</p>
                  </div>
                  <Switch
                    checked={formData.showPhoneNumber}
                    onCheckedChange={handleToggleChange('showPhoneNumber')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Profil mis en avant</Label>
                    <p className="text-sm text-white/60">Apparaître en haut des résultats de recherche</p>
                  </div>
                  <Switch
                    checked={formData.highlightProfile}
                    onCheckedChange={handleToggleChange('highlightProfile')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Messages directs</Label>
                    <p className="text-sm text-white/60">Recevoir des messages des clients potentiels</p>
                  </div>
                  <Switch
                    checked={formData.acceptDirectMessages}
                    onCheckedChange={handleToggleChange('acceptDirectMessages')}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Enregistrer les modifications
            </Button>
          </form>
        </Card>

        {/* Carte Premium et Stats */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border-yellow-500/20">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-white">Profil Premium</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-white">Visibilité maximale</h4>
                      <p className="text-sm text-white/60">Apparaissez en tête des résultats de recherche</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Search className="h-5 w-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-white">SEO Optimisé</h4>
                      <p className="text-sm text-white/60">Meilleur référencement dans l'annuaire</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BadgeCheck className="h-5 w-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-white">Badge vérifié</h4>
                      <p className="text-sm text-white/60">Gagnez la confiance des clients</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-white">Messagerie prioritaire</h4>
                      <p className="text-sm text-white/60">Réponse rapide aux demandes clients</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-white">Zones multiples</h4>
                      <p className="text-sm text-white/60">Définissez plusieurs zones d'intervention</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-white">Leads illimités</h4>
                      <p className="text-sm text-white/60">Accès à tous les contacts qualifiés</p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleUpgradeToPremium}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
                >
                  Passer au Premium
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-primary/20">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Statistiques du profil</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/5">
                    <p className="text-sm text-white/60">Vues du profil</p>
                    <p className="text-2xl font-bold text-white">247</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <p className="text-sm text-white/60">Contacts reçus</p>
                    <p className="text-2xl font-bold text-white">18</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
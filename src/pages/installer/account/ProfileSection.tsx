import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Crown, Star, Award, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
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

            <Button type="submit" className="w-full md:w-auto">
              Enregistrer les modifications
            </Button>
          </form>
        </Card>

        {/* Carte Premium */}
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
                  <Award className="h-5 w-5 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Badge vérifié</h4>
                    <p className="text-sm text-white/60">Gagnez la confiance des clients potentiels</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Abonnement annuel</h4>
                    <p className="text-sm text-white/60">Profitez de tarifs préférentiels sur les leads</p>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold"
              >
                Passer au Premium
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
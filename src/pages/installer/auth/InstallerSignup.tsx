import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { FormField } from "@/components/form/FormField";
import { motion } from "framer-motion";
import { Shield, Sun, Users, Wallet } from "lucide-react";

export function InstallerSignup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    companyName: "",
    phone: "",
    siret: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas");
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Erreur lors de la création du compte");

      const { error: installerError } = await supabase
        .from("installers")
        .insert([
          {
            user_id: authData.user.id,
            company_name: formData.companyName,
            contact_name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            siret: formData.siret,
            verified: false,
            credits: 0,
            service_area: [],
            certifications: {
              qualiPV: false,
              rge: false,
              qualibat: false,
            },
            installation_types: {
              residential: false,
              commercial: false,
              industrial: false,
            },
            maintenance_services: false,
            visibility_settings: {
              showPhoneNumber: true,
              highlightProfile: false,
              acceptDirectMessages: true,
              showCertifications: true,
            },
          },
        ]);

      if (installerError) throw installerError;

      toast.success("Compte créé avec succès !");
      navigate("/espace-installateur");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Erreur lors de la création du compte");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Accès aux leads qualifiés",
      description: "Recevez des prospects vérifiés et prêts à passer à l'action"
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Profil vérifié",
      description: "Gagnez la confiance des clients avec un badge vérifié"
    },
    {
      icon: <Sun className="h-6 w-6 text-primary" />,
      title: "Visibilité maximale",
      description: "Apparaissez en priorité dans les recherches des clients"
    },
    {
      icon: <Wallet className="h-6 w-6 text-primary" />,
      title: "Tarification flexible",
      description: "Payez uniquement pour les leads qui vous intéressent"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            Développez votre activité solaire
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Rejoignez notre réseau d'installateurs certifiés et accédez à des opportunités commerciales qualifiées
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6 space-y-3 bg-card/50 backdrop-blur-sm">
                  <div className="p-2 w-fit rounded-lg bg-primary/10">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 bg-card/50 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Prénom"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    lightMode
                  />
                  <FormField
                    label="Nom"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    lightMode
                  />
                </div>

                <FormField
                  label="Email professionnel"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  lightMode
                />

                <FormField
                  label="Mot de passe"
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  lightMode
                />

                <FormField
                  label="Confirmer le mot de passe"
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  lightMode
                />

                <FormField
                  label="Nom de l'entreprise"
                  id="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  lightMode
                />

                <FormField
                  label="Téléphone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  lightMode
                />

                <FormField
                  label="SIRET"
                  id="siret"
                  value={formData.siret}
                  onChange={handleChange}
                  required
                  lightMode
                  placeholder="123 456 789 00012"
                />

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? "Création en cours..." : "Créer mon compte"}
                </Button>
              </form>

              <div className="text-center text-sm text-muted-foreground mt-6">
                Déjà inscrit ?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal"
                  onClick={() => navigate("/login")}
                >
                  Se connecter
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
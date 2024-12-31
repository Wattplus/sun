import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { FormField } from "@/components/form/FormField";
import { motion } from "framer-motion";

export const SignupForm = () => {
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20">
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
            className="w-full bg-primary hover:bg-primary/90 py-6 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Création en cours..." : "Créer mon compte"}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Déjà inscrit ?
          </p>
          <Button
            variant="outline"
            className="w-full bg-white/5 hover:bg-white/10 border-primary/20 text-primary hover:text-primary-light transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Se connecter à mon espace
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
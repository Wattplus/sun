import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { FormField } from "@/components/form/FormField";

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

      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Erreur lors de la création du compte");

      // 2. Create installer profile
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
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-card/50 backdrop-blur-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Devenir installateur</h1>
          <p className="text-muted-foreground">
            Créez votre compte professionnel pour accéder à notre marketplace de leads qualifiés
          </p>
        </div>

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
            className="w-full"
            disabled={loading}
          >
            {loading ? "Création en cours..." : "Créer mon compte"}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
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
    </div>
  );
}
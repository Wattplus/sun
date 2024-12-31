import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { useNavigate } from "react-router-dom";

export const ProfileSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Olivier",
    lastName: "Malai",
    email: "",
    phone: "0 805 29 40 40",
    company: "PPF Énergie",
    siret: "",
    website: "",
  });

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour accéder à cette page",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }
      if (!session) {
        navigate("/login");
        return;
      }
      setFormData(prev => ({ ...prev, email: session.user.email || "" }));
    };

    getSession();
  }, [navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error("Vous devez être connecté pour créer votre profil");
      }

      const { error } = await supabase.from('installers').insert([
        {
          user_id: session.user.id,
          company_name: formData.company,
          contact_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          address: "99 Rue du Moulin des Landes",
          postal_code: "44980",
          city: "Sainte-Luce-sur-Loire",
          service_area: ["44980"],
          website: formData.website,
          siret: formData.siret,
        }
      ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Profil créé",
        description: "Votre profil a été créé avec succès",
      });
      
      navigate("/espace-installateur/leads/nouveaux");
    } catch (error) {
      console.error("Error creating profile:", error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de la création de votre profil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Entreprise</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nom de votre entreprise"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siret">SIRET</Label>
            <Input
              id="siret"
              value={formData.siret}
              onChange={handleChange}
              placeholder="123 456 789 00012"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Site web</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="www.monentreprise.fr"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full md:w-auto flex items-center gap-2"
          disabled={isLoading}
        >
          <Save className="w-4 h-4" />
          {isLoading ? "Création en cours..." : "Enregistrer les modifications"}
        </Button>
      </form>
    </Card>
  );
};
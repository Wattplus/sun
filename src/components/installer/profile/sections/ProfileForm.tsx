import { FormField } from "@/components/form/FormField"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { User, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"

interface ProfileFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    website: string;
    description: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileForm = ({ formData, handleChange }: ProfileFormProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const [initialData, setInitialData] = useState(formData);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (profile) {
          setInitialData({
            ...formData,
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            email: profile.email || '',
            phone: profile.phone || '',
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du profil",
          variant: "destructive"
        });
      }
    };

    loadProfileData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      const { error: installerError } = await supabase
        .from('installers')
        .update({
          contact_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          website: formData.website,
          description: formData.description,
        })
        .eq('user_id', user.id);

      if (installerError) throw installerError;

      toast({
        title: "Succès",
        description: "Vos informations ont été mises à jour",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white">Informations personnelles</h3>
        </div>
        <Button 
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="bg-primary hover:bg-primary-dark"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Prénom"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="John"
          required
          lightMode
        />

        <FormField
          label="Nom"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
          required
          lightMode
        />

        <FormField
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
          disabled
          lightMode
        />

        <FormField
          label="Téléphone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+33 6 12 34 56 78"
          required
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

        <FormField
          label="Description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Décrivez votre entreprise en quelques mots"
          lightMode
        />
      </div>
    </Card>
  );
};
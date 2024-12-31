import { FormField } from "@/components/form/FormField"
import { Card } from "@/components/ui/card"
import { User, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
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
  const [initialData, setInitialData] = useState(formData);

  useEffect(() => {
    const syncProfileData = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Get profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        // Get installer data
        const { data: installer } = await supabase
          .from('installers')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profile || installer) {
          const syncedData = {
            ...formData,
            firstName: profile?.first_name || installer?.contact_name?.split(' ')[0] || '',
            lastName: profile?.last_name || installer?.contact_name?.split(' ')[1] || '',
            email: profile?.email || installer?.email || user.email || '',
            phone: profile?.phone || installer?.phone || '',
            website: installer?.website || '',
            description: installer?.description || '',
          };

          setInitialData(syncedData);
          // Update parent form data
          Object.entries(syncedData).forEach(([key, value]) => {
            const event = {
              target: { id: key, value }
            } as React.ChangeEvent<HTMLInputElement>;
            handleChange(event);
          });
        }
      } catch (error) {
        console.error('Error syncing profile data:', error);
        toast.error("Impossible de synchroniser les données du profil");
      }
    };

    syncProfileData();
  }, []);

  const handleSave = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      // Update profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update installers table
      const { error: installerError } = await supabase
        .from('installers')
        .update({
          contact_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          description: formData.description,
        })
        .eq('user_id', user.id);

      if (installerError) throw installerError;

      setInitialData(formData);
      toast.success("Vos informations ont été mises à jour");
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error("Impossible de sauvegarder les modifications");
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
          error={!formData.firstName ? "Le prénom est obligatoire" : ""}
        />

        <FormField
          label="Nom"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
          required
          lightMode
          error={!formData.lastName ? "Le nom est obligatoire" : ""}
        />

        <FormField
          label="Email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
          required
          lightMode
          error={!formData.email ? "L'email est obligatoire" : ""}
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
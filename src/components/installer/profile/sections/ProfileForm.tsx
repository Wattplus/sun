import { Card } from "@/components/ui/card";
import { User, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useProfileData } from "../hooks/useProfileData";
import { PersonalInfoFields } from "../components/PersonalInfoFields";

export const ProfileForm = () => {
  const { formData, setFormData, loading } = useProfileData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSave = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

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

      toast.success("Vos informations ont été mises à jour");
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error("Impossible de sauvegarder les modifications");
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

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
          className="bg-primary hover:bg-primary-dark"
        >
          <Save className="w-4 h-4 mr-2" />
          Enregistrer
        </Button>
      </div>

      <PersonalInfoFields formData={formData} handleChange={handleChange} />
    </Card>
  );
};
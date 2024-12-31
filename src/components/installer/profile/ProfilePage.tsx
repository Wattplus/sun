import { useState, useEffect } from "react";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { SolarSpecificSection } from "./sections/SolarSpecificSection";
import { ProfileStats } from "./ProfileStats";
import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import type { ProfileFormData } from "./types/profile";

export const ProfilePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "Olivier",
    lastName: "Malai",
    email: "",
    phone: "0 805 29 40 40",
    company: "PPF Énergie",
    siret: "",
    website: "",
    description: "",
    experience: "",
    panelBrands: "",
    inverterBrands: "",
    guaranteeYears: "",
    service_area: ["44980"],
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false,
    },
    installationTypes: {
      residential: true,
      commercial: true,
      industrial: false,
    },
    maintenanceServices: true,
  });

  useEffect(() => {
    const getUserEmail = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        return;
      }
      if (session?.user?.email) {
        setFormData(prev => ({ ...prev, email: session.user.email }));
      }
    };
    getUserEmail();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    const [group, key] = field.includes('.') ? field.split('.') : [field, null];
    
    setFormData(prev => {
      if (key) {
        return {
          ...prev,
          [group]: {
            ...(prev[group as keyof typeof prev] as Record<string, boolean>),
            [key]: checked
          }
        };
      }
      return {
        ...prev,
        [group]: checked
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour créer votre profil",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from('installers').insert({
        company_name: formData.company,
        contact_name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        address: "99 Rue du Moulin des Landes",
        postal_code: "44980",
        city: "Sainte-Luce-sur-Loire",
        service_area: formData.service_area,
        website: formData.website,
        experience_years: parseInt(formData.experience) || 0,
        panel_brands: formData.panelBrands.split(',').map(b => b.trim()),
        inverter_brands: formData.inverterBrands.split(',').map(b => b.trim()),
        warranty_years: parseInt(formData.guaranteeYears) || 0,
        certifications: formData.certifications,
        installation_types: formData.installationTypes,
        maintenance_services: formData.maintenanceServices,
      });

      if (error) {
        console.error("Error creating installer profile:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la création de votre profil",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Votre profil a été créé avec succès",
      });
      
      navigate("/espace-installateur/leads/nouveaux");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      
      <div className="max-w-[1600px] mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Mon Profil Professionnel</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <ProfileStats />
          <BasicInfoSection formData={formData} handleChange={handleChange} />
          <SolarSpecificSection 
            formData={formData} 
            handleChange={handleChange} 
            handleCheckboxChange={handleCheckboxChange}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Créer mon profil
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
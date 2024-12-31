import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { BasicInfoSection } from "@/components/installer/profile/sections/BasicInfoSection";
import { SolarSpecificSection } from "@/components/installer/profile/sections/SolarSpecificSection";
import { ProfileStats } from "@/components/installer/profile/ProfileStats";
import { ProfileVisibilityOptions } from "@/components/installer/profile/ProfileVisibilityOptions";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import type { ProfileFormData } from "@/components/installer/profile/types/profile";

export const InstallerProfilePage = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    company: "Solar Pro",
    siret: "123 456 789 00012",
    website: "www.solarpro.fr",
    description: "Installateur photovoltaïque certifié",
    experience: "10",
    panelBrands: "SunPower, LG, Panasonic",
    inverterBrands: "SMA, Fronius, Enphase",
    guaranteeYears: "20",
    service_area: ["75", "92", "93", "94"],
    certifications: {
      qualiPV: true,
      rge: true,
      qualibat: true
    },
    installationTypes: {
      residential: true,
      commercial: true,
      industrial: false
    },
    maintenanceServices: true
  });

  const [visibilityOptions, setVisibilityOptions] = useState({
    showPhoneNumber: true,
    highlightProfile: false,
    acceptDirectMessages: true,
    showCertifications: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (field.includes('.')) {
      const [category, item] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [item]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: checked
      }));
    }
  };

  const handleVisibilityChange = (field: string, checked: boolean) => {
    setVisibilityOptions(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSave = async () => {
    try {
      // Simuler une sauvegarde API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Saving profile data:", formData);
      console.log("Saving visibility options:", visibilityOptions);
      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Erreur lors de la sauvegarde du profil");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mon Profil Professionnel</h1>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <ProfileStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BasicInfoSection 
              formData={formData} 
              handleChange={handleChange}
            />
            
            <SolarSpecificSection
              formData={formData}
              handleChange={handleChange}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>

          <div className="space-y-6">
            <ProfileVisibilityOptions
              options={visibilityOptions}
              onToggle={handleVisibilityChange}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
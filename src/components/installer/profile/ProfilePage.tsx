import { BasicInfoSection } from "@/components/installer/profile/sections/BasicInfoSection"
import { SolarSpecificSection } from "@/components/installer/profile/sections/SolarSpecificSection"
import { ProfileStats } from "@/components/installer/profile/ProfileStats"
import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb"
import { motion } from "framer-motion"
import { useState } from "react"

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  siret: string;
  website: string;
  experience: string;
  panelBrands: string;
  inverterBrands: string;
  guaranteeYears: string;
  interventionZones: string;
  certifications: {
    qualiPV: boolean;
    rge: boolean;
    qualibat: boolean;
  };
  installationTypes: {
    residential: boolean;
    commercial: boolean;
    industrial: boolean;
  };
  maintenanceServices: boolean;
}

export const ProfilePage = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    siret: "",
    website: "",
    experience: "",
    panelBrands: "",
    inverterBrands: "",
    guaranteeYears: "",
    interventionZones: "",
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false,
    },
    installationTypes: {
      residential: false,
      commercial: false,
      industrial: false,
    },
    maintenanceServices: false,
  });

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
            ...(prev[group as keyof FormData] as Record<string, boolean>),
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      
      <div className="max-w-[1600px] mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Mon Profil Professionnel</h1>

        <div className="space-y-6">
          <ProfileStats />
          <BasicInfoSection formData={formData} handleChange={handleChange} />
          <SolarSpecificSection 
            formData={formData} 
            handleChange={handleChange} 
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
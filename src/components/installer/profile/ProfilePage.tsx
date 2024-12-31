import { BasicInfoSection } from "@/components/installer/profile/sections/BasicInfoSection"
import { SolarSpecificSection } from "@/components/installer/profile/sections/SolarSpecificSection"
import { ProfileStats } from "@/components/installer/profile/ProfileStats"
import { SubscriptionPlans } from "@/components/installer/subscription/SubscriptionPlans"
import { InstallerBreadcrumb } from "@/components/installer/navigation/InstallerBreadcrumb"
import { motion } from "framer-motion"
import { useState } from "react"

export const ProfilePage = () => {
  const [formData, setFormData] = useState({
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
            ...prev[group as keyof typeof prev],
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProfileStats />
            <BasicInfoSection formData={formData} handleChange={handleChange} />
            <SolarSpecificSection 
              formData={formData} 
              handleChange={handleChange} 
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SubscriptionPlans />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
import { Button } from "@/components/ui/button"
import { ProfileHeader } from "./components/ProfileHeader"
import { PhotovoltaicInfoSection } from "./sections/PhotovoltaicInfoSection"
import { CertificationsSection } from "./sections/CertificationsSection"
import { InstallationTypesSection } from "./sections/InstallationTypesSection"
import { InterventionZonesSection } from "../account/sections/InterventionZonesSection"
import { motion } from "framer-motion"
import { useInstallerData } from "./hooks/useInstallerData"
import { useInstallerForm } from "./hooks/useInstallerForm"

export const ProfilePage = () => {
  const { formData, setFormData } = useInstallerData()
  const { handleChange, handleCheckboxChange, handleZonesChange, handleSubmit } = useInstallerForm(formData, setFormData)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Mon Profil Professionnel</h1>

        <ProfileHeader formData={formData} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <PhotovoltaicInfoSection formData={formData} handleChange={handleChange} />
          
          <CertificationsSection 
            certifications={formData.certifications}
            handleCheckboxChange={handleCheckboxChange}
          />
          
          <InstallationTypesSection 
            installationTypes={formData.installationTypes}
            maintenanceServices={formData.maintenanceServices}
            handleCheckboxChange={handleCheckboxChange}
          />

          <InterventionZonesSection
            selectedZones={formData.service_area}
            onZonesChange={handleZonesChange}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              type="submit"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white"
            >
              Enregistrer les modifications
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  )
}
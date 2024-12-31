import { Button } from "@/components/ui/button"
import { ProfileStats } from "@/components/installer/profile/ProfileStats"
import { ProfileVisibilityOptions } from "@/components/installer/profile/ProfileVisibilityOptions"
import { PremiumFeatures } from "@/components/installer/profile/PremiumFeatures"
import { BasicInfoSection } from "@/components/installer/profile/sections/BasicInfoSection"
import { SolarSpecificSection } from "@/components/installer/profile/sections/SolarSpecificSection"
import { InterventionZonesSection } from "./sections/InterventionZonesSection"
import { ProfileHeader } from "../profile/components/ProfileHeader"
import { useInstallerData } from "../profile/hooks/useInstallerData"
import { useInstallerForm } from "../profile/hooks/useInstallerForm"

export const ProfileSection = () => {
  const { formData, setFormData } = useInstallerData()
  const {
    handleChange,
    handleCheckboxChange,
    handleZonesChange,
    handleSubmit
  } = useInstallerForm(formData, setFormData)

  return (
    <div className="space-y-6">
      <ProfileHeader formData={formData} />
      <ProfileStats />

      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInfoSection formData={formData} handleChange={handleChange} />
        
        <SolarSpecificSection 
          formData={formData} 
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
        />

        <InterventionZonesSection
          selectedZones={formData.service_area}
          onZonesChange={handleZonesChange}
        />

        <Button 
          type="submit" 
          className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white"
        >
          Enregistrer les modifications
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PremiumFeatures />
        <ProfileVisibilityOptions 
          options={formData.visibility_settings || {
            showPhoneNumber: true,
            highlightProfile: false,
            acceptDirectMessages: true,
            showCertifications: true,
          }}
          onToggle={(field) => {
            setFormData({
              ...formData,
              visibility_settings: {
                ...formData.visibility_settings,
                [field]: !formData.visibility_settings?.[field]
              }
            })
          }}
        />
      </div>
    </div>
  )
}
import { Button } from "@/components/ui/button"
import { ProfileStats } from "@/components/installer/profile/ProfileStats"
import { BasicInfoSection } from "@/components/installer/profile/sections/BasicInfoSection"
import { SolarSpecificSection } from "@/components/installer/profile/sections/SolarSpecificSection"
import { InterventionZonesSection } from "@/components/installer/account/sections/InterventionZonesSection"
import { ProfileHeader } from "@/components/installer/profile/components/ProfileHeader"
import { useInstallerData } from "@/components/installer/profile/hooks/useInstallerData"
import { useInstallerForm } from "@/components/installer/profile/hooks/useInstallerForm"

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
    </div>
  )
}
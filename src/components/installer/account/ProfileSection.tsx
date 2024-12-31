import { Button } from "@/components/ui/button"
import { ProfileStats } from "@/components/installer/profile/ProfileStats"
import { ProfileVisibilityOptions } from "@/components/installer/profile/ProfileVisibilityOptions"
import { PremiumFeatures } from "@/components/installer/profile/PremiumFeatures"
import { BasicInfoSection } from "@/components/installer/profile/sections/BasicInfoSection"
import { SolarSpecificSection } from "@/components/installer/profile/sections/SolarSpecificSection"
import { InterventionZonesSection } from "./sections/InterventionZonesSection"
import { ProfileHeader } from "../profile/components/ProfileHeader"
import { useProfileForm } from "../profile/hooks/useProfileForm"

export const ProfileSection = () => {
  const {
    formData,
    visibilityOptions,
    handleChange,
    handleCheckboxChange,
    handleToggleChange,
    handleZonesChange,
    handleSubmit
  } = useProfileForm()

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
          options={visibilityOptions}
          onToggle={handleToggleChange}
        />
      </div>
    </div>
  )
}
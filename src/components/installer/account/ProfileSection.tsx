import { Button } from "@/components/ui/button"
import { ProfileStats } from "@/components/installer/profile/ProfileStats"
import { ProfileVisibilityOptions } from "@/components/installer/profile/ProfileVisibilityOptions"
import { PremiumFeatures } from "@/components/installer/profile/PremiumFeatures"
import { BasicInfoSection } from "@/components/installer/profile/sections/BasicInfoSection"
import { SolarSpecificSection } from "@/components/installer/profile/sections/SolarSpecificSection"
import { InterventionZonesSection } from "./sections/InterventionZonesSection"
import { ProfileHeader } from "../profile/components/ProfileHeader"
import { useProfileForm } from "../profile/hooks/useProfileForm"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

export const ProfileSection = () => {
  const { toast } = useToast()
  const {
    formData,
    visibilityOptions,
    handleChange,
    handleCheckboxChange,
    handleToggleChange,
    handleZonesChange,
    handleSubmit: originalHandleSubmit
  } = useProfileForm()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Get the current user's installer profile
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("User not found")

      const { data: installer, error: installerError } = await supabase
        .from('installers')
        .select()
        .eq('user_id', user.id)
        .single()

      if (installerError) throw installerError

      // Update the installer profile
      const { error: updateError } = await supabase
        .from('installers')
        .update({
          service_area: formData.service_area,
          // Add other fields you want to update
          company_name: formData.company,
          contact_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          website: formData.website,
          description: formData.description,
          experience_years: parseInt(formData.experience),
          panel_brands: formData.panelBrands.split(',').map(brand => brand.trim()),
          inverter_brands: formData.inverterBrands.split(',').map(brand => brand.trim()),
          warranty_years: parseInt(formData.guaranteeYears),
          certifications: formData.certifications,
          installation_types: formData.installationTypes,
          maintenance_services: formData.maintenanceServices
        })
        .eq('id', installer.id)

      if (updateError) throw updateError

      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès.",
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
        variant: "destructive"
      })
    }
  }

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
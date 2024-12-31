import { Button } from "@/components/ui/button"
import { ProfileHeader } from "./components/ProfileHeader"
import { ProfileStats } from "./ProfileStats"
import { CompanyInfoSection } from "./sections/CompanyInfoSection"
import { ProfileForm } from "./sections/ProfileForm"
import { CertificationsSection } from "./sections/CertificationsSection"
import { InstallationTypesSection } from "./sections/InstallationTypesSection"
import { InterventionZonesSection } from "../account/sections/InterventionZonesSection"
import { useInstallerData } from "./hooks/useInstallerData"
import { useInstallerForm } from "./hooks/useInstallerForm"

export const ProfilePage = () => {
  const { formData, setFormData, loading } = useInstallerData()
  const {
    handleChange,
    handleCheckboxChange,
    handleZonesChange,
    handleSubmit
  } = useInstallerForm(formData, setFormData)

  if (loading) {
    return <div>Chargement...</div>
  }

  return (
    <div className="space-y-6">
      <ProfileHeader formData={formData} />
      <ProfileStats />

      <form onSubmit={handleSubmit} className="space-y-6">
        <ProfileForm formData={formData} handleChange={handleChange} />
        
        <CompanyInfoSection formData={formData} handleChange={handleChange} />

        <CertificationsSection
          certifications={formData.certifications}
          handleCheckboxChange={handleCheckboxChange}
        />

        <InstallationTypesSection
          installation_types={formData.installation_types}
          maintenance_services={formData.maintenance_services}
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
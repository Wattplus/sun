import { Button } from "@/components/ui/button"
import { ProfileStats } from "@/components/installer/profile/ProfileStats"
import { BasicInfoSection } from "@/components/installer/profile/sections/BasicInfoSection"
import { SolarSpecificSection } from "@/components/installer/profile/sections/SolarSpecificSection"
import { InterventionZonesSection } from "./sections/InterventionZonesSection"
import { ProfileHeader } from "../profile/components/ProfileHeader"
import { useInstallerData } from "../profile/hooks/useInstallerData"
import { useInstallerForm } from "../profile/hooks/useInstallerForm"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export const ProfileSection = () => {
  const { formData, setFormData, loading, noProfile } = useInstallerData()
  const {
    handleChange,
    handleCheckboxChange,
    handleZonesChange,
    handleSubmit
  } = useInstallerForm(formData, setFormData)

  if (loading) {
    return <div>Chargement...</div>
  }

  if (!formData) {
    return (
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-yellow-500">
          <AlertCircle className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Profil non configuré</h2>
        </div>
        <p className="text-muted-foreground">
          Vous n'avez pas encore créé votre profil installateur. Veuillez remplir le formulaire ci-dessous pour commencer.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoSection formData={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            company: "",
            siret: "",
            website: "",
            description: ""
          }} handleChange={handleChange} />
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white"
          >
            Créer mon profil
          </Button>
        </form>
      </Card>
    )
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
    </div>
  )
}
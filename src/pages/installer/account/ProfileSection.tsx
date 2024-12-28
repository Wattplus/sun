import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/form/FormField"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { ProfileStats } from "@/components/installer/profile/ProfileStats"
import { ProfileVisibilityOptions } from "@/components/installer/profile/ProfileVisibilityOptions"
import { PremiumFeatures } from "@/components/installer/profile/PremiumFeatures"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export const ProfileSection = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    siret: "",
    website: "",
    description: "",
    // Champs spécifiques photovoltaïque
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false
    },
    experience: "",
    installationTypes: {
      residential: false,
      commercial: false,
      industrial: false
    },
    panelBrands: "",
    inverterBrands: "",
    guaranteeYears: "",
    maintenanceServices: false,
    interventionZones: "",
  })

  const [visibilityOptions, setVisibilityOptions] = useState({
    showPhoneNumber: true,
    highlightProfile: false,
    acceptDirectMessages: true,
    showCertifications: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (field.includes('.')) {
      const [category, item] = field.split('.')
      setFormData({
        ...formData,
        [category]: {
          ...formData[category],
          [item]: checked
        }
      })
    } else {
      setFormData({
        ...formData,
        [field]: checked
      })
    }
  }

  const handleToggleChange = (field: string, checked: boolean) => {
    setVisibilityOptions({
      ...visibilityOptions,
      [field]: checked,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      <ProfileStats />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-white/5 backdrop-blur-sm border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Prénom"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                lightMode
              />
              <FormField
                label="Nom"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                lightMode
              />
              <FormField
                label="Email"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                lightMode
              />
              <FormField
                label="Téléphone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+33 6 12 34 56 78"
                lightMode
              />
              <FormField
                label="Entreprise"
                id="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nom de votre entreprise"
                lightMode
              />
              <FormField
                label="SIRET"
                id="siret"
                value={formData.siret}
                onChange={handleChange}
                placeholder="123 456 789 00012"
                lightMode
              />
              <FormField
                label="Site web"
                id="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="www.monentreprise.fr"
                lightMode
              />
              <FormField
                label="Années d'expérience"
                id="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="10"
                lightMode
              />
              <FormField
                label="Marques de panneaux installés"
                id="panelBrands"
                value={formData.panelBrands}
                onChange={handleChange}
                placeholder="SunPower, LG, Panasonic..."
                lightMode
              />
              <FormField
                label="Marques d'onduleurs"
                id="inverterBrands"
                value={formData.inverterBrands}
                onChange={handleChange}
                placeholder="SMA, Fronius, Enphase..."
                lightMode
              />
              <FormField
                label="Garantie (années)"
                id="guaranteeYears"
                value={formData.guaranteeYears}
                onChange={handleChange}
                placeholder="20"
                lightMode
              />
              <FormField
                label="Zones d'intervention"
                id="interventionZones"
                value={formData.interventionZones}
                onChange={handleChange}
                placeholder="75, 92, 93, 94..."
                lightMode
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="qualiPV"
                    checked={formData.certifications.qualiPV}
                    onCheckedChange={(checked) => handleCheckboxChange('certifications.qualiPV', checked as boolean)}
                  />
                  <Label htmlFor="qualiPV" className="text-white">QualiPV</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rge"
                    checked={formData.certifications.rge}
                    onCheckedChange={(checked) => handleCheckboxChange('certifications.rge', checked as boolean)}
                  />
                  <Label htmlFor="rge" className="text-white">RGE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="qualibat"
                    checked={formData.certifications.qualibat}
                    onCheckedChange={(checked) => handleCheckboxChange('certifications.qualibat', checked as boolean)}
                  />
                  <Label htmlFor="qualibat" className="text-white">Qualibat</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Types d'installations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="residential"
                    checked={formData.installationTypes.residential}
                    onCheckedChange={(checked) => handleCheckboxChange('installationTypes.residential', checked as boolean)}
                  />
                  <Label htmlFor="residential" className="text-white">Résidentiel</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="commercial"
                    checked={formData.installationTypes.commercial}
                    onCheckedChange={(checked) => handleCheckboxChange('installationTypes.commercial', checked as boolean)}
                  />
                  <Label htmlFor="commercial" className="text-white">Commercial</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="industrial"
                    checked={formData.installationTypes.industrial}
                    onCheckedChange={(checked) => handleCheckboxChange('installationTypes.industrial', checked as boolean)}
                  />
                  <Label htmlFor="industrial" className="text-white">Industriel</Label>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="maintenanceServices"
                checked={formData.maintenanceServices}
                onCheckedChange={(checked) => handleCheckboxChange('maintenanceServices', checked as boolean)}
              />
              <Label htmlFor="maintenanceServices" className="text-white">
                Propose des services de maintenance et d'entretien
              </Label>
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Description de votre entreprise
              </label>
              <textarea
                className="w-full h-32 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus-visible:border-white p-3"
                placeholder="Décrivez votre entreprise, vos services et votre expertise..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Enregistrer les modifications
            </Button>
          </form>
        </Card>
      </motion.div>

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
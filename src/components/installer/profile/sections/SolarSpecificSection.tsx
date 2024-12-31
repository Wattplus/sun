import { FormField } from "@/components/form/FormField"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Sun } from "lucide-react"

interface SolarSpecificProps {
  formData: {
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
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (field: string, checked: boolean) => void;
}

export const SolarSpecificSection = ({ formData, handleChange, handleCheckboxChange }: SolarSpecificProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sun className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white">Informations photovoltaïques</h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <h4 className="text-lg font-semibold text-white">Certifications</h4>
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
            <h4 className="text-lg font-semibold text-white">Types d'installations</h4>
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
        </div>
      </Card>
    </motion.div>
  )
}
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { InstallerFormData } from "@/types/installer"

interface SolarSpecificSectionProps {
  formData: InstallerFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCheckboxChange: (field: string, checked: boolean) => void
}

export const SolarSpecificSection = ({
  formData,
  handleChange,
  handleCheckboxChange,
}: SolarSpecificSectionProps) => {
  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border">
      <h3 className="text-lg font-semibold">Informations spécifiques photovoltaïque</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="panelBrands">Marques de panneaux installés</Label>
          <Input
            id="panelBrands"
            value={formData.panelBrands}
            onChange={handleChange}
            placeholder="SunPower, LG, Panasonic..."
          />
        </div>

        <div>
          <Label htmlFor="inverterBrands">Marques d'onduleurs installés</Label>
          <Input
            id="inverterBrands"
            value={formData.inverterBrands}
            onChange={handleChange}
            placeholder="SMA, Enphase, Huawei..."
          />
        </div>

        <div>
          <Label htmlFor="guaranteeYears">Années de garantie proposées</Label>
          <Input
            id="guaranteeYears"
            type="number"
            value={formData.guaranteeYears}
            onChange={handleChange}
            placeholder="10"
          />
        </div>

        <div className="space-y-2">
          <Label>Types d'installations</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="residential"
                checked={formData.installationTypes.residential}
                onCheckedChange={(checked) => handleCheckboxChange("installationTypes.residential", checked as boolean)}
              />
              <Label htmlFor="residential">Résidentiel</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="commercial"
                checked={formData.installationTypes.commercial}
                onCheckedChange={(checked) => handleCheckboxChange("installationTypes.commercial", checked as boolean)}
              />
              <Label htmlFor="commercial">Commercial</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="industrial"
                checked={formData.installationTypes.industrial}
                onCheckedChange={(checked) => handleCheckboxChange("installationTypes.industrial", checked as boolean)}
              />
              <Label htmlFor="industrial">Industriel</Label>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="maintenanceServices"
            checked={formData.maintenanceServices}
            onCheckedChange={(checked) => handleCheckboxChange("maintenanceServices", checked as boolean)}
          />
          <Label htmlFor="maintenanceServices">Services de maintenance proposés</Label>
        </div>
      </div>
    </div>
  )
}
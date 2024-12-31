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
          <Label htmlFor="panel_brands">Marques de panneaux installés</Label>
          <Input
            id="panel_brands"
            value={formData.panel_brands.join(", ")}
            onChange={handleChange}
            placeholder="SunPower, LG, Panasonic..."
          />
        </div>

        <div>
          <Label htmlFor="inverter_brands">Marques d'onduleurs installés</Label>
          <Input
            id="inverter_brands"
            value={formData.inverter_brands.join(", ")}
            onChange={handleChange}
            placeholder="SMA, Enphase, Huawei..."
          />
        </div>

        <div>
          <Label htmlFor="warranty_years">Années de garantie proposées</Label>
          <Input
            id="warranty_years"
            type="number"
            value={formData.warranty_years}
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
                checked={formData.installation_types.residential}
                onCheckedChange={(checked) => handleCheckboxChange("installation_types.residential", checked as boolean)}
              />
              <Label htmlFor="residential">Résidentiel</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="commercial"
                checked={formData.installation_types.commercial}
                onCheckedChange={(checked) => handleCheckboxChange("installation_types.commercial", checked as boolean)}
              />
              <Label htmlFor="commercial">Commercial</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="industrial"
                checked={formData.installation_types.industrial}
                onCheckedChange={(checked) => handleCheckboxChange("installation_types.industrial", checked as boolean)}
              />
              <Label htmlFor="industrial">Industriel</Label>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="maintenance_services"
            checked={formData.maintenance_services}
            onCheckedChange={(checked) => handleCheckboxChange("maintenance_services", checked as boolean)}
          />
          <Label htmlFor="maintenance_services">Services de maintenance proposés</Label>
        </div>
      </div>
    </div>
  )
}
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lead } from "@/types/lead"

interface ProjectDetailsSectionProps {
  formData: Partial<Lead>
  setFormData: (data: Partial<Lead>) => void
}

export function ProjectDetailsSection({ formData, setFormData }: ProjectDetailsSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="monthlybill" className="text-sm font-medium">Facture mensuelle (€)</label>
        <Input
          id="monthlybill"
          value={formData.monthlybill || ""}
          onChange={(e) => setFormData({ ...formData, monthlybill: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="property_type" className="text-sm font-medium">Type de propriété</label>
        <Select
          value={formData.property_type}
          onValueChange={(value) => setFormData({ ...formData, property_type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez le type de propriété" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="maison">Maison individuelle</SelectItem>
            <SelectItem value="appartement">Appartement</SelectItem>
            <SelectItem value="local_commercial">Local commercial</SelectItem>
            <SelectItem value="terrain">Terrain</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="roof_type" className="text-sm font-medium">Type de toiture</label>
        <Select
          value={formData.roof_type}
          onValueChange={(value) => setFormData({ ...formData, roof_type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez le type de toiture" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tuiles">Tuiles</SelectItem>
            <SelectItem value="ardoises">Ardoises</SelectItem>
            <SelectItem value="tole">Tôle</SelectItem>
            <SelectItem value="terrasse">Terrasse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="roof_surface" className="text-sm font-medium">Surface de toiture (m²)</label>
        <Input
          id="roof_surface"
          type="number"
          value={formData.roof_surface || ""}
          onChange={(e) => setFormData({ ...formData, roof_surface: parseFloat(e.target.value) })}
        />
      </div>

      <div>
        <label htmlFor="annual_consumption" className="text-sm font-medium">Consommation annuelle (kWh)</label>
        <Input
          id="annual_consumption"
          type="number"
          value={formData.annual_consumption || ""}
          onChange={(e) => setFormData({ ...formData, annual_consumption: parseInt(e.target.value) })}
        />
      </div>
    </div>
  )
}
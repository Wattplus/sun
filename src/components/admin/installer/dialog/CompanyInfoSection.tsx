import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CompanyInfoSectionProps {
  formData: {
    siret: string
    siren: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function CompanyInfoSection({ formData, onChange }: CompanyInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="siret">SIRET</Label>
        <Input
          id="siret"
          value={formData.siret || ""}
          onChange={onChange}
          className="bg-background border-input"
          placeholder="123 456 789 00012"
        />
      </div>
      <div>
        <Label htmlFor="siren">SIREN</Label>
        <Input
          id="siren"
          value={formData.siren || ""}
          onChange={onChange}
          className="bg-background border-input"
          placeholder="123 456 789"
        />
      </div>
    </div>
  )
}
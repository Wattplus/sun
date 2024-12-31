import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Installer } from "@/types/crm"

interface CompanyInfoSectionProps {
  formData: Installer
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export function CompanyInfoSection({ formData, onChange, error }: CompanyInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="siret">SIRET</Label>
        <Input
          id="siret"
          value={formData.siret}
          onChange={onChange}
          className={`bg-background border-input ${error ? 'border-red-500' : ''}`}
          placeholder="123 456 789 00012"
        />
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
      <div>
        <Label htmlFor="siren">SIREN</Label>
        <Input
          id="siren"
          value={formData.siren}
          onChange={onChange}
          className="bg-background border-input"
          placeholder="123 456 789"
        />
      </div>
    </div>
  )
}
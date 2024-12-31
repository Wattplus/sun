import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Installer } from "@/types/crm"

interface CertificationsSectionProps {
  certifications: Installer['certifications']
  onCertificationChange: (certification: keyof Installer['certifications'], checked: boolean) => void
}

export function CertificationsSection({ certifications, onCertificationChange }: CertificationsSectionProps) {
  return (
    <div className="space-y-4">
      <Label>Certifications</Label>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="qualiPV"
            checked={certifications?.qualiPV}
            onCheckedChange={(checked) => onCertificationChange('qualiPV', checked as boolean)}
          />
          <Label htmlFor="qualiPV">QualiPV</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rge"
            checked={certifications?.rge}
            onCheckedChange={(checked) => onCertificationChange('rge', checked as boolean)}
          />
          <Label htmlFor="rge">RGE</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="qualibat"
            checked={certifications?.qualibat}
            onCheckedChange={(checked) => onCertificationChange('qualibat', checked as boolean)}
          />
          <Label htmlFor="qualibat">Qualibat</Label>
        </div>
      </div>
    </div>
  )
}
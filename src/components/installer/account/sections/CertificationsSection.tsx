import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Award } from "lucide-react"

interface CertificationsSectionProps {
  certifications: {
    qualiPV: boolean;
    rge: boolean;
    qualibat: boolean;
  };
  handleCheckboxChange: (field: string, checked: boolean) => void;
}

export const CertificationsSection = ({ certifications, handleCheckboxChange }: CertificationsSectionProps) => {
  return (
    <Card className="p-6 space-y-6 glass-card bg-background-dark">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Award className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-white">Certifications</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="qualiPV"
            checked={certifications.qualiPV}
            onCheckedChange={(checked) => handleCheckboxChange('certifications.qualiPV', checked as boolean)}
            className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
          <Label htmlFor="qualiPV" className="text-white">QualiPV</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rge"
            checked={certifications.rge}
            onCheckedChange={(checked) => handleCheckboxChange('certifications.rge', checked as boolean)}
            className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
          <Label htmlFor="rge" className="text-white">RGE</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="qualibat"
            checked={certifications.qualibat}
            onCheckedChange={(checked) => handleCheckboxChange('certifications.qualibat', checked as boolean)}
            className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          />
          <Label htmlFor="qualibat" className="text-white">Qualibat</Label>
        </div>
      </div>
    </Card>
  )
}
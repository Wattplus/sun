import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Award } from "lucide-react"
import { motion } from "framer-motion"
import { ProfileFormData } from "../hooks/useProfileForm"

interface CertificationsSectionProps {
  certifications: ProfileFormData['certifications'];
  handleCheckboxChange: (field: string, checked: boolean) => void;
}

export const CertificationsSection = ({ certifications, handleCheckboxChange }: CertificationsSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3 mb-4">
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
            />
            <Label htmlFor="qualiPV" className="text-white">QualiPV</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rge"
              checked={certifications.rge}
              onCheckedChange={(checked) => handleCheckboxChange('certifications.rge', checked as boolean)}
            />
            <Label htmlFor="rge" className="text-white">RGE</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="qualibat"
              checked={certifications.qualibat}
              onCheckedChange={(checked) => handleCheckboxChange('certifications.qualibat', checked as boolean)}
            />
            <Label htmlFor="qualibat" className="text-white">Qualibat</Label>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
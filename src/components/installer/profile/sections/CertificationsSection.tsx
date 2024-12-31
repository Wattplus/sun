import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Award } from "lucide-react"
import { motion } from "framer-motion"

interface CertificationsSectionProps {
  certifications: {
    qualiPV: boolean;
    rge: boolean;
    qualibat: boolean;
  };
  handleCheckboxChange: (field: string, checked: boolean) => void;
}

export const CertificationsSection = ({
  certifications,
  handleCheckboxChange,
}: CertificationsSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6 bg-white p-6 rounded-lg shadow"
    >
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Certifications</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="certifications.qualiPV"
            checked={certifications.qualiPV}
            onCheckedChange={(checked) => handleCheckboxChange('certifications.qualiPV', checked as boolean)}
          />
          <Label htmlFor="certifications.qualiPV">QualiPV</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="certifications.rge"
            checked={certifications.rge}
            onCheckedChange={(checked) => handleCheckboxChange('certifications.rge', checked as boolean)}
          />
          <Label htmlFor="certifications.rge">RGE</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="certifications.qualibat"
            checked={certifications.qualibat}
            onCheckedChange={(checked) => handleCheckboxChange('certifications.qualibat', checked as boolean)}
          />
          <Label htmlFor="certifications.qualibat">Qualibat</Label>
        </div>
      </div>
    </motion.div>
  )
}
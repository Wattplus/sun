import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"
import { motion } from "framer-motion"

interface InstallationTypesSectionProps {
  installationTypes: {
    residential: boolean;
    commercial: boolean;
    industrial: boolean;
  };
  maintenanceServices: boolean;
  handleCheckboxChange: (field: string, checked: boolean) => void;
}

export const InstallationTypesSection = ({ 
  installationTypes, 
  maintenanceServices, 
  handleCheckboxChange 
}: InstallationTypesSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white">Types d'installations</h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="residential"
                checked={installationTypes.residential}
                onCheckedChange={(checked) => handleCheckboxChange('installationTypes.residential', checked as boolean)}
              />
              <Label htmlFor="residential" className="text-white">Résidentiel</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="commercial"
                checked={installationTypes.commercial}
                onCheckedChange={(checked) => handleCheckboxChange('installationTypes.commercial', checked as boolean)}
              />
              <Label htmlFor="commercial" className="text-white">Commercial</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="industrial"
                checked={installationTypes.industrial}
                onCheckedChange={(checked) => handleCheckboxChange('installationTypes.industrial', checked as boolean)}
              />
              <Label htmlFor="industrial" className="text-white">Industriel</Label>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="maintenanceServices"
              checked={maintenanceServices}
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
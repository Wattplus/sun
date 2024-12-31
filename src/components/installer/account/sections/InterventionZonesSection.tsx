import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Combobox } from "@/components/ui/combobox"
import { frenchDepartments } from "@/utils/frenchDepartments"

interface InterventionZonesSectionProps {
  selectedZones: string[]
  onZonesChange: (zones: string[]) => void
}

export const InterventionZonesSection = ({
  selectedZones,
  onZonesChange,
}: InterventionZonesSectionProps) => {
  const [isNationwide, setIsNationwide] = useState(selectedZones.includes("Toute France"))

  const handleNationwideChange = (checked: boolean) => {
    setIsNationwide(checked)
    if (checked) {
      onZonesChange(["Toute France"])
    } else {
      onZonesChange([])
    }
  }

  const handleZoneSelect = (code: string) => {
    if (!isNationwide) {
      const newZones = selectedZones.includes(code)
        ? selectedZones.filter(zone => zone !== code)
        : [...selectedZones, code]
      onZonesChange(newZones)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-white">Zones d'intervention</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="nationwide"
              checked={isNationwide}
              onCheckedChange={handleNationwideChange}
            />
            <Label htmlFor="nationwide" className="text-white">Toute France</Label>
          </div>

          {!isNationwide && (
            <div className="space-y-4">
              <Label className="text-white">
                Sélectionnez vos départements d'intervention
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {frenchDepartments.map((dept) => (
                  <div key={dept.code} className="flex items-center space-x-2">
                    <Switch
                      id={`dept-${dept.code}`}
                      checked={selectedZones.includes(dept.code)}
                      onCheckedChange={() => handleZoneSelect(dept.code)}
                      disabled={isNationwide}
                    />
                    <Label 
                      htmlFor={`dept-${dept.code}`}
                      className="text-white text-sm"
                    >
                      {dept.code} - {dept.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
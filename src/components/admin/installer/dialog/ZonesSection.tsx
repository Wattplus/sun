import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ZonesSectionProps {
  isNationwide: boolean
  zones: string[]
  onNationwideChange: (checked: boolean) => void
  onZonesChange: (value: string) => void
}

export function ZonesSection({ 
  isNationwide, 
  zones, 
  onNationwideChange, 
  onZonesChange 
}: ZonesSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="nationwide"
          checked={isNationwide}
          onCheckedChange={onNationwideChange}
        />
        <Label htmlFor="nationwide">Toute France</Label>
      </div>
      {!isNationwide && (
        <div>
          <Label htmlFor="zones">
            Zones d'intervention (séparées par des virgules)
          </Label>
          <Input
            id="zones"
            value={zones.join(", ")}
            onChange={(e) => onZonesChange(e.target.value)}
            className="bg-background border-input"
            placeholder="75, 92, 93..."
            disabled={isNationwide}
          />
        </div>
      )}
    </div>
  )
}
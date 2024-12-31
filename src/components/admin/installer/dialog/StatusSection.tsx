import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InstallerStatus } from "@/types/crm"

interface StatusSectionProps {
  status: InstallerStatus
  onStatusChange: (value: string) => void
}

export function StatusSection({ status, onStatusChange }: StatusSectionProps) {
  return (
    <div>
      <Label htmlFor="status">Statut</Label>
      <Select
        value={status}
        onValueChange={onStatusChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez un statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Actif</SelectItem>
          <SelectItem value="inactive">Inactif</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
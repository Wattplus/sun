import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Lead, LeadStatus, VerificationStatus } from "@/types/lead"

interface StatusSectionProps {
  formData: Partial<Lead>
  setFormData: (data: Partial<Lead>) => void
}

export function StatusSection({ formData, setFormData }: StatusSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="quality_score" className="text-sm font-medium">Score qualité</label>
        <Input
          id="quality_score"
          type="number"
          min="0"
          max="100"
          value={formData.quality_score || ""}
          onChange={(e) => setFormData({ ...formData, quality_score: parseInt(e.target.value) })}
        />
      </div>

      <div>
        <label htmlFor="verification_status" className="text-sm font-medium">Statut de vérification</label>
        <Select
          value={formData.verification_status}
          onValueChange={(value: VerificationStatus) => setFormData({ ...formData, verification_status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="verified">Vérifié</SelectItem>
            <SelectItem value="invalid">Invalide</SelectItem>
            <SelectItem value="duplicate">Doublon</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="status" className="text-sm font-medium">Statut</label>
        <Select
          value={formData.status}
          onValueChange={(value: LeadStatus) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">Nouveau</SelectItem>
            <SelectItem value="contacted">Contacté</SelectItem>
            <SelectItem value="qualified">Qualifié</SelectItem>
            <SelectItem value="assigned">Assigné</SelectItem>
            <SelectItem value="converted">Converti</SelectItem>
            <SelectItem value="lost">Perdu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="notes" className="text-sm font-medium">Notes</label>
        <Textarea
          id="notes"
          value={formData.notes || ""}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>
    </div>
  )
}
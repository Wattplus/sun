import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Lead, LeadStatus, VerificationStatus } from "@/types/lead"
import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EditLeadDialogProps {
  lead: Lead | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (lead: Lead) => void
}

export function EditLeadDialog({ lead, open, onOpenChange, onSave }: EditLeadDialogProps) {
  const [formData, setFormData] = useState<Partial<Lead>>(lead || {});

  useEffect(() => {
    if (lead) {
      setFormData(lead)
    }
  }, [lead])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (lead && formData) {
      onSave({ ...lead, ...formData })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifier le lead</DialogTitle>
            <DialogDescription>
              Modifiez les informations du lead ici. Cliquez sur sauvegarder une fois terminé.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label htmlFor="clienttype" className="text-sm font-medium">Type de client</label>
              <Select
                value={formData.clienttype}
                onValueChange={(value) => setFormData({ ...formData, clienttype: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type de client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="particulier">Particulier</SelectItem>
                  <SelectItem value="professionnel">Professionnel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstname" className="text-sm font-medium">Prénom</label>
                <Input
                  id="firstname"
                  value={formData.firstname || ""}
                  onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="lastname" className="text-sm font-medium">Nom</label>
                <Input
                  id="lastname"
                  value={formData.lastname || ""}
                  onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="address" className="text-sm font-medium">Adresse</label>
              <Input
                id="address"
                value={formData.address || ""}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="postalcode" className="text-sm font-medium">Code postal</label>
                <Input
                  id="postalcode"
                  value={formData.postalcode || ""}
                  onChange={(e) => setFormData({ ...formData, postalcode: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="city" className="text-sm font-medium">Ville</label>
                <Input
                  id="city"
                  value={formData.city || ""}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="monthlybill" className="text-sm font-medium">Facture mensuelle (€)</label>
              <Input
                id="monthlybill"
                value={formData.monthlybill || ""}
                onChange={(e) => setFormData({ ...formData, monthlybill: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="property_type" className="text-sm font-medium">Type de propriété</label>
              <Select
                value={formData.property_type}
                onValueChange={(value) => setFormData({ ...formData, property_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type de propriété" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maison">Maison individuelle</SelectItem>
                  <SelectItem value="appartement">Appartement</SelectItem>
                  <SelectItem value="local_commercial">Local commercial</SelectItem>
                  <SelectItem value="terrain">Terrain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="roof_type" className="text-sm font-medium">Type de toiture</label>
              <Select
                value={formData.roof_type}
                onValueChange={(value) => setFormData({ ...formData, roof_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type de toiture" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tuiles">Tuiles</SelectItem>
                  <SelectItem value="ardoises">Ardoises</SelectItem>
                  <SelectItem value="tole">Tôle</SelectItem>
                  <SelectItem value="terrasse">Terrasse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="roof_surface" className="text-sm font-medium">Surface de toiture (m²)</label>
              <Input
                id="roof_surface"
                type="number"
                value={formData.roof_surface || ""}
                onChange={(e) => setFormData({ ...formData, roof_surface: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <label htmlFor="annual_consumption" className="text-sm font-medium">Consommation annuelle (kWh)</label>
              <Input
                id="annual_consumption"
                type="number"
                value={formData.annual_consumption || ""}
                onChange={(e) => setFormData({ ...formData, annual_consumption: parseInt(e.target.value) })}
              />
            </div>

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
          <DialogFooter>
            <Button type="submit">Sauvegarder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
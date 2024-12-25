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
import { Lead, LeadStatus } from "@/types/crm"
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
  const [formData, setFormData] = useState<Partial<Lead>>(lead || {})

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
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifier le lead</DialogTitle>
            <DialogDescription>
              Modifiez les informations du lead ici. Cliquez sur sauvegarder une fois terminé.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="text-sm font-medium">
                  Prénom
                </label>
                <Input
                  id="firstName"
                  value={formData.firstName || ""}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="text-sm font-medium">
                  Nom
                </label>
                <Input
                  id="lastName"
                  value={formData.lastName || ""}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium">
                Téléphone
              </label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="address" className="text-sm font-medium">
                Adresse
              </label>
              <Input
                id="address"
                value={formData.address || ""}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="postalCode" className="text-sm font-medium">
                  Code postal
                </label>
                <Input
                  id="postalCode"
                  value={formData.postalCode || ""}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="city" className="text-sm font-medium">
                  Ville
                </label>
                <Input
                  id="city"
                  value={formData.city || ""}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="projectType" className="text-sm font-medium">
                Type de projet photovoltaïque
              </label>
              <Select
                value={formData.projectType}
                onValueChange={(value) => setFormData({ ...formData, projectType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type de projet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Résidentiel</SelectItem>
                  <SelectItem value="professional">Professionnel / Industriel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="status" className="text-sm font-medium">
                Statut
              </label>
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
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
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
  )
}
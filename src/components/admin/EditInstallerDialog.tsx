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
import { Installer, InstallerStatus } from "@/types/crm"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EditInstallerDialogProps {
  installer: Installer | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (installer: Installer) => void
}

export function EditInstallerDialog({
  installer,
  open,
  onOpenChange,
  onSave,
}: EditInstallerDialogProps) {
  const [formData, setFormData] = useState<Partial<Installer>>(installer || {})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (installer && formData) {
      onSave({ ...installer, ...formData })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifier l'installateur</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'installateur ici. Cliquez sur sauvegarder une fois terminé.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label htmlFor="companyName" className="text-sm font-medium">
                Nom de l'entreprise
              </label>
              <Input
                id="companyName"
                value={formData.companyName || ""}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="contactName" className="text-sm font-medium">
                Nom du contact
              </label>
              <Input
                id="contactName"
                value={formData.contactName || ""}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              />
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
            <div>
              <label htmlFor="zones" className="text-sm font-medium">
                Zones d'intervention (séparées par des virgules)
              </label>
              <Input
                id="zones"
                value={formData.zones?.join(", ") || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    zones: e.target.value.split(",").map((zone) => zone.trim()),
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="status" className="text-sm font-medium">
                Statut
              </label>
              <Select
                value={formData.status}
                onValueChange={(value: InstallerStatus) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="commission" className="text-sm font-medium">
                Commission (%)
              </label>
              <Input
                id="commission"
                type="number"
                value={formData.commission || ""}
                onChange={(e) =>
                  setFormData({ ...formData, commission: Number(e.target.value) })
                }
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
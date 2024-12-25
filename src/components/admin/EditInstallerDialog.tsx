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
import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

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
  const [formData, setFormData] = useState<Partial<Installer>>(installer || {
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false
    }
  })
  const [isNationwide, setIsNationwide] = useState(false)

  useEffect(() => {
    if (installer) {
      const nationwide = installer.zones.includes("Toute France")
      setIsNationwide(nationwide)
      setFormData(installer)
    }
  }, [installer])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (installer && formData) {
      let zones = isNationwide ? ["Toute France"] : formData.zones || []
      if (!isNationwide && formData.zones) {
        zones = formData.zones.filter(zone => zone !== "Toute France")
      }
      onSave({ ...installer, ...formData, zones })
      onOpenChange(false)
    }
  }

  const handleZonesChange = (value: string) => {
    if (!isNationwide) {
      const zones = value.split(",").map((zone) => zone.trim()).filter(Boolean)
      setFormData({ ...formData, zones })
    }
  }

  const handleNationwideChange = (checked: boolean) => {
    setIsNationwide(checked)
    if (checked) {
      setFormData({ ...formData, zones: ["Toute France"] })
    } else {
      setFormData({ ...formData, zones: [] })
    }
  }

  const handleCertificationChange = (certification: keyof Installer['certifications'], checked: boolean) => {
    setFormData({
      ...formData,
      certifications: {
        ...formData.certifications,
        [certification]: checked
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-md border-primary/20">
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
                className="bg-background border-input"
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
                className="bg-background border-input"
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
                className="bg-background border-input"
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
                className="bg-background border-input"
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
                className="bg-background border-input"
              />
            </div>

            <div>
              <label htmlFor="siret" className="text-sm font-medium">
                SIRET
              </label>
              <Input
                id="siret"
                value={formData.siret || ""}
                onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                className="bg-background border-input"
                placeholder="123 456 789 00012"
              />
            </div>

            <div>
              <label htmlFor="siren" className="text-sm font-medium">
                SIREN
              </label>
              <Input
                id="siren"
                value={formData.siren || ""}
                onChange={(e) => setFormData({ ...formData, siren: e.target.value })}
                className="bg-background border-input"
                placeholder="123 456 789"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="nationwide"
                  checked={isNationwide}
                  onCheckedChange={handleNationwideChange}
                />
                <Label htmlFor="nationwide">Toute France</Label>
              </div>
              {!isNationwide && (
                <div>
                  <label htmlFor="zones" className="text-sm font-medium">
                    Zones d'intervention (séparées par des virgules)
                  </label>
                  <Input
                    id="zones"
                    value={formData.zones?.join(", ") || ""}
                    onChange={(e) => handleZonesChange(e.target.value)}
                    className="bg-background border-input"
                    placeholder="75, 92, 93..."
                    disabled={isNationwide}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">
                Certifications
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="qualiPV"
                    checked={formData.certifications?.qualiPV}
                    onCheckedChange={(checked) => handleCertificationChange('qualiPV', checked as boolean)}
                  />
                  <label htmlFor="qualiPV" className="text-sm">
                    QualiPV
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rge"
                    checked={formData.certifications?.rge}
                    onCheckedChange={(checked) => handleCertificationChange('rge', checked as boolean)}
                  />
                  <label htmlFor="rge" className="text-sm">
                    RGE
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="qualibat"
                    checked={formData.certifications?.qualibat}
                    onCheckedChange={(checked) => handleCertificationChange('qualibat', checked as boolean)}
                  />
                  <label htmlFor="qualibat" className="text-sm">
                    Qualibat
                  </label>
                </div>
              </div>
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
          </div>
          <DialogFooter>
            <Button type="submit">
              Sauvegarder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
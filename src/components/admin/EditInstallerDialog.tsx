import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Installer } from "@/types/crm"
import { useState, useEffect } from "react"
import { BasicInfoSection } from "./installer/dialog/BasicInfoSection"
import { CompanyInfoSection } from "./installer/dialog/CompanyInfoSection"
import { ZonesSection } from "./installer/dialog/ZonesSection"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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
    if (formData) {
      let zones = isNationwide ? ["Toute France"] : formData.zones || []
      if (!isNationwide && formData.zones) {
        zones = formData.zones.filter(zone => zone !== "Toute France")
      }
      onSave({ ...installer, ...formData, zones } as Installer)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
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
      <DialogContent className="max-w-[600px] max-h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-md border-primary/20">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifier l'installateur</DialogTitle>
            <DialogDescription>
              Modifiez les informations de l'installateur ici. Cliquez sur sauvegarder une fois terminé.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <BasicInfoSection formData={formData} onChange={handleChange} />
            <CompanyInfoSection formData={formData} onChange={handleChange} />
            
            <ZonesSection
              isNationwide={isNationwide}
              zones={formData.zones || []}
              onNationwideChange={handleNationwideChange}
              onZonesChange={handleZonesChange}
            />

            <div className="space-y-4">
              <Label>Certifications</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="qualiPV"
                    checked={formData.certifications?.qualiPV}
                    onCheckedChange={(checked) => handleCertificationChange('qualiPV', checked as boolean)}
                  />
                  <Label htmlFor="qualiPV">QualiPV</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rge"
                    checked={formData.certifications?.rge}
                    onCheckedChange={(checked) => handleCertificationChange('rge', checked as boolean)}
                  />
                  <Label htmlFor="rge">RGE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="qualibat"
                    checked={formData.certifications?.qualibat}
                    onCheckedChange={(checked) => handleCertificationChange('qualibat', checked as boolean)}
                  />
                  <Label htmlFor="qualibat">Qualibat</Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
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
            <Button type="submit" className="w-full sm:w-auto">
              Sauvegarder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
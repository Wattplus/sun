import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Installer, InstallerStatus } from "@/types/crm"
import { useState, useEffect } from "react"
import { BasicInfoSection } from "./installer/dialog/BasicInfoSection"
import { CompanyInfoSection } from "./installer/dialog/CompanyInfoSection"
import { ZonesSection } from "./installer/dialog/ZonesSection"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { transformInstallerToDatabase } from "@/utils/installerTransform"

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
  const [formData, setFormData] = useState<Installer>(installer || {
    id: "",
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    zones: [],
    status: "active" as InstallerStatus, // Changed default to "active"
    commission: 0,
    leadsAssigned: 0,
    conversionRate: 0,
    paymentType: "prepaid",
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false
    },
    yearFounded: new Date().getFullYear().toString(),
    siret: "",
    siren: ""
  })
  const [isNationwide, setIsNationwide] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (installer) {
      const nationwide = installer.zones.includes("Toute France")
      setIsNationwide(nationwide)
      setFormData(installer)
    }
  }, [installer])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const dbData = transformInstallerToDatabase(formData)
      
      const { error } = await supabase
        .from('installers')
        .upsert({ 
          ...dbData,
          user_id: formData.id, // Add user_id field
          verified: true, // Ensure verified is true
          status: "active" // Ensure status is active
        })
        .select()
        .single()

      if (error) throw error

      toast.success("Modifications enregistrées avec succès")
      onSave(formData)
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving installer:', error)
      toast.error("Erreur lors de l'enregistrement des modifications")
    } finally {
      setIsSaving(false)
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

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value as InstallerStatus })
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
              zones={formData.zones}
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
                onValueChange={handleStatusChange}
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
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full sm:w-auto"
              disabled={isSaving}
            >
              {isSaving ? "Enregistrement..." : "Sauvegarder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
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
import { CertificationsSection } from "./installer/dialog/CertificationsSection"
import { StatusSection } from "./installer/dialog/StatusSection"
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
    id: crypto.randomUUID(),
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    zones: [],
    status: "active" as InstallerStatus,
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
  const [siretError, setSiretError] = useState("")

  useEffect(() => {
    const fetchInstallerData = async () => {
      if (installer?.id) {
        try {
          const { data, error } = await supabase
            .from('installers')
            .select('*')
            .eq('id', installer.id)
            .single()

          if (error) throw error

          if (data) {
            const nationwide = data.service_area?.includes("Toute France")
            setIsNationwide(nationwide)
            setFormData({
              ...installer,
              zones: data.service_area || [],
              certifications: data.certifications || {
                qualiPV: false,
                rge: false,
                qualibat: false
              }
            })
          }
        } catch (error) {
          console.error('Error fetching installer data:', error)
          toast.error("Erreur lors du chargement des données")
        }
      }
      setSiretError("")
    }

    fetchInstallerData()
  }, [installer])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSiretError("")

    try {
      const dbData = transformInstallerToDatabase(formData)
      
      const { error } = await supabase
        .from('installers')
        .upsert({ 
          ...dbData,
          user_id: formData.id,
          verified: true,
          status: "active"
        })

      if (error) {
        console.error('Database error:', error)
        if (error.message?.includes("installers_siret_unique")) {
          setSiretError("Ce numéro SIRET est déjà utilisé par un autre installateur")
          setIsSaving(false)
          return
        }
        throw error
      }

      toast.success("Modifications enregistrées avec succès")
      onSave(formData)
      onOpenChange(false)
    } catch (error: any) {
      console.error('Error saving installer:', error)
      if (!siretError) {
        toast.error("Erreur lors de l'enregistrement des modifications")
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiretError("")
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
            <CompanyInfoSection 
              formData={formData} 
              onChange={handleChange} 
              error={siretError}
            />
            
            <ZonesSection
              isNationwide={isNationwide}
              zones={formData.zones}
              onNationwideChange={handleNationwideChange}
              onZonesChange={handleZonesChange}
            />

            <CertificationsSection 
              certifications={formData.certifications}
              onCertificationChange={handleCertificationChange}
            />

            <StatusSection 
              status={formData.status}
              onStatusChange={handleStatusChange}
            />
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
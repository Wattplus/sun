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
import { BasicInfoSection } from "./installer/dialog/BasicInfoSection"
import { CompanyInfoSection } from "./installer/dialog/CompanyInfoSection"
import { ZonesSection } from "./installer/dialog/ZonesSection"
import { CertificationsSection } from "./installer/dialog/CertificationsSection"
import { StatusSection } from "./installer/dialog/StatusSection"
import { useInstallerForm } from "./installer/dialog/useInstallerForm"
import { useInstallerSubmit } from "./installer/dialog/useInstallerSubmit"

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
  const {
    formData,
    isNationwide,
    siretError,
    setSiretError,
    handleChange,
    handleZonesChange,
    handleNationwideChange,
    handleCertificationChange,
    handleStatusChange
  } = useInstallerForm(installer)

  const { isSaving, handleSubmit } = useInstallerSubmit(onSave, onOpenChange)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-md border-primary/20">
        <form onSubmit={(e) => handleSubmit(e, formData, setSiretError)}>
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
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Lead } from "@/types/lead"
import { useState, useEffect } from "react"
import { ClientInfoSection } from "./leads/form-sections/ClientInfoSection"
import { AddressSection } from "./leads/form-sections/AddressSection"
import { ProjectDetailsSection } from "./leads/form-sections/ProjectDetailsSection"
import { StatusSection } from "./leads/form-sections/StatusSection"

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
          
          <div className="grid gap-6 py-4">
            <ClientInfoSection formData={formData} setFormData={setFormData} />
            <AddressSection formData={formData} setFormData={setFormData} />
            <ProjectDetailsSection formData={formData} setFormData={setFormData} />
            <StatusSection formData={formData} setFormData={setFormData} />
          </div>

          <DialogFooter>
            <Button type="submit">Sauvegarder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
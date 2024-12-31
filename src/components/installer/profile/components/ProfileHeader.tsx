import { Card } from "@/components/ui/card"
import type { InstallerFormData } from "@/types/installer"

export interface ProfileHeaderProps {
  formData: InstallerFormData
}

export const ProfileHeader = ({ formData }: ProfileHeaderProps) => {
  return (
    <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {formData.company_name || "Nom de l'entreprise"}
          </h2>
          <p className="text-muted-foreground mt-1">
            {formData.description || "Description de l'entreprise"}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-muted-foreground">
            Contact: {formData.contact_name || ''}
          </p>
          <p className="text-sm text-muted-foreground">
            {formData.phone || ''}
          </p>
        </div>
      </div>
    </Card>
  )
}
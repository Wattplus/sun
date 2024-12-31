import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BasicInfoSectionProps {
  formData: {
    companyName: string
    contactName: string
    email: string
    phone: string
    address: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function BasicInfoSection({ formData, onChange }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="companyName">Nom de l'entreprise</Label>
        <Input
          id="companyName"
          value={formData.companyName || ""}
          onChange={onChange}
          className="bg-background border-input"
        />
      </div>
      <div>
        <Label htmlFor="contactName">Nom du contact</Label>
        <Input
          id="contactName"
          value={formData.contactName || ""}
          onChange={onChange}
          className="bg-background border-input"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email || ""}
          onChange={onChange}
          className="bg-background border-input"
        />
      </div>
      <div>
        <Label htmlFor="phone">Téléphone</Label>
        <Input
          id="phone"
          value={formData.phone || ""}
          onChange={onChange}
          className="bg-background border-input"
        />
      </div>
      <div>
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          value={formData.address || ""}
          onChange={onChange}
          className="bg-background border-input"
        />
      </div>
    </div>
  )
}
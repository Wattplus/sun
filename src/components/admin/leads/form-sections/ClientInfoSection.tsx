import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Lead } from "@/types/lead"

interface ClientInfoSectionProps {
  formData: Partial<Lead>
  setFormData: (data: Partial<Lead>) => void
}

export function ClientInfoSection({ formData, setFormData }: ClientInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="clienttype" className="text-sm font-medium">Type de client</label>
        <Select
          value={formData.clienttype}
          onValueChange={(value) => setFormData({ ...formData, clienttype: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez le type de client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="particulier">Particulier</SelectItem>
            <SelectItem value="professionnel">Professionnel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstname" className="text-sm font-medium">Prénom</label>
          <Input
            id="firstname"
            value={formData.firstname || ""}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="lastname" className="text-sm font-medium">Nom</label>
          <Input
            id="lastname"
            value={formData.lastname || ""}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <Input
          id="email"
          type="email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
        <Input
          id="phone"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
    </div>
  )
}
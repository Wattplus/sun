import { Input } from "@/components/ui/input"
import { Lead } from "@/types/lead"

interface AddressSectionProps {
  formData: Partial<Lead>
  setFormData: (data: Partial<Lead>) => void
}

export function AddressSection({ formData, setFormData }: AddressSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="address" className="text-sm font-medium">Adresse</label>
        <Input
          id="address"
          value={formData.address || ""}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="postalcode" className="text-sm font-medium">Code postal</label>
          <Input
            id="postalcode"
            value={formData.postalcode || ""}
            onChange={(e) => setFormData({ ...formData, postalcode: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="city" className="text-sm font-medium">Ville</label>
          <Input
            id="city"
            value={formData.city || ""}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
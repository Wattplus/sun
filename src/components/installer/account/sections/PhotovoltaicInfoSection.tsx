import { FormField } from "@/components/form/FormField"
import { Card } from "@/components/ui/card"
import { Sun } from "lucide-react"

interface PhotovoltaicInfoProps {
  formData: {
    experience: string;
    panelBrands: string;
    inverterBrands: string;
    guaranteeYears: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PhotovoltaicInfoSection = ({ formData, handleChange }: PhotovoltaicInfoProps) => {
  return (
    <Card className="p-6 space-y-6 bg-[#0B1623] border-primary/20">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sun className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-white">Informations photovoltaïques</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Années d'expérience"
          id="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="10"
          lightMode
        />
        <FormField
          label="Marques de panneaux installés"
          id="panelBrands"
          value={formData.panelBrands}
          onChange={handleChange}
          placeholder="SunPower, LG, Panasonic..."
          lightMode
        />
        <FormField
          label="Marques d'onduleurs"
          id="inverterBrands"
          value={formData.inverterBrands}
          onChange={handleChange}
          placeholder="SMA, Fronius, Enphase..."
          lightMode
        />
        <FormField
          label="Garantie (années)"
          id="guaranteeYears"
          value={formData.guaranteeYears}
          onChange={handleChange}
          placeholder="20"
          lightMode
        />
      </div>
    </Card>
  )
}
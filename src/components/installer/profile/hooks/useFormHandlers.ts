import { type InstallerFormData, type VisibilityOptions } from "../types/installer"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export const useFormHandlers = (
  formData: InstallerFormData,
  setFormData: (data: InstallerFormData) => void,
  visibilityOptions: VisibilityOptions,
  setVisibilityOptions: (options: VisibilityOptions) => void
) => {
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (field.includes('.')) {
      const [category, item] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...(prev[category as keyof typeof prev] as Record<string, boolean>),
          [item]: checked
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: checked
      }))
    }
  }

  const handleToggleChange = (field: keyof VisibilityOptions) => {
    setVisibilityOptions(prev => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleZonesChange = (zones: string[]) => {
    setFormData(prev => ({
      ...prev,
      service_area: zones
    }))
  }

  return {
    handleChange,
    handleCheckboxChange,
    handleToggleChange,
    handleZonesChange,
  }
}
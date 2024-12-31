import { type InstallerFormData, type VisibilityOptions } from "../types/installer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useFormHandlers = (
  formData: InstallerFormData,
  setFormData: (data: InstallerFormData) => void,
  visibilityOptions: VisibilityOptions,
  setVisibilityOptions: (options: VisibilityOptions) => void
) => {
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (field.includes('.')) {
      const [category, item] = field.split('.');
      setFormData({
        ...formData,
        [category]: {
          ...(formData[category as keyof InstallerFormData] as Record<string, boolean>),
          [item]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: checked
      });
    }
  };

  const handleToggleChange = (field: keyof VisibilityOptions) => {
    setVisibilityOptions({
      ...visibilityOptions,
      [field]: !visibilityOptions[field],
    });
  };

  const handleZonesChange = (zones: string[]) => {
    setFormData({
      ...formData,
      service_area: zones
    });
  };

  return {
    handleChange,
    handleCheckboxChange,
    handleToggleChange,
    handleZonesChange,
  };
};
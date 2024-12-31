import { useState } from "react";
import { InstallerFormData, defaultFormData } from "@/types/installer";

export const useProfileFormState = (initialData?: Partial<InstallerFormData>) => {
  const [formData, setFormData] = useState<InstallerFormData>({
    ...defaultFormData,
    ...initialData
  });

  const [visibilitySettings, setVisibilitySettings] = useState(formData.visibility_settings);

  return {
    formData,
    setFormData,
    visibilitySettings,
    setVisibilitySettings
  };
};
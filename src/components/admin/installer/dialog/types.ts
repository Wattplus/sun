import { Installer, InstallerStatus } from "@/types/crm"

export interface DatabaseCertifications {
  qualiPV: boolean
  rge: boolean
  qualibat: boolean
}

export interface InstallerFormState {
  formData: Installer
  isNationwide: boolean
  siretError: string
}

export interface UseInstallerFormReturn extends InstallerFormState {
  setFormData: (data: Installer) => void
  setSiretError: (error: string) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleZonesChange: (value: string) => void
  handleNationwideChange: (checked: boolean) => void
  handleCertificationChange: (certification: keyof Installer['certifications'], checked: boolean) => void
  handleStatusChange: (value: string) => void
}
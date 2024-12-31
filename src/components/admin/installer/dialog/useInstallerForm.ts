import { useState, useEffect } from "react"
import { Installer } from "@/types/crm"
import { defaultFormData } from "./defaultValues"
import { fetchInstallerData, processInstallerData } from "./formUtils"
import type { UseInstallerFormReturn } from "./types"

export const useInstallerForm = (installer: Installer | null): UseInstallerFormReturn => {
  const [formData, setFormData] = useState<Installer>(installer || defaultFormData)
  const [isNationwide, setIsNationwide] = useState(false)
  const [siretError, setSiretError] = useState("")

  useEffect(() => {
    const initializeForm = async () => {
      if (installer?.id) {
        try {
          const data = await fetchInstallerData(installer.id)
          if (data) {
            const { nationwide, formData: processedData } = processInstallerData(data, installer)
            setIsNationwide(nationwide)
            setFormData(processedData)
          }
        } catch (error) {
          console.error('Error initializing form:', error)
        }
      }
      setSiretError("")
    }

    initializeForm()
  }, [installer])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiretError("")
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleZonesChange = (value: string) => {
    if (!isNationwide) {
      const zones = value.split(",").map((zone) => zone.trim()).filter(Boolean)
      setFormData({ ...formData, zones })
    }
  }

  const handleNationwideChange = (checked: boolean) => {
    setIsNationwide(checked)
    setFormData({
      ...formData,
      zones: checked ? ["Toute France"] : []
    })
  }

  const handleCertificationChange = (
    certification: keyof Installer['certifications'],
    checked: boolean
  ) => {
    setFormData({
      ...formData,
      certifications: {
        ...formData.certifications,
        [certification]: checked
      }
    })
  }

  const handleStatusChange = (value: string) => {
    setFormData({ ...formData, status: value as Installer["status"] })
  }

  return {
    formData,
    setFormData,
    isNationwide,
    siretError,
    setSiretError,
    handleChange,
    handleZonesChange,
    handleNationwideChange,
    handleCertificationChange,
    handleStatusChange
  }
}
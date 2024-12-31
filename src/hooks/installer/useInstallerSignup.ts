import { useState } from "react"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface InstallerSignupData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  companyName: string
  phone: string
  siret: string
  address: string
  postalCode: string
  city: string
}

export const useInstallerSignup = () => {
  const [loading, setLoading] = useState(false)
  const [userExists, setUserExists] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleSignup = async (formData: InstallerSignupData) => {
    setLoading(true)
    setUserExists(false)

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas")
      }

      // 1. Créer l'utilisateur avec auth.signUp
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      })

      if (authError) {
        if (authError.message.includes("already registered")) {
          setUserExists(true)
          throw new Error("Un compte existe déjà avec cette adresse email")
        }
        throw authError
      }

      if (!authData.user) throw new Error("Erreur lors de la création du compte")

      // 2. Attendre que l'utilisateur soit créé dans la table users et profiles
      await new Promise(resolve => setTimeout(resolve, 5000))

      // 3. Créer l'entrée dans la table installers
      const { error: installerError } = await supabase
        .from("installers")
        .insert([
          {
            user_id: authData.user.id,
            company_name: formData.companyName,
            contact_name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            siret: formData.siret,
            address: formData.address,
            postal_code: formData.postalCode,
            city: formData.city,
            verified: false,
            credits: 0,
            service_area: [],
            certifications: {
              qualiPV: false,
              rge: false,
              qualibat: false,
            },
            installation_types: {
              residential: false,
              commercial: false,
              industrial: false,
            },
            maintenance_services: false,
            visibility_settings: {
              showPhoneNumber: true,
              highlightProfile: false,
              acceptDirectMessages: true,
              showCertifications: true,
            },
          },
        ])
        .select()
        .single()

      if (installerError) {
        console.error("Installer creation error:", installerError)
        throw new Error("Erreur lors de la création du profil installateur")
      }

      toast.success("Compte créé avec succès !")
      setShowSuccessDialog(true)
    } catch (error: any) {
      console.error("Signup error:", error)
      toast.error(error.message || "Erreur lors de la création du compte")
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    userExists,
    showSuccessDialog,
    setShowSuccessDialog,
    handleSignup
  }
}
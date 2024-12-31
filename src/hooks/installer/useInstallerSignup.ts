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
      // Vérifier si le SIRET existe déjà
      const { data: existingInstaller } = await supabase
        .from('installers')
        .select('id')
        .eq('siret', formData.siret)
        .single()

      if (existingInstaller) {
        toast.error("Ce numéro SIRET est déjà utilisé par un autre installateur")
        return
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas")
      }

      // 1. Create user with auth.signUp
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: 'installer'
          }
        }
      })

      if (authError) {
        if (authError.message.includes("User already registered")) {
          setUserExists(true)
          return
        }
        throw authError
      }

      if (!authData.user) throw new Error("Erreur lors de la création du compte")

      // 2. Wait for profile to be created by the trigger
      let attempts = 0
      let profileFound = false
      while (attempts < 10 && !profileFound) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', authData.user.id)
          .maybeSingle()
        
        if (profile) {
          profileFound = true
          break
        }
        await new Promise(resolve => setTimeout(resolve, 500))
        attempts++
      }

      if (!profileFound) {
        throw new Error("Erreur lors de la création du profil")
      }

      // 3. Update profile role to installer
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'installer' })
        .eq('id', authData.user.id)

      if (profileError) throw profileError

      // 4. Create installer entry with verified = true
      const { error: installerError } = await supabase
        .from("installers")
        .insert({
          user_id: authData.user.id,
          company_name: formData.companyName,
          contact_name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          siret: formData.siret,
          address: formData.address,
          postal_code: formData.postalCode,
          city: formData.city,
          verified: true,
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
          status: 'active'
        })

      if (installerError) {
        console.error("Installer creation error:", installerError)
        throw new Error("Erreur lors de la création du profil installateur")
      }

      toast.success("Compte créé avec succès !")
      setShowSuccessDialog(true)
    } catch (error: any) {
      console.error("Signup error:", error)
      if (!userExists) {
        toast.error(error.message || "Erreur lors de la création du compte")
      }
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
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { InstallerFormFields } from "./form/InstallerFormFields"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export const SignupForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [userExists, setUserExists] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    companyName: "",
    phone: "",
    siret: "",
    address: "",
    postalCode: "",
    city: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
    if (e.target.id === "email") {
      setUserExists(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setUserExists(false)

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas")
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        if (authError.message.includes("already registered")) {
          setUserExists(true)
          throw new Error("Un compte existe déjà avec cette adresse email")
        }
        throw authError
      }
      
      if (!authData.user) throw new Error("Erreur lors de la création du compte")

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

      if (installerError) throw installerError

      toast.success("Compte créé avec succès !")
      setShowSuccessDialog(true)
    } catch (error: any) {
      console.error("Signup error:", error)
      toast.error(error.message || "Erreur lors de la création du compte")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20">
        {userExists && (
          <Alert className="mb-6 bg-primary/5 border-primary/20">
            <AlertDescription className="text-primary">
              Un compte existe déjà avec cette adresse email.{" "}
              <Button 
                variant="link" 
                className="p-0 text-primary hover:text-primary-light h-auto font-semibold"
                onClick={() => navigate("/connexion-installateur")}
              >
                Se connecter
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InstallerFormFields formData={formData} handleChange={handleChange} />

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 py-6 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Création en cours..." : "Créer mon compte"}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Déjà inscrit ?
          </p>
          <Button
            variant="outline"
            className="w-full bg-white/5 hover:bg-white/10 border-primary/20 text-primary hover:text-primary-light transition-all duration-300"
            onClick={() => navigate("/connexion-installateur")}
          >
            Se connecter à mon espace
          </Button>
        </div>

        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Compte créé avec succès !</DialogTitle>
              <DialogDescription className="space-y-4 pt-4">
                <p>
                  Votre compte a été créé avec succès. Voici vos identifiants de connexion :
                </p>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p><strong>Email :</strong> {formData.email}</p>
                  <p><strong>Mot de passe :</strong> Celui que vous avez choisi</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Conservez ces informations précieusement. Vous en aurez besoin pour vous connecter à votre espace installateur.
                </p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-center">
              <Button
                type="button"
                className="w-full sm:w-auto"
                onClick={() => navigate("/connexion-installateur")}
              >
                Aller à la page de connexion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </motion.div>
  )
}
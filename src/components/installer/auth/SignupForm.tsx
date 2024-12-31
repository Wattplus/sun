import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import { InstallerFormFields } from "./form/InstallerFormFields"
import { SuccessDialog } from "./SuccessDialog"
import { useInstallerSignup } from "@/hooks/installer/useInstallerSignup"

export const SignupForm = () => {
  const navigate = useNavigate()
  const { loading, userExists, showSuccessDialog, setShowSuccessDialog, handleSignup } = useInstallerSignup()
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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSignup(formData)
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

        <SuccessDialog 
          open={showSuccessDialog} 
          onOpenChange={setShowSuccessDialog}
          email={formData.email}
        />
      </Card>
    </motion.div>
  )
}
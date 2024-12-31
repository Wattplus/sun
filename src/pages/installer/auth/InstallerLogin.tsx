import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function InstallerLogin() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log("[InstallerLogin] Attempting login...")

    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      if (!session) {
        throw new Error("No session after login")
      }

      console.log("[InstallerLogin] Login successful, checking installer status...")

      // Fetch installer profile
      const { data: installer, error: installerError } = await supabase
        .from('installers')
        .select('id, verified')
        .eq('user_id', session.user.id)
        .single()

      if (installerError) {
        throw installerError
      }

      if (!installer) {
        console.error("[InstallerLogin] User is not an installer")
        await supabase.auth.signOut()
        toast.error("Accès non autorisé - Compte installateur non trouvé")
        return
      }

      if (!installer.verified) {
        console.error("[InstallerLogin] Installer not verified")
        await supabase.auth.signOut()
        toast.error("Votre compte n'est pas encore vérifié")
        return
      }

      console.log("[InstallerLogin] Installer found and verified, redirecting to dashboard...")
      toast.success("Connexion réussie")
      navigate("/espace-installateur")

    } catch (error: any) {
      console.error("[InstallerLogin] Error during login:", error)
      toast.error(error.message || "Erreur lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background/95 to-background/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="w-full max-w-md p-8 space-y-6 bg-card/50 backdrop-blur-sm border-primary/20">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-primary">Espace Installateur</h1>
            <p className="text-muted-foreground">
              Connectez-vous à votre espace installateur
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votreemail@exemple.com"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Pas encore inscrit ?
            </p>
            <Button
              variant="outline"
              className="w-full bg-white/5 hover:bg-white/10 border-primary/20"
              onClick={() => navigate("/devenir-installateur")}
            >
              Devenir installateur
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
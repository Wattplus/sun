import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase-client"
import { toast } from "sonner"

export const InstallerLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

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

      // Fetch user profile to check role
      const { data: installer } = await supabase
        .from('installers')
        .select('id')
        .eq('user_id', session.user.id)
        .single()

      if (installer) {
        console.log("[InstallerLogin] Installer found, redirecting to dashboard...")
        toast.success("Connexion réussie")
        navigate("/espace-installateur")
      } else {
        console.error("[InstallerLogin] User is not an installer")
        toast.error("Accès non autorisé")
        await supabase.auth.signOut()
        navigate("/connexion-installateur")
      }
    } catch (error: any) {
      console.error("[InstallerLogin] Error during login:", error)
      toast.error(error.message || "Erreur lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background-dark to-primary-dark">
      <Helmet>
        <title>Connexion Installateur - Solar Pro</title>
      </Helmet>

      <Card className="w-full max-w-md p-8 space-y-6 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-white">Espace Installateur</h1>
          <p className="text-primary-light/80">
            Accédez à votre espace installateur
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="comparateurpanneausolaire@gmail.com"
              className="bg-background/50 border-primary/20 text-white placeholder:text-primary-light/50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-white">
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background/50 border-primary/20 text-white"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-light text-white"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="text-center text-sm">
          <a href="/forgot-password" className="text-primary-light hover:underline">
            Mot de passe oublié ?
          </a>
        </div>

        <div className="text-center text-sm">
          <p className="text-white/80">
            Pas encore inscrit ?{" "}
            <a href="/devenir-installateur" className="text-primary-light hover:underline">
              Devenir installateur
            </a>
          </p>
        </div>
      </Card>
    </div>
  )
}
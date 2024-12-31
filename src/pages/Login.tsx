import { Helmet } from "react-helmet"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { supabase } from "@/lib/supabase-client"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "sonner"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const isInstallerLogin = location.pathname === '/connexion-installateur'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Fetch user profile to check role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session?.user.id)
        .single()

      if (isInstallerLogin) {
        // Check if user is an installer
        const { data: installer } = await supabase
          .from('installers')
          .select('id')
          .eq('user_id', session?.user.id)
          .single()

        if (installer) {
          toast.success("Connexion réussie")
          navigate("/espace-installateur")
        } else {
          toast.error("Accès non autorisé")
          await supabase.auth.signOut()
        }
      } else {
        // Admin login logic
        if (profile?.role === 'admin' || profile?.role === 'super_admin') {
          toast.success("Connexion admin réussie")
          navigate("/admin/leads")
        } else {
          toast.error("Accès non autorisé")
          await supabase.auth.signOut()
        }
      }
    } catch (error: any) {
      console.error("Error logging in:", error)
      toast.error(error.message || "Erreur lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background-dark to-primary-dark">
      <Helmet>
        <title>{isInstallerLogin ? "Connexion Installateur" : "Connexion Admin"} - Solar Pro</title>
      </Helmet>

      <Card className="w-full max-w-md p-8 space-y-6 bg-background/50 backdrop-blur-sm border-primary/20">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-white">
            {isInstallerLogin ? "Espace Installateur" : "Connexion Admin"}
          </h1>
          <p className="text-primary-light/80">
            {isInstallerLogin 
              ? "Accédez à votre espace installateur"
              : "Accédez à votre espace administrateur"
            }
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
              placeholder="email@example.com"
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
      </Card>
    </div>
  )
}
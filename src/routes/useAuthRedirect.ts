import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase-client"
import { toast } from "sonner"

export const useAuthRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkInitialAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) {
          console.log("No session found")
          return
        }

        // Vérifier si l'utilisateur est un installateur
        const { data: installer } = await supabase
          .from('installers')
          .select()
          .eq('user_id', session.user.id)
          .maybeSingle()

        if (installer) {
          console.log("Installer found, redirecting to installer dashboard")
          navigate('/espace-installateur')
          return
        }

        // Vérifier le rôle dans la table profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle()

        if (!profile) {
          console.error("No profile found for user:", session.user.id)
          return
        }

        // Redirection basée sur le rôle
        if (profile.role === 'admin' || profile.role === 'super_admin') {
          navigate('/admin/leads')
        } else {
          navigate('/')
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        toast.error("Erreur lors de la vérification de l'authentification")
      }
    }

    checkInitialAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id)
      
      if (event === 'SIGNED_IN' && session) {
        try {
          // Vérifier d'abord si l'utilisateur est un installateur
          const { data: installer } = await supabase
            .from('installers')
            .select()
            .eq('user_id', session.user.id)
            .maybeSingle()

          if (installer) {
            console.log("Installer found, redirecting to installer dashboard")
            navigate('/espace-installateur')
            return
          }

          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .maybeSingle()

          if (!profile) {
            console.error("No profile found for user:", session.user.id)
            return
          }

          // Redirection basée sur le rôle
          if (profile.role === 'admin' || profile.role === 'super_admin') {
            navigate('/admin/leads')
          } else {
            navigate('/')
          }
        } catch (error) {
          console.error("Error handling auth change:", error)
          toast.error("Erreur lors du changement d'authentification")
        }
      } else if (event === 'SIGNED_OUT') {
        navigate('/login')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])
}
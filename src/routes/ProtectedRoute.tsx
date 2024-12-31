import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string[]
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [hasRequiredRole, setHasRequiredRole] = useState<boolean | null>(null)
  const location = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setIsAuthenticated(false)
        return
      }

      setIsAuthenticated(true)

      if (requiredRole) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle()

        setHasRequiredRole(profile?.role && requiredRole.includes(profile.role))
      } else {
        setHasRequiredRole(true)
      }
    }

    checkAuth()
  }, [requiredRole])

  if (isAuthenticated === null || hasRequiredRole === null) {
    return <div>Chargement...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!hasRequiredRole) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
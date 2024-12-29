import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  isAdminLogin?: boolean;
}

export const Login = ({ isAdminLogin = false }: LoginProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        try {
          // Vérifier si l'utilisateur est un admin
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (error) throw error;

          if (isAdminLogin) {
            if (profile?.role === 'admin' || profile?.role === 'super_admin') {
              navigate("/admin");
            } else {
              // Si ce n'est pas un admin, déconnexion et redirection
              await supabase.auth.signOut();
              toast({
                title: "Accès refusé",
                description: "Vous n'avez pas les droits d'administration nécessaires.",
                variant: "destructive",
              });
              navigate("/");
            }
          } else {
            // Pour une connexion normale, redirection vers le dashboard
            navigate("/dashboard");
          }
        } catch (error) {
          console.error('Auth check error:', error);
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de la vérification de l'authentification.",
            variant: "destructive",
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, isAdminLogin, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background/80 to-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isAdminLogin ? "Connexion Administrateur" : "Connexion"}
          </h2>
          {isAdminLogin && (
            <p className="mt-2 text-center text-sm text-gray-400">
              Accès réservé aux administrateurs
            </p>
          )}
        </div>
        <div className="mt-8">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                  },
                },
              },
              className: {
                container: 'w-full',
                button: 'w-full',
                input: 'w-full',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Adresse email',
                  password_label: 'Mot de passe',
                  button_label: 'Se connecter',
                },
              },
            }}
            theme="dark"
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
};
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase-client";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profile?.role === 'admin' || profile?.role === 'super_admin') {
            toast.success("Connexion réussie en tant qu'administrateur");
            navigate("/admin");
          } else {
            toast.success("Connexion réussie");
            navigate("/espace-installateur");
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          toast.error("Erreur lors de la vérification du rôle");
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-card/50 backdrop-blur-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="text-muted-foreground">
            Connectez-vous à votre compte pour accéder à votre espace
          </p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'rgb(var(--primary))',
                  brandAccent: 'rgb(var(--primary))',
                }
              }
            }
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email',
                password_label: 'Mot de passe',
                button_label: 'Se connecter',
                loading_button_label: 'Connexion en cours...',
                social_provider_text: 'Se connecter avec {{provider}}',
                link_text: 'Vous avez déjà un compte ? Connectez-vous',
              },
              sign_up: {
                email_label: 'Email',
                password_label: 'Mot de passe',
                button_label: "S'inscrire",
                loading_button_label: 'Inscription en cours...',
                social_provider_text: "S'inscrire avec {{provider}}",
                link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
              },
            },
          }}
          theme="light"
          providers={[]}
        />
      </Card>
    </div>
  );
};

export default Login;
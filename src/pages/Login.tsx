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
          console.log("Vérification de l'authentification...");
          console.log("ID utilisateur:", session.user.id);
          console.log("Page de connexion admin:", isAdminLogin);

          // Récupérer le profil utilisateur avec le rôle
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Erreur lors de la récupération du profil:', profileError);
            throw profileError;
          }

          console.log("Données du profil:", profile);
          console.log("Rôle utilisateur:", profile?.role);

          const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';
          console.log("Est administrateur:", isAdmin);

          if (isAdminLogin) {
            if (isAdmin) {
              console.log("Connexion admin réussie - redirection vers /admin");
              toast({
                title: "Connexion réussie",
                description: "Bienvenue dans l'interface administrateur",
              });
              navigate("/admin");
            } else {
              console.log("Utilisateur non-admin tentant d'accéder à l'interface admin");
              await supabase.auth.signOut();
              toast({
                title: "Accès refusé",
                description: "Vous n'avez pas les droits d'administration nécessaires.",
                variant: "destructive",
              });
              navigate("/admin/login");
            }
          } else {
            if (isAdmin) {
              console.log("Utilisateur admin sur login standard - redirection vers /admin");
              navigate("/admin");
            } else {
              console.log("Connexion utilisateur standard - redirection vers /dashboard");
              navigate("/dashboard");
            }
          }
        } catch (error) {
          console.error('Erreur de vérification:', error);
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de la vérification de l'authentification.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          navigate(isAdminLogin ? "/admin/login" : "/login");
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
                sign_up: {
                  email_label: 'Adresse email',
                  password_label: 'Mot de passe',
                  button_label: "S'inscrire",
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
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase-client";

export const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background-light flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Bienvenue sur WattPlus
          </h1>
          <p className="text-primary/80">
            Connectez-vous pour accéder à votre espace
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 p-6 shadow-xl">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#1EAEDB',
                    brandAccent: '#0FA0CE',
                  },
                },
              },
              className: {
                container: 'w-full',
                button: 'w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors',
                input: 'w-full bg-white/10 border-white/20 text-white rounded-md',
                label: 'text-white/80',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Adresse email',
                  password_label: 'Mot de passe',
                  button_label: 'Se connecter',
                  loading_button_label: 'Connexion en cours...',
                  social_provider_text: 'Continuer avec {{provider}}',
                  link_text: "Vous avez déjà un compte ? Connectez-vous",
                },
                sign_up: {
                  email_label: 'Adresse email',
                  password_label: 'Mot de passe',
                  button_label: "S'inscrire",
                  loading_button_label: 'Inscription en cours...',
                  social_provider_text: 'Continuer avec {{provider}}',
                  link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                },
                magic_link: {
                  email_input_label: 'Adresse email',
                  button_label: 'Envoyer le lien magique',
                  loading_button_label: 'Envoi du lien magique...',
                  link_text: 'Envoyer un lien magique',
                },
                forgotten_password: {
                  email_label: 'Adresse email',
                  password_label: 'Mot de passe',
                  button_label: 'Réinitialiser le mot de passe',
                  loading_button_label: 'Réinitialisation en cours...',
                  link_text: 'Mot de passe oublié ?',
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
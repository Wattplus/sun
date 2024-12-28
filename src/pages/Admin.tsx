import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      email === "comparateurpanneausolaire@gmail.com" &&
      password === "Hanna77026@"
    ) {
      setIsLoggedIn(true);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'interface d'administration",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Administration - Gestion des Installations Solaires</title>
        <meta name="description" content="Interface d'administration pour la gestion des projets d'installation solaire et le suivi des clients." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Administration - Gestion des Installations Solaires" />
        <meta property="og:description" content="Plateforme administrative pour la gestion des projets solaires et le suivi client." />
        <meta property="og:type" content="website" />
      </Helmet>

      {isLoggedIn ? <Outlet /> : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background-dark to-background-light">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel w-full max-w-md p-8 space-y-6"
          >
            <h1 className="text-2xl font-bold text-center gradient-text mb-8">
              Connexion Administrateur
            </h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-white/90">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="votre@email.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-white/90">
                  Mot de passe
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="••••••••"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full glass-button hover:scale-105 transition-transform"
              >
                Se connecter
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Admin;

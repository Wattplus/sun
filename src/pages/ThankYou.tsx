import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background-light to-primary/20 p-4">
      <div className="glass-panel max-w-2xl w-full space-y-8 p-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold gradient-text">
            Merci pour votre demande !
          </h2>
          <p className="text-lg text-gray-200">
            Un de nos partenaires experts vous recontactera très prochainement pour étudier votre projet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary mb-4">À propos de nous</h3>
            
            <div className="flex items-center space-x-3 text-gray-200">
              <Phone className="h-5 w-5 text-primary" />
              <span>09 77 77 41 64</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-200">
              <Mail className="h-5 w-5 text-primary" />
              <span>mikael@wattplus.org</span>
            </div>
            
            <div className="space-y-2 mt-4 text-gray-200">
              <p>Expert en installations photovoltaïques depuis 2010.</p>
              <p>Certifié QualiPV et RGE.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary mb-4">Prochaines étapes</h3>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start space-x-2">
                <span className="text-primary">1.</span>
                <span>Analyse de votre demande par nos experts</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">2.</span>
                <span>Contact sous 24-48h pour un premier échange</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary">3.</span>
                <span>Étude personnalisée de votre projet</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate("/")}
            className="glass-button"
          >
            Retourner à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
}
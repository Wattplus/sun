import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Merci pour votre demande !
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Un de nos partenaires experts vous recontactera très prochainement pour étudier votre projet.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate("/")}
            className="w-full"
          >
            Retourner à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
}
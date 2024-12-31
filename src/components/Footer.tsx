import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-background p-4">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © 2023 Votre Entreprise. Tous droits réservés.
        </p>
        <Link 
          to="/devenir-installateur" 
          className="text-sm font-semibold text-blue-400"
        >
          Espace installateur
        </Link>
      </div>
    </footer>
  );
};

import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; 2024 WattPlus. Tous droits réservés.
          </p>
        </div>
        <div className="flex justify-center space-x-6 md:order-2">
          <Link to="/mentions-legales" className="text-xs leading-5 text-gray-400 hover:text-gray-300">
            Mentions légales
          </Link>
          <Link to="/confidentialite" className="text-xs leading-5 text-gray-400 hover:text-gray-300">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
};
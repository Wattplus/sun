import { Link } from "react-router-dom";
import { Mail, Phone, Sun, User, Key, MessageSquare, ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0B1221] text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sun className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">WattPlus</span>
            </div>
            <p className="text-sm text-gray-400">
              Expert en installations photovoltaïques depuis 2010.<br />
              Certifié QualiPV et RGE.
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-2">
              <a href="mailto:mikael@wattplus.org" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                mikael@wattplus.org
              </a>
              <a href="tel:0977774164" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                09 77 77 41 64
              </a>
              <div className="mt-6 space-y-2">
                <p className="text-sm font-semibold">UNE QUESTION ?</p>
                <p className="text-xs">Contactez-nous gratuitement</p>
                <a href="tel:0977774164" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                  09 77 77 41 64
                </a>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#why-solar" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <Sun className="h-4 w-4" />
                  Pourquoi le solaire
                </Link>
              </li>
              <li>
                <Link to="/#process" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <ArrowRight className="h-4 w-4" />
                  Notre processus
                </Link>
              </li>
              <li>
                <Link to="/#testimonials" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <MessageSquare className="h-4 w-4" />
                  Témoignages
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Space Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Espace Client</h3>
            <div className="space-y-4">
              <Link to="/client" className="block space-y-2">
                <div className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  <User className="h-4 w-4" />
                  <span>Accéder à mon espace</span>
                </div>
                <p className="text-xs text-gray-400">
                  Identifiant admin: ADMIN-2024-001<br />
                  <span className="flex items-center gap-1">
                    <Key className="h-3 w-3" />
                    Mot de passe: WattPlus2024
                  </span>
                </p>
              </Link>
              <div className="pt-2 border-t border-gray-800">
                <p className="text-xs text-gray-400">
                  Suivez l'avancement de votre projet<br />
                  et accédez à vos documents
                </p>
              </div>
            </div>
          </div>

          {/* Pro Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Espace pro</h3>
            <div className="space-y-4">
              <Link to="/espace-installateur" className="block">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-blue-400">Espace installateur</p>
                  <p className="text-xs text-gray-400">Accédez à notre réseau de leads qualifiés</p>
                </div>
              </Link>
              <Link to="/admin" className="block">
                <p className="text-sm text-gray-400 hover:text-white transition-colors">
                  Administration
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © 2024 WattPlus. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <Link to="/mentions-legales" className="text-xs text-gray-500 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <span className="text-gray-700">•</span>
              <Link to="/confidentialite" className="text-xs text-gray-500 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
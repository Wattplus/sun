import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">À propos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/qui-sommes-nous" className="text-muted-foreground hover:text-primary">
                  Qui sommes-nous
                </Link>
              </li>
              <li>
                <Link to="/notre-mission" className="text-muted-foreground hover:text-primary">
                  Notre mission
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/installation-solaire" className="text-muted-foreground hover:text-primary">
                  Installation solaire
                </Link>
              </li>
              <li>
                <Link to="/maintenance" className="text-muted-foreground hover:text-primary">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link to="/financement" className="text-muted-foreground hover:text-primary">
                  Solutions de financement
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Espace pro</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/devenir-installateur" className="text-muted-foreground hover:text-primary">
                  Devenir installateur
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary">
                  Connexion installateur
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-primary">
                  Connexion admin
                </Link>
              </li>
              <li>
                <Link to="/tarifs" className="text-muted-foreground hover:text-primary">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="tel:0123456789" className="text-muted-foreground hover:text-primary">
                  01 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 Solar Pro. Tous droits réservés.
            </p>
            <div className="flex space-x-4">
              <Link to="/mentions-legales" className="text-sm text-muted-foreground hover:text-primary">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="text-sm text-muted-foreground hover:text-primary">
                Politique de confidentialité
              </Link>
              <Link to="/cgv" className="text-sm text-muted-foreground hover:text-primary">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

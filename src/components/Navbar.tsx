import { Button } from "./ui/button";
import { Phone, Menu, X, Sun, User, UserCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-accent/20 backdrop-blur-md border-b border-white/10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Sun className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold gradient-text">WattPlus</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-16">
            <div className="flex items-center space-x-12">
              <a href="#why-solar" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">
                Pourquoi le solaire
              </a>
              <a href="#process" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">
                Notre processus
              </a>
              <a href="#testimonials" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">
                Témoignages
              </a>
            </div>

            <div className="flex items-center space-x-8">
              <Link 
                to="/client" 
                className="flex items-center text-sm font-medium text-blue-100 hover:text-primary transition-colors"
              >
                <User className="w-4 h-4 mr-2" />
                Mon compte
              </Link>
              <Link 
                to="/espace-installateur" 
                className="flex items-center text-sm font-medium text-blue-100 hover:text-primary transition-colors"
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Compte installateur
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              <Button 
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="glass-button text-sm font-medium"
              >
                Demander une étude
              </Button>
              <a 
                href="tel:0977774164" 
                className="flex items-center text-sm font-medium text-blue-100 hover:text-primary transition-colors group"
              >
                <Phone className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                09 77 77 41 64
              </a>
            </div>
          </div>

          <button 
            className="md:hidden text-white hover:text-primary transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="glass-panel p-6 mt-2 space-y-6">
              <a 
                href="#why-solar" 
                className="block text-sm font-medium text-blue-100 hover:text-primary transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                Pourquoi le solaire
              </a>
              <a 
                href="#process" 
                className="block text-sm font-medium text-blue-100 hover:text-primary transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                Notre processus
              </a>
              <a 
                href="#testimonials" 
                className="block text-sm font-medium text-blue-100 hover:text-primary transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                Témoignages
              </a>
              <Link 
                to="/client" 
                className="flex items-center text-sm font-medium text-blue-100 hover:text-primary transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4 mr-2" />
                Mon compte
              </Link>
              <Link 
                to="/espace-installateur" 
                className="flex items-center text-sm font-medium text-blue-100 hover:text-primary transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Compte installateur
              </Link>
              <Button 
                onClick={() => {
                  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="glass-button w-full text-sm font-medium"
              >
                Demander une étude
              </Button>
              <a 
                href="tel:0977774164" 
                className="flex items-center text-sm font-medium text-blue-100 hover:text-primary transition-colors group"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                09 77 77 41 64
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
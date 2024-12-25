import { Button } from "./ui/button";
import { Phone, Menu, X, Sun, User, UserCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Sun className="h-8 w-8 text-white mr-2" />
            <span className="text-2xl font-bold text-white">WattPlus</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#why-solar" className="text-blue-100 hover:text-white transition-colors">
              Pourquoi le solaire
            </a>
            <a href="#process" className="text-blue-100 hover:text-white transition-colors">
              Notre processus
            </a>
            <a href="#testimonials" className="text-blue-100 hover:text-white transition-colors">
              Témoignages
            </a>
            <div className="flex items-center space-x-4">
              <Link to="/client" className="flex items-center text-blue-100 hover:text-white transition-colors">
                <User className="w-4 h-4 mr-2" />
                Mon compte
              </Link>
              <Link to="/espace-installateur" className="flex items-center text-blue-100 hover:text-white transition-colors">
                <UserCheck className="w-4 h-4 mr-2" />
                Compte installateur
              </Link>
            </div>
            <Button 
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full"
            >
              Demander une étude
            </Button>
            <a href="tel:0977774164" className="flex items-center text-white hover:text-green-400 transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              09 77 77 41 64
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 bg-blue-900/95 backdrop-blur-sm rounded-lg mt-2">
            <div className="flex flex-col space-y-4 p-4">
              <a href="#why-solar" className="text-blue-100 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                Pourquoi le solaire
              </a>
              <a href="#process" className="text-blue-100 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                Notre processus
              </a>
              <a href="#testimonials" className="text-blue-100 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                Témoignages
              </a>
              <Link to="/client" className="flex items-center text-blue-100 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                <User className="w-4 h-4 mr-2" />
                Mon compte
              </Link>
              <Link to="/espace-installateur" className="flex items-center text-blue-100 hover:text-white" onClick={() => setIsMenuOpen(false)}>
                <UserCheck className="w-4 h-4 mr-2" />
                Compte installateur
              </Link>
              <Button 
                onClick={() => {
                  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="bg-green-500 hover:bg-green-600 text-white w-full rounded-full"
              >
                Demander une étude
              </Button>
              <a href="tel:0977774164" className="flex items-center text-white hover:text-green-400">
                <Phone className="w-4 h-4 mr-2" />
                09 77 77 41 64
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
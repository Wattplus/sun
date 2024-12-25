import { Button } from "./ui/button";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-orange-500">WattPlus</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#why-solar" className="text-gray-700 hover:text-orange-500 transition-colors">
              Pourquoi le solaire
            </a>
            <a href="#process" className="text-gray-700 hover:text-orange-500 transition-colors">
              Notre processus
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-orange-500 transition-colors">
              Témoignages
            </a>
            <Button 
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Demander une étude
            </Button>
            <a href="tel:0977774164" className="flex items-center text-orange-500 hover:text-orange-600 transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              09 77 77 41 64
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <a href="#why-solar" className="text-gray-700 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                Pourquoi le solaire
              </a>
              <a href="#process" className="text-gray-700 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                Notre processus
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                Témoignages
              </a>
              <Button 
                onClick={() => {
                  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
                className="bg-orange-500 hover:bg-orange-600 w-full"
              >
                Demander une étude
              </Button>
              <a href="tel:0977774164" className="flex items-center text-orange-500 hover:text-orange-600">
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
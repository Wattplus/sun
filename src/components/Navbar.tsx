import { Button } from "./ui/button";
import { Phone } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-primary">WattPlus</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#why-solar" className="text-gray-700 hover:text-primary">
              Pourquoi le solaire
            </a>
            <a href="#process" className="text-gray-700 hover:text-primary">
              Notre processus
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary">
              Témoignages
            </a>
            <Button 
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="ml-4"
            >
              Demander une étude
            </Button>
            <a href="tel:0977774164" className="flex items-center text-primary hover:text-primary/80">
              <Phone className="w-4 h-4 mr-2" />
              09 77 77 41 64
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
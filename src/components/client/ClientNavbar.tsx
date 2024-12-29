import { Button } from "@/components/ui/button";
import { Sun, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export const ClientNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 md:h-16 items-center">
          <div className="flex items-center">
            <Sun className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mr-2" />
            <span className="text-lg md:text-2xl font-bold text-gray-900">WattPlus</span>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9">
                  <User className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/")}>
                  Retour au site
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/client/settings")}>
                  Paramètres
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
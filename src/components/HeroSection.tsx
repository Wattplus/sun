import { ArrowRight, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-8">
            <Sun className="h-16 w-16 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Passez à l'énergie solaire
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Obtenez une étude gratuite et personnalisée pour votre installation photovoltaïque. Économisez sur vos factures d'électricité tout en contribuant à un avenir plus vert.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="group" size="lg" onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}>
              Étude gratuite
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    content: "Grâce à WattPlus, nous économisons plus de 800€ par an sur notre facture d'électricité. L'installation a été rapide et professionnelle.",
    author: "Marie Dubois",
    location: "Lyon",
    savings: "800€/an",
    date: "Mars 2023",
    rating: 5,
  },
  {
    content: "Je recommande vivement WattPlus. Leur expertise et leur accompagnement tout au long du projet ont été remarquables.",
    author: "Pierre Martin",
    location: "Bordeaux",
    savings: "650€/an",
    date: "Juin 2023",
    rating: 5,
  },
  {
    content: "Installation réalisée en 2 jours seulement ! Très satisfaite des économies réalisées et du professionnalisme de l'équipe.",
    author: "Sophie Laurent",
    location: "Toulouse",
    savings: "720€/an",
    date: "Septembre 2023",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <div className="py-24 sm:py-32 bg-gradient-to-b from-[#0B1221] to-[#1a5fb4]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
            Ce que nos clients disent
          </h2>
          <p className="text-xl text-blue-200">
            Des milliers de propriétaires satisfaits ont déjà fait le choix du photovoltaïque
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary to-accent opacity-25 blur transition duration-200 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col glass-panel p-8">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="flex-1 text-lg font-medium leading-8 text-white mb-8">
                  "{testimonial.content}"
                </blockquote>
                <div className="mt-auto">
                  <div className="font-semibold text-white text-lg mb-1">{testimonial.author}</div>
                  <div className="text-blue-200 mb-4">{testimonial.location}</div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <span className="block text-primary font-bold text-xl">{testimonial.savings}</span>
                      <span className="text-sm text-blue-200">d'économies</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-white font-semibold">{testimonial.date}</span>
                      <span className="text-sm text-blue-200">installation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-primary/20"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Rejoignez nos clients satisfaits
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
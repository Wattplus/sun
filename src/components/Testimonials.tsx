import { Star } from "lucide-react";

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
    <div className="py-24 sm:py-32 bg-gradient-to-b from-orange-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ce que nos clients disent
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Des milliers de propriétaires satisfaits ont déjà fait le choix du photovoltaïque
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-center lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-4 rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-orange-400 fill-orange-400" />
                ))}
              </div>
              <blockquote className="text-lg font-semibold leading-8 text-gray-900">
                "{testimonial.content}"
              </blockquote>
              <div className="mt-auto space-y-2">
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-gray-600">{testimonial.location}</div>
                <div className="flex justify-center gap-4 pt-4 border-t">
                  <div className="text-sm">
                    <span className="text-orange-500 font-semibold">{testimonial.savings}</span>
                    <br />
                    d'économies
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-900 font-semibold">{testimonial.date}</span>
                    <br />
                    installation
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
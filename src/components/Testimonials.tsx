import { Star } from "lucide-react";

const testimonials = [
  {
    content: "Installation rapide et professionnelle. Je recommande vivement !",
    author: "Marie D.",
    location: "Bordeaux",
    rating: 5,
  },
  {
    content: "Un excellent retour sur investissement. Mes factures ont drastiquement baissé.",
    author: "Pierre M.",
    location: "Lyon",
    rating: 5,
  },
  {
    content: "Accompagnement personnalisé du début à la fin. Très satisfait.",
    author: "Sophie L.",
    location: "Nantes",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <div className="py-24 sm:py-32">
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
              className="flex flex-col gap-y-4 rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
            >
              <div className="flex justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg font-semibold leading-8 text-gray-900">
                "{testimonial.content}"
              </blockquote>
              <div className="mt-auto">
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-gray-600">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
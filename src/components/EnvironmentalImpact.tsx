import { Leaf, TreePine, Cloud, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EnvironmentalImpact = () => {
  return (
    <div className="py-24 sm:py-32 bg-gradient-to-b from-[#0B1221] to-[#1a5fb4]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
            Impact environnemental
          </h2>
          <p className="text-xl text-blue-200">
            Contribuez à un avenir plus vert avec l'énergie solaire
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: TreePine,
              title: "2.5 tonnes",
              description: "de CO2 économisées par an",
              color: "from-green-400 to-green-600",
            },
            {
              icon: Cloud,
              title: "Air plus pur",
              description: "Réduction des émissions de particules fines",
              color: "from-blue-400 to-blue-600",
            },
            {
              icon: Leaf,
              title: "25 ans",
              description: "d'énergie propre garantie",
              color: "from-emerald-400 to-emerald-600",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-600 to-blue-600 opacity-25 blur transition duration-200 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center p-8 bg-[#0B1221]/50 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className={`rounded-xl bg-gradient-to-br ${item.color} p-4 text-white shadow-lg mb-6`}>
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-center">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-green-500/20"
            onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Réduisez votre empreinte carbone
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
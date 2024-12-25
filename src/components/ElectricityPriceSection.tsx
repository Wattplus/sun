import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { year: "2010", price: 0.1284 },
  { year: "2011", price: 0.1283 },
  { year: "2012", price: 0.1392 },
  { year: "2013", price: 0.1524 },
  { year: "2014", price: 0.1585 },
  { year: "2015", price: 0.1615 },
  { year: "2016", price: 0.1685 },
  { year: "2017", price: 0.1690 },
  { year: "2018", price: 0.1799 },
  { year: "2019", price: 0.1877 },
  { year: "2020", price: 0.1899 },
  { year: "2021", price: 0.1932 },
  { year: "2022", price: 0.2154 },
  { year: "2023", price: 0.2516 },
];

export const ElectricityPriceSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background-dark via-background to-background-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
            L'électricité ne cesse d'augmenter en France
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Les prix de l'électricité ont augmenté de plus de 95% depuis 2010.
            Protégez-vous contre les futures hausses en produisant votre propre énergie.
          </p>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6 mb-12 backdrop-blur-sm">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="year"
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8" }}
                />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8" }}
                  tickFormatter={(value) => `${value}€`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0B1221",
                    border: "1px solid #1EAEDB",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) =>
                    `${value.toFixed(4)}€ / kWh`
                  }
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#1EAEDB"
                  fillOpacity={1}
                  fill="url(#priceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Investissez dans votre indépendance énergétique
            </h3>
            <p className="text-blue-100 mb-8">
              Les panneaux photovoltaïques vous permettent de produire votre propre électricité et de vous protéger contre les hausses de prix futures.
            </p>
            <Button
              size="lg"
              className="glass-button group"
              onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Je calcule mes économies
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
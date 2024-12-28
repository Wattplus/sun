import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const data = [
  { month: "Jan", consommation: 150, production: 80 },
  { month: "Fév", consommation: 140, production: 90 },
  { month: "Mar", consommation: 130, production: 110 },
  { month: "Avr", consommation: 120, production: 130 },
  { month: "Mai", consommation: 110, production: 150 },
  { month: "Juin", consommation: 100, production: 160 },
  { month: "Juil", consommation: 95, production: 170 },
  { month: "Aoû", consommation: 90, production: 165 },
  { month: "Sep", consommation: 100, production: 140 },
  { month: "Oct", consommation: 115, production: 120 },
  { month: "Nov", consommation: 130, production: 95 },
  { month: "Déc", consommation: 145, production: 85 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 p-3 rounded-lg border border-border shadow-lg">
        <p className="font-semibold">{label}</p>
        <p className="text-blue-400">Consommation: {payload[0].value} kWh</p>
        <p className="text-green-400">Production: {payload[1].value} kWh</p>
      </div>
    );
  }
  return null;
};

export const ConsumptionChart = () => {
  return (
    <Card className="p-6 bg-background/95 backdrop-blur-sm">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-primary">
            Suivi Énergétique
          </h3>
          <p className="text-sm text-muted-foreground">
            Comparaison consommation vs production solaire
          </p>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="month" 
                stroke="#888888"
                fontSize={12}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                label={{ 
                  value: 'kWh', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: '#888888' }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="consommation" 
                name="Consommation"
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="production" 
                name="Production"
                fill="#22c55e" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-500/10 p-4 rounded-lg">
            <p className="text-sm text-blue-400">Consommation moyenne</p>
            <p className="text-2xl font-semibold">118.75 kWh</p>
          </div>
          <div className="bg-green-500/10 p-4 rounded-lg">
            <p className="text-sm text-green-400">Production moyenne</p>
            <p className="text-2xl font-semibold">124.58 kWh</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
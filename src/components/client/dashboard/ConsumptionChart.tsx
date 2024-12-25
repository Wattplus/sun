import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", amount: 150 },
  { month: "Fév", amount: 140 },
  { month: "Mar", amount: 130 },
  { month: "Avr", amount: 120 },
  { month: "Mai", amount: 110 },
  { month: "Juin", amount: 100 },
];

export const ConsumptionChart = () => {
  return (
    <Card className="p-6 glass-panel">
      <h3 className="text-xl font-semibold mb-4 gradient-text">
        Historique des factures
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip />
            <Bar dataKey="amount" fill="#1a5fb4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
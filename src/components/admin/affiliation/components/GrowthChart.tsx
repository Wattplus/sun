import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface GrowthChartProps {
  data: any[];
}

export const GrowthChart = ({ data }: GrowthChartProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Croissance des Affiliés</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#ffffff50" />
            <YAxis stroke="#ffffff50" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0B1221', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#1EAEDB" 
              strokeWidth={2}
              dot={{ fill: '#1EAEDB', strokeWidth: 2 }}
              name="Revenus"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PerformanceChartProps {
  data: any[];
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Performance des Affiliations</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCommissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#1EAEDB" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              name="Revenus (€)"
            />
            <Area 
              type="monotone" 
              dataKey="commissions" 
              stroke="#4CAF50" 
              fillOpacity={1} 
              fill="url(#colorCommissions)" 
              name="Commissions (€)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
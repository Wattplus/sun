import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { month: 'Jan', leads: 65, devis: 45, conversion: 12, revenus: 4500 },
  { month: 'Fév', leads: 78, devis: 52, conversion: 15, revenus: 5200 },
  { month: 'Mar', leads: 82, devis: 56, conversion: 18, revenus: 6100 },
  { month: 'Avr', leads: 95, devis: 65, conversion: 22, revenus: 7300 },
  { month: 'Mai', leads: 110, devis: 75, conversion: 25, revenus: 8200 },
  { month: 'Juin', leads: 125, devis: 85, conversion: 30, revenus: 9500 },
];

export function PerformanceCharts() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Performance Mensuelle</h2>
        <Select defaultValue="30">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner la période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">7 derniers jours</SelectItem>
            <SelectItem value="30">30 derniers jours</SelectItem>
            <SelectItem value="90">Trimestre</SelectItem>
            <SelectItem value="365">Année</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="month" stroke="#ffffff50" />
            <YAxis yAxisId="left" stroke="#ffffff50" />
            <YAxis yAxisId="right" orientation="right" stroke="#ffffff50" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0B1221', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px' 
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="leads" name="Leads" fill="#1EAEDB" />
            <Bar yAxisId="left" dataKey="devis" name="Devis" fill="#33C3F0" />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="conversion" 
              name="Conversion (%)" 
              stroke="#0FA0CE"
            />
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="revenus" 
              name="Revenus (€)" 
              stroke="#7FDBFF"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', leads: 500, devis: 200, conversion: 40 },
  { month: 'Fév', leads: 400, devis: 180, conversion: 45 },
  { month: 'Mar', leads: 550, devis: 250, conversion: 45.5 },
  { month: 'Avr', leads: 750, devis: 350, conversion: 46.7 },
  { month: 'Mai', leads: 800, devis: 380, conversion: 47.5 },
  { month: 'Juin', leads: 1000, devis: 480, conversion: 48 },
];

const PerformanceChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Performance Mensuelle</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDevis" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="leads" 
              stroke="#3B82F6" 
              fillOpacity={1} 
              fill="url(#colorLeads)" 
              name="Leads"
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="devis" 
              stroke="#10B981" 
              fillOpacity={1} 
              fill="url(#colorDevis)" 
              name="Devis"
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="conversion" 
              stroke="#F59E0B" 
              fill="none"
              name="Conversion (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
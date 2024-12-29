import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface PerformanceChartProps {
  data: any[];
}

const PerformanceChart = ({ data }: PerformanceChartProps) => {
  const chartData = [
    { month: 'Jan', leads: 0, devis: 0, conversion: 0 },
    { month: 'Fév', leads: 0, devis: 0, conversion: 0 },
    { month: 'Mar', leads: 0, devis: 0, conversion: 0 },
    { month: 'Avr', leads: 0, devis: 0, conversion: 0 },
    { month: 'Mai', leads: 0, devis: 0, conversion: 0 },
    { month: 'Juin', leads: 0, devis: 0, conversion: 0 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-[#0B1221]/50 backdrop-blur-md border border-primary/20 p-6"
    >
      <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
        Performance Mensuelle
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1EAEDB" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#1EAEDB" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDevis" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#33C3F0" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#33C3F0" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#ffffff50"
              tick={{ fill: '#ffffff80' }}
            />
            <YAxis 
              yAxisId="left" 
              stroke="#ffffff50"
              tick={{ fill: '#ffffff80' }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#ffffff50"
              tick={{ fill: '#ffffff80' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0B1221', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="leads" 
              stroke="#1EAEDB" 
              fillOpacity={1} 
              fill="url(#colorLeads)" 
              name="Leads"
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="devis" 
              stroke="#33C3F0" 
              fillOpacity={1} 
              fill="url(#colorDevis)" 
              name="Devis"
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="conversion" 
              stroke="#0FA0CE" 
              fill="none"
              name="Conversion (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PerformanceChart;
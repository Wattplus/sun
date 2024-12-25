import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-[#2A2F3C]/50 backdrop-blur-md border border-white/10 p-6"
    >
      <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-transparent">
        Performance Mensuelle
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDevis" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D6BCFA" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#D6BCFA" stopOpacity={0}/>
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
                backgroundColor: '#2A2F3C', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="leads" 
              stroke="#9b87f5" 
              fillOpacity={1} 
              fill="url(#colorLeads)" 
              name="Leads"
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="devis" 
              stroke="#D6BCFA" 
              fillOpacity={1} 
              fill="url(#colorDevis)" 
              name="Devis"
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="conversion" 
              stroke="#7E69AB" 
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, Users, FileText, ArrowUpRight, TrendingUp, LineChart, Activity, Target } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const mockData = [
  { name: 'Jan', value: 400 },
  { name: 'Fév', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Avr', value: 800 },
  { name: 'Mai', value: 700 },
  { name: 'Juin', value: 900 },
];

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      email === "comparateurpanneausolaire@gmail.com" &&
      password === "Hanna77026@"
    ) {
      setIsLoggedIn(true);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'interface d'administration",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
      });
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Panneau d'administration
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Carte des visiteurs */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-500">Visiteurs</h3>
              <p className="text-2xl font-semibold mt-1">2,543</p>
              <p className="text-xs text-green-500 mt-2">+15% ce mois</p>
            </div>

            {/* Carte des devis */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <FileText className="h-6 w-6 text-green-500" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-500">Devis générés</h3>
              <p className="text-2xl font-semibold mt-1">384</p>
              <p className="text-xs text-green-500 mt-2">+12% cette semaine</p>
            </div>

            {/* Carte du taux de conversion */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Target className="h-6 w-6 text-purple-500" />
                </div>
                <LineChart className="h-4 w-4 text-green-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-500">Taux de conversion</h3>
              <p className="text-2xl font-semibold mt-1">15.1%</p>
              <p className="text-xs text-green-500 mt-2">+3% ce mois</p>
            </div>

            {/* Carte des leads qualifiés */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Activity className="h-6 w-6 text-yellow-500" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-500">Leads qualifiés</h3>
              <p className="text-2xl font-semibold mt-1">156</p>
              <p className="text-xs text-green-500 mt-2">+18% cette semaine</p>
            </div>
          </div>

          {/* Section des graphiques et activités */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graphique des performances */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Performance mensuelle
              </h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Activité récente */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Activité récente
              </h2>
              <div className="space-y-4">
                {[
                  { action: "Nouveau devis généré", time: "Il y a 2h", status: "success" },
                  { action: "Lead qualifié contacté", time: "Il y a 4h", status: "warning" },
                  { action: "Installation planifiée", time: "Il y a 6h", status: "info" },
                  { action: "Nouveau contact", time: "Il y a 8h", status: "success" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'success' ? 'bg-green-500' :
                        item.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <p className="text-sm text-gray-600">{item.action}</p>
                    </div>
                    <span className="text-sm text-gray-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Connexion Administrateur
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
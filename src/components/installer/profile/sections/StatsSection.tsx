import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Star, TrendingUp, Users } from "lucide-react";

interface StatsSectionProps {
  data: any;
}

export const StatsSection = ({ data }: StatsSectionProps) => {
  const mockChartData = [
    { month: "Jan", projects: 4 },
    { month: "Fév", projects: 3 },
    { month: "Mar", projects: 6 },
    { month: "Avr", projects: 8 },
    { month: "Mai", projects: 7 },
    { month: "Juin", projects: 9 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Note moyenne</p>
              <h4 className="text-2xl font-bold">{data?.average_rating || "N/A"}</h4>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Taux de conversion</p>
              <h4 className="text-2xl font-bold">{data?.conversion_rate || 0}%</h4>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Clients satisfaits</p>
              <h4 className="text-2xl font-bold">{data?.satisfied_clients || 0}</h4>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6">Projets par mois</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="projects" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
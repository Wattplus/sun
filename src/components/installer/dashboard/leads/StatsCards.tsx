import { Card } from "@/components/ui/card";
import { Users, Phone, FileCheck2, Ban } from "lucide-react";
import { Lead } from "@/types/crm";

interface StatsCardsProps {
  stats: {
    total: number;
    contacted: number;
    converted: number;
    lost: number;
  };
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 flex items-center space-x-4">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Leads</p>
          <p className="text-xl sm:text-2xl font-bold">{stats.total}</p>
        </div>
      </Card>
      <Card className="p-4 flex items-center space-x-4">
        <div className="p-2 bg-yellow-500/10 rounded-lg">
          <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Contactés</p>
          <p className="text-xl sm:text-2xl font-bold">{stats.contacted}</p>
        </div>
      </Card>
      <Card className="p-4 flex items-center space-x-4">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <FileCheck2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Convertis</p>
          <p className="text-xl sm:text-2xl font-bold">{stats.converted}</p>
        </div>
      </Card>
      <Card className="p-4 flex items-center space-x-4">
        <div className="p-2 bg-red-500/10 rounded-lg">
          <Ban className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Perdus</p>
          <p className="text-xl sm:text-2xl font-bold">{stats.lost}</p>
        </div>
      </Card>
    </div>
  );
};
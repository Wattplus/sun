import { Card, CardContent } from "@/components/ui/card";
import { Lead } from "@/types/crm";
import { Users, Phone, FileCheck, Ban } from "lucide-react";

interface LeadStatsProps {
  leads: Lead[];
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  const stats = {
    total: leads.length,
    contacted: leads.filter(lead => lead.installerStatus === 'contacte').length,
    converted: leads.filter(lead => lead.installerStatus === 'signe').length,
    lost: leads.filter(lead => lead.installerStatus === 'perdu').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-500/10 rounded-full">
                <Phone className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contactés</p>
                <p className="text-2xl font-bold">{stats.contacted}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-500/10 rounded-full">
                <FileCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Convertis</p>
                <p className="text-2xl font-bold">{stats.converted}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-500/10 rounded-full">
                <Ban className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Perdus</p>
                <p className="text-2xl font-bold">{stats.lost}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
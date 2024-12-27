import { Card } from "@/components/ui/card";
import { Users, CheckCircle2, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Lead } from "@/types/crm";

interface LeadStatsProps {
  leads: Lead[];
}

export const LeadStats = ({ leads }: LeadStatsProps) => {
  const totalLeads = leads?.length || 0;
  const completedLeads = leads?.filter(lead => 
    lead.firstName && 
    lead.lastName && 
    lead.email && 
    lead.phone && 
    lead.postalCode && 
    lead.roofType && 
    lead.monthlyBill
  ).length || 0;
  const conversionRate = totalLeads > 0 ? Math.round((completedLeads / totalLeads) * 100) : 0;
  const averageMonthlyBill = leads?.reduce((acc, lead) => {
    const bill = parseInt(lead.monthlyBill || '0');
    return acc + bill;
  }, 0) / totalLeads || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
              <h3 className="text-2xl font-bold">{totalLeads}</h3>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Leads Complets</p>
              <h3 className="text-2xl font-bold">{completedLeads}</h3>
              <p className="text-xs text-muted-foreground">{conversionRate}% de complétion</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Facture Moyenne</p>
              <h3 className="text-2xl font-bold">{Math.round(averageMonthlyBill)}€/mois</h3>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">En Négociation</p>
              <h3 className="text-2xl font-bold">
                {leads?.filter(lead => lead.installerStatus === 'negociation').length || 0}
              </h3>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
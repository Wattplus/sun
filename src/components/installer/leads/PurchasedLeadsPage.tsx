import { Card } from "@/components/ui/card";
import { PurchasedLeads } from "../dashboard/PurchasedLeads";

export const PurchasedLeadsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
            Mes Leads Achetés
          </h1>
          <p className="text-muted-foreground">
            Gérez et suivez vos leads achetés
          </p>
        </div>

        <Card className="p-6">
          <PurchasedLeads />
        </Card>
      </div>
    </div>
  );
};
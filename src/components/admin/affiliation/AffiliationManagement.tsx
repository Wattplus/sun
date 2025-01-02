import { Users, BarChart3, Settings, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AffiliatesList } from "./sections/AffiliatesList";
import { AffiliateStats } from "./sections/AffiliateStats";
import { AffiliateSettings } from "./sections/AffiliateSettings";
import { CommissionManagement } from "./sections/CommissionManagement";

const AffiliationManagement = () => {
  return (
    <div className="space-y-6 p-6">
      <AdminBreadcrumb />
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Gestion des affiliations
        </h1>
      </div>

      <Tabs defaultValue="affiliates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="affiliates" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Affiliés
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Statistiques
          </TabsTrigger>
          <TabsTrigger value="commissions" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Commissions
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Paramètres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="affiliates">
          <AffiliatesList />
        </TabsContent>

        <TabsContent value="stats">
          <AffiliateStats />
        </TabsContent>

        <TabsContent value="commissions">
          <CommissionManagement />
        </TabsContent>

        <TabsContent value="settings">
          <AffiliateSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AffiliationManagement;
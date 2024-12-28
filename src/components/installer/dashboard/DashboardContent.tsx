import { KPISection } from "./sections/KPISection";
import { RecentActivity } from "./sections/RecentActivity";
import { LeadsOverview } from "./sections/LeadsOverview";
import { QuotesOverview } from "./sections/QuotesOverview";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, MessageSquare, Users } from "lucide-react";

export function DashboardContent() {
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-background to-background/80">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl backdrop-blur-sm border border-[#1EAEDB]/10 p-6 hover:border-[#1EAEDB]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#1EAEDB]/5"
      >
        <KPISection />
      </motion.div>

      <Tabs defaultValue="leads" className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
          <TabsTrigger 
            value="leads"
            className="data-[state=active]:bg-[#1EAEDB]/20 data-[state=active]:text-[#1EAEDB]"
          >
            <Users className="h-4 w-4 mr-2" />
            Leads
          </TabsTrigger>
          <TabsTrigger 
            value="quotes"
            className="data-[state=active]:bg-[#1EAEDB]/20 data-[state=active]:text-[#1EAEDB]"
          >
            <FileText className="h-4 w-4 mr-2" />
            Devis
          </TabsTrigger>
          <TabsTrigger 
            value="calendar"
            className="data-[state=active]:bg-[#1EAEDB]/20 data-[state=active]:text-[#1EAEDB]"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Agenda
          </TabsTrigger>
          <TabsTrigger 
            value="messages"
            className="data-[state=active]:bg-[#1EAEDB]/20 data-[state=active]:text-[#1EAEDB]"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-[#0B1221]/50 to-[#1EAEDB]/10 backdrop-blur-sm border-[#1EAEDB]/10 hover:bg-gradient-to-br hover:from-[#0B1221]/60 hover:to-[#1EAEDB]/20 hover:border-[#1EAEDB]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#1EAEDB]/5 group">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              Aperçu des Leads
            </h2>
            <LeadsOverview />
          </Card>
        </TabsContent>

        <TabsContent value="quotes" className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-[#0B1221]/50 to-[#1EAEDB]/10 backdrop-blur-sm border-[#1EAEDB]/10 hover:bg-gradient-to-br hover:from-[#0B1221]/60 hover:to-[#1EAEDB]/20 hover:border-[#1EAEDB]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#1EAEDB]/5 group">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              Gestion des Devis
            </h2>
            <QuotesOverview />
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card className="p-6 bg-gradient-to-br from-[#0B1221]/50 to-[#1EAEDB]/10 backdrop-blur-sm border-[#1EAEDB]/10">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] bg-clip-text text-transparent">
              Agenda des Rendez-vous
            </h2>
            {/* Calendrier à implémenter */}
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card className="p-6 bg-gradient-to-br from-[#0B1221]/50 to-[#1EAEDB]/10 backdrop-blur-sm border-[#1EAEDB]/10">
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] bg-clip-text text-transparent">
              Centre de Messages
            </h2>
            {/* Messagerie à implémenter */}
          </Card>
        </TabsContent>
      </Tabs>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-br from-[#0B1221]/50 to-[#1EAEDB]/10 backdrop-blur-sm border-[#1EAEDB]/10 hover:bg-gradient-to-br hover:from-[#0B1221]/60 hover:to-[#1EAEDB]/20 hover:border-[#1EAEDB]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#1EAEDB]/5 group">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#1EAEDB] to-[#33C3F0] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            Activité Récente
          </h2>
          <RecentActivity />
        </Card>
      </motion.div>
    </div>
  );
}
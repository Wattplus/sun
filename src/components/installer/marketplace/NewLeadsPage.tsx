import { useLeadOperations } from "@/hooks/useLeadOperations";
import { Card } from "@/components/ui/card";
import { LeadsTable } from "./components/LeadsTable";
import { LeadsHeader } from "./components/LeadsHeader";
import { LeadAgeTabs } from "./components/LeadAgeTabs";
import { useState } from "react";

export const NewLeadsPage = () => {
  const { leads } = useLeadOperations();
  const [activeTab, setActiveTab] = useState("new");
  const [showFilters, setShowFilters] = useState(false);

  const handlePrepaidAccount = () => {
    window.location.href = '/espace-installateur/compte/prepaye';
  };

  const handleExport = () => {
    console.log("Export functionality to be implemented");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/95 to-background">
      <div className="max-w-[1400px] mx-auto p-6 space-y-8">
        <div className="space-y-6">
          <LeadsHeader 
            onToggleFilters={() => setShowFilters(!showFilters)}
            onPrepaidAccount={handlePrepaidAccount}
            onExport={handleExport}
          />

          <LeadAgeTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <Card className="overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-sm">
          <div className="p-6">
            <div className="overflow-x-auto">
              <LeadsTable 
                leads={leads}
                selectedLeads={[]}
                onSelectAll={() => {}}
                onSelectLead={() => {}}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
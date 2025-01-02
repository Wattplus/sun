import { AdminBreadcrumb } from "../AdminBreadcrumb";
import { useState, useEffect } from "react";
import { Lead } from "@/types/crm";
import { LeadsFilters } from "@/components/installer/dashboard/LeadsFilters";
import { Card } from "@/components/ui/card";
import { LeadAgeTabs } from "@/components/installer/marketplace/components/LeadAgeTabs";
import { MarketplaceHeader } from "./sections/MarketplaceHeader";
import { MarketplaceStats } from "./sections/MarketplaceStats";
import { MarketplaceSelection } from "./sections/MarketplaceSelection";
import { MarketplaceGrid } from "./sections/MarketplaceGrid";
import { BalanceSection } from "@/components/installer/marketplace/sections/BalanceSection";
import { BottomCTA } from "@/components/installer/marketplace/sections/BottomCTA";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";

export const LeadMarketplace = () => {
  const [purchasedLeads, setPurchasedLeads] = useState<string[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<"default" | "asc" | "desc">("default");
  const [activeTab, setActiveTab] = useState("new");
  const [availableLeads, setAvailableLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      console.log("Fetching marketplace leads...");
      setIsLoading(true);
      
      const { data: leadsData, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        toast.error("Erreur lors du chargement des leads");
        return;
      }

      if (leadsData) {
        console.log("Fetched leads:", leadsData);
        setAvailableLeads(leadsData);
      } else {
        console.log("No leads found");
        setAvailableLeads([]);
      }
    } catch (error) {
      console.error('Error in fetchLeads:', error);
      toast.error("Une erreur est survenue lors du chargement des leads");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Initial leads fetch");
    fetchLeads();
  }, []);

  useEffect(() => {
    console.log("Setting up real-time subscription for marketplace leads");
    
    const channel = supabase
      .channel('marketplace-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'leads'
        },
        (payload) => {
          console.log('Received real-time update:', payload);
          fetchLeads();
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      console.log("Cleaning up marketplace subscription");
      supabase.removeChannel(channel);
    };
  }, []);

  const availableDepartments = Array.from(
    new Set(availableLeads.map(lead => lead.postalcode.substring(0, 2)))
  ).sort();

  const filteredLeads = availableLeads.filter(lead => {
    if (projectTypeFilter !== 'all' && lead.clienttype !== projectTypeFilter) {
      return false;
    }
    if (selectedDepartments.length > 0 && !selectedDepartments.includes(lead.postalcode.substring(0, 2))) {
      return false;
    }
    return true;
  });

  console.log("Filtered leads:", filteredLeads);

  const handlePurchase = (lead: Lead) => {
    setPurchasedLeads(prev => [...prev, lead.id]);
    toast.success(`Lead ${lead.firstname} ${lead.lastname} acheté avec succès`);
  };

  const handleBulkPurchase = () => {
    selectedLeads.forEach(lead => handlePurchase(lead));
    setSelectedLeads([]);
  };

  const handleDepartmentSelect = (department: string) => {
    if (department && !selectedDepartments.includes(department)) {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };

  const handleDepartmentRemove = (department: string) => {
    setSelectedDepartments(selectedDepartments.filter(d => d !== department));
  };

  const totalPrice = selectedLeads.reduce((sum, lead) => sum + (lead.price || 0), 0);

  const handlePrepaidAccount = () => {
    window.location.href = '/espace-installateur/compte/prepaye';
  };

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <AdminBreadcrumb />
      
      <div className="space-y-6">
        <BalanceSection 
          balance={0} 
          onPrepaidAccount={handlePrepaidAccount}
        />

        <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/10">
          <div className="space-y-6">
            <MarketplaceHeader availableLeads={filteredLeads} />

            <LeadAgeTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="space-y-4">
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
                <LeadsFilters
                  availableDepartments={availableDepartments}
                  selectedDepartments={selectedDepartments}
                  projectTypeFilter={projectTypeFilter}
                  priceFilter={priceFilter}
                  onDepartmentSelect={handleDepartmentSelect}
                  onDepartmentRemove={handleDepartmentRemove}
                  onProjectTypeChange={setProjectTypeFilter}
                  onPriceFilterChange={setPriceFilter}
                />
              </Card>

              <MarketplaceSelection 
                selectedLeads={selectedLeads}
                onBulkPurchase={handleBulkPurchase}
                totalPrice={totalPrice}
              />

              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Chargement des leads...</p>
                </div>
              ) : (
                <MarketplaceGrid 
                  availableLeads={filteredLeads}
                  purchasedLeads={purchasedLeads}
                  onPurchase={handlePurchase}
                />
              )}
            </div>
          </div>
        </Card>

        <BottomCTA onPrepaidAccount={handlePrepaidAccount} />
      </div>
    </div>
  );
};
import { useEffect, useState } from "react";
import { Lead } from "@/types/crm";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AllAvailableLeadsProps {
  onClose: () => void;
}

export const AllAvailableLeads = ({ onClose }: AllAvailableLeadsProps) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase.from("leads").select("*");
      setLeads(data || []);
    };

    fetchLeads();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold">Leads Disponibles</h2>
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="gap-2"
          size={isMobile ? "sm" : "default"}
        >
          <X className="h-4 w-4" />
          {!isMobile && "Fermer"}
        </Button>
      </div>
      <Card className="p-4 md:p-6">
        {leads.map((lead) => (
          <div key={lead.id}>
            <p>{lead.postalcode}</p>
            <p>{lead.firstname}</p>
            <p>{lead.lastname}</p>
            <p>{lead.monthlybill}</p>
          </div>
        ))}
      </Card>
    </div>
  );
};
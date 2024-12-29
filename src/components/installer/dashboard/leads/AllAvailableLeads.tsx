import { useEffect, useState } from "react";
import { Lead } from "@/types/crm";
import { supabase } from "@/lib/supabase-client";

export const AllAvailableLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase.from("leads").select("*");
      setLeads(data || []);
    };

    fetchLeads();
  }, []);

  return (
    <div>
      {leads.map((lead) => (
        <div key={lead.id}>
          <p>{lead.postalcode}</p> {/* Updated from postalCode to postalcode */}
          <p>{lead.firstname}</p> {/* Updated from firstName to firstname */}
          <p>{lead.lastname}</p> {/* Updated from lastName to lastname */}
          <p>{lead.monthlybill}</p> {/* Updated from monthlyBill to monthlybill */}
        </div>
      ))}
    </div>
  );
};

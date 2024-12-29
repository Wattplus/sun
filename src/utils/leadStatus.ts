import { LeadStatus } from "@/types/crm";

export const getStatusColor = (status: LeadStatus) => {
  const colors = {
    new: "bg-[#1EAEDB]",
    contacted: "bg-[#33C3F0]",
    qualified: "bg-[#0FA0CE]",
    assigned: "bg-[#1EAEDB]",
    converted: "bg-emerald-500",
    lost: "bg-red-500"
  };
  return colors[status];
};

export const getStatusText = (status: LeadStatus) => {
  const texts = {
    new: "Nouveau",
    contacted: "Contacté",
    qualified: "Qualifié",
    assigned: "Assigné",
    converted: "Converti",
    lost: "Perdu"
  };
  return texts[status];
};
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Lead } from "@/types/crm";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLeadsSync } from "@/hooks/useLeadsSync";
import { toast } from "sonner";

interface LeadTableProps {
  leads: Lead[];
  getStatusColor: (status: string) => string;
}

export const LeadTable = ({ leads, getStatusColor }: LeadTableProps) => {
  const { updateLead } = useLeadsSync();

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await updateLead({ id: leadId, installerStatus: newStatus });
      toast.success("Statut mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut");
    }
  };

  return (
    <ScrollArea className="h-[600px]">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary/5">
            <TableHead className="font-semibold">Type de projet</TableHead>
            <TableHead className="font-semibold">Prénom</TableHead>
            <TableHead className="font-semibold">Nom</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Téléphone</TableHead>
            <TableHead className="font-semibold">Code postal</TableHead>
            <TableHead className="font-semibold">Type de toit</TableHead>
            <TableHead className="font-semibold">Facture mensuelle</TableHead>
            <TableHead className="font-semibold">Statut</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads?.map((lead) => (
            <TableRow key={lead.id} className="group hover:bg-primary/5">
              <TableCell>
                <Badge variant="outline" className={lead.projectType === 'professional' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}>
                  {lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{lead.firstName}</TableCell>
              <TableCell>{lead.lastName}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-primary/10">
                  {lead.postalCode}
                </Badge>
              </TableCell>
              <TableCell>{lead.roofType || 'Non renseigné'}</TableCell>
              <TableCell>{lead.monthlyBill ? `${lead.monthlyBill}€/mois` : 'Non renseigné'}</TableCell>
              <TableCell>
                <Select
                  value={lead.installerStatus || 'nouveau'}
                  onValueChange={(value) => handleStatusChange(lead.id, value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nouveau">Nouveau</SelectItem>
                    <SelectItem value="contacte">Contacté</SelectItem>
                    <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
                    <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
                    <SelectItem value="negociation">En négociation</SelectItem>
                    <SelectItem value="signe">Signé</SelectItem>
                    <SelectItem value="perdu">Perdu</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Link to={`/espace-installateur/leads/${lead.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
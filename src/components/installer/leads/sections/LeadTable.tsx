import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Lead } from "@/types/crm";
import { Link } from "react-router-dom";

interface LeadTableProps {
  leads: Lead[];
  getStatusColor: (status: string) => string;
}

export const LeadTable = ({ leads, getStatusColor }: LeadTableProps) => {
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
                <Badge variant="outline" className={getStatusColor(lead.installerStatus || 'nouveau')}>
                  {lead.installerStatus || 'Nouveau'}
                </Badge>
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
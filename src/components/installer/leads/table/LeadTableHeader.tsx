import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const LeadTableHeader = () => {
  return (
    <TableHeader className="bg-background/40 backdrop-blur-sm">
      <TableRow>
        <TableHead className="w-[50px]">
          <span className="sr-only">Sélection</span>
        </TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Contact</TableHead>
        <TableHead>Localisation</TableHead>
        <TableHead>Type de projet</TableHead>
        <TableHead>Statut</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
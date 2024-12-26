import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const LeadTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="bg-background/40">
        <TableHead className="w-[50px]">
          <span className="sr-only">Sélection</span>
        </TableHead>
        <TableHead className="w-[300px]">Contact</TableHead>
        <TableHead className="w-[250px]">Localisation</TableHead>
        <TableHead className="w-[150px]">Type</TableHead>
        <TableHead className="w-[150px]">Statut</TableHead>
        <TableHead className="w-[200px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
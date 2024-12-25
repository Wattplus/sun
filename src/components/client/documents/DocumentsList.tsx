import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Document {
  name: string;
  date: string;
  status: string;
}

const documents: Document[] = [
  {
    name: "Devis initial",
    date: "2024-03-15",
    status: "Signé"
  },
  {
    name: "Étude technique",
    date: "2024-03-18",
    status: "En attente"
  },
  {
    name: "Plan d'installation",
    date: "2024-03-20",
    status: "En cours"
  }
];

export const DocumentsList = () => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc, index) => (
            <TableRow key={index}>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.date}</TableCell>
              <TableCell>{doc.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Télécharger
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
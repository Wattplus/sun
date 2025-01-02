import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search, Filter, Download, Mail, ExternalLink, MoreVertical, Copy, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const mockAffiliates = [
  {
    id: "1",
    name: "Jean Martin",
    email: "jean.martin@example.com",
    status: "active",
    leads: 45,
    revenue: 2500,
    commission: 1000,
    joinDate: "2024-01-15",
    lastActive: "2024-03-20",
    conversionRate: "3.2%",
    affiliateLink: "https://solar-pro.fr/ref/jean-martin",
  },
  {
    id: "2",
    name: "Marie Dubois",
    email: "marie.dubois@example.com",
    status: "pending",
    leads: 12,
    revenue: 750,
    commission: 300,
    joinDate: "2024-02-20",
    lastActive: "2024-03-19",
    conversionRate: "2.8%",
    affiliateLink: "https://solar-pro.fr/ref/marie-dubois",
  },
  {
    id: "3",
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    status: "active",
    leads: 78,
    revenue: 4200,
    commission: 1680,
    joinDate: "2023-12-10",
    lastActive: "2024-03-21",
    conversionRate: "4.1%",
    affiliateLink: "https://solar-pro.fr/ref/pierre-durand",
  },
  {
    id: "4",
    name: "Sophie Bernard",
    email: "sophie.bernard@example.com",
    status: "inactive",
    leads: 23,
    revenue: 1200,
    commission: 480,
    joinDate: "2024-01-05",
    lastActive: "2024-02-15",
    conversionRate: "2.5%",
    affiliateLink: "https://solar-pro.fr/ref/sophie-bernard",
  }
];

export const AffiliatesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return styles[status as keyof typeof styles] || styles.inactive;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Lien d'affiliation copié !");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-2 flex-1 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un affilié..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
        <Button className="w-full sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Nouvel Affilié
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Badge 
          variant={selectedStatus === 'all' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedStatus('all')}
        >
          Tous
        </Badge>
        <Badge 
          variant={selectedStatus === 'active' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedStatus('active')}
        >
          Actifs
        </Badge>
        <Badge 
          variant={selectedStatus === 'pending' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedStatus('pending')}
        >
          En attente
        </Badge>
        <Badge 
          variant={selectedStatus === 'inactive' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedStatus('inactive')}
        >
          Inactifs
        </Badge>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Affilié</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Revenus Générés</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Taux Conv.</TableHead>
                <TableHead>Lien d'Affiliation</TableHead>
                <TableHead>Dernière Activité</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAffiliates.map((affiliate) => (
                <TableRow key={affiliate.id} className="group">
                  <TableCell>
                    <div>
                      <p className="font-medium">{affiliate.name}</p>
                      <p className="text-sm text-muted-foreground">{affiliate.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(affiliate.status)}>
                      {affiliate.status === 'active' ? 'Actif' : 
                       affiliate.status === 'pending' ? 'En attente' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell>{affiliate.leads}</TableCell>
                  <TableCell>{affiliate.revenue}€</TableCell>
                  <TableCell>{affiliate.commission}€</TableCell>
                  <TableCell>{affiliate.conversionRate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {affiliate.affiliateLink}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => copyToClipboard(affiliate.affiliateLink)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(affiliate.lastActive).toLocaleDateString('fr-FR')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Envoyer un email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Voir le profil
                        </DropdownMenuItem>
                        {affiliate.status === 'pending' && (
                          <DropdownMenuItem>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Approuver
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </motion.div>
  );
};
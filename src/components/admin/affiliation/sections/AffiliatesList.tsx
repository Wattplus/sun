import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Search, Filter, Download, Mail, ExternalLink, MoreVertical, Copy, CheckCircle2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAffiliatesData } from "@/hooks/affiliates/useAffiliatesData";

export const AffiliatesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { data: affiliates, isLoading } = useAffiliatesData();

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

  const filteredAffiliates = affiliates?.filter((affiliate) => {
    const matchesSearch =
      affiliate.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || affiliate.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

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
                <TableHead>Dernière Activité</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAffiliates?.map((affiliate) => (
                <TableRow key={affiliate.id} className="group">
                  <TableCell>
                    <div>
                      <p className="font-medium">{affiliate.company_name}</p>
                      <p className="text-sm text-muted-foreground">{affiliate.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(affiliate.status)}>
                      {affiliate.status === 'active' ? 'Actif' : 
                       affiliate.status === 'pending' ? 'En attente' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell>{affiliate.total_leads}</TableCell>
                  <TableCell>{affiliate.total_revenue}€</TableCell>
                  <TableCell>{affiliate.total_commission}€</TableCell>
                  <TableCell>{((affiliate.total_leads / affiliate.total_revenue) * 100).toFixed(1)}%</TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(affiliate.last_active).toLocaleDateString('fr-FR')}
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
import { InstallerLayout } from "../navigation/InstallerLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLeadsSync } from "@/hooks/useLeadsSync";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Search, Filter, TrendingUp, Users, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useState } from "react";

export const PurchasedLeadsPage = () => {
  const { leads, isLoading } = useLeadsSync();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Calcul des statistiques
  const totalLeads = leads?.length || 0;
  const completedLeads = leads?.filter(lead => 
    lead.firstName && 
    lead.lastName && 
    lead.email && 
    lead.phone && 
    lead.postalCode && 
    lead.roofType && 
    lead.monthlyBill
  ).length || 0;
  const conversionRate = totalLeads > 0 ? Math.round((completedLeads / totalLeads) * 100) : 0;
  const averageMonthlyBill = leads?.reduce((acc, lead) => {
    const bill = parseInt(lead.monthlyBill || '0');
    return acc + bill;
  }, 0) / totalLeads || 0;

  // Filtrage des leads
  const filteredLeads = leads?.filter(lead => {
    const matchesSearch = searchTerm === "" || 
      lead.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.city?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || lead.installerStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nouveau":
        return "bg-blue-500/10 text-blue-600";
      case "contacte":
        return "bg-purple-500/10 text-purple-600";
      case "devis_envoye":
        return "bg-amber-500/10 text-amber-600";
      case "rdv_planifie":
        return "bg-emerald-500/10 text-emerald-600";
      case "negociation":
        return "bg-orange-500/10 text-orange-600";
      case "signe":
        return "bg-green-500/10 text-green-600";
      case "perdu":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  return (
    <InstallerLayout>
      <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
        <InstallerBreadcrumb />
        <div className="max-w-[1600px] mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
              Mes Leads Achetés
            </h1>
            <p className="text-muted-foreground">
              Gérez et suivez vos leads achetés de manière efficace
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                    <h3 className="text-2xl font-bold">{totalLeads}</h3>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Leads Complets</p>
                    <h3 className="text-2xl font-bold">{completedLeads}</h3>
                    <p className="text-xs text-muted-foreground">{conversionRate}% de complétion</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Facture Moyenne</p>
                    <h3 className="text-2xl font-bold">{Math.round(averageMonthlyBill)}€/mois</h3>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">En Négociation</p>
                    <h3 className="text-2xl font-bold">
                      {leads?.filter(lead => lead.installerStatus === 'negociation').length || 0}
                    </h3>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, email ou ville..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="nouveau">Nouveau</SelectItem>
                    <SelectItem value="contacte">Contacté</SelectItem>
                    <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
                    <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
                    <SelectItem value="negociation">En négociation</SelectItem>
                    <SelectItem value="signe">Signé</SelectItem>
                    <SelectItem value="perdu">Perdu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
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
                    {filteredLeads?.map((lead) => (
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
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </Card>
        </div>
      </div>
    </InstallerLayout>
  );
};
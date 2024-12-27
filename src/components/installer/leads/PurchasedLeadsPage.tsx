import { InstallerLayout } from "../navigation/InstallerLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLeadsSync } from "@/hooks/useLeadsSync";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Search, Filter } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const PurchasedLeadsPage = () => {
  const { leads, isLoading } = useLeadsSync();

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
              Gérez et suivez vos leads achetés
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-primary/5">
              <h3 className="text-sm font-medium text-muted-foreground">Total Leads</h3>
              <p className="text-2xl font-bold">{totalLeads}</p>
            </Card>
            <Card className="p-4 bg-primary/5">
              <h3 className="text-sm font-medium text-muted-foreground">Leads Complets</h3>
              <p className="text-2xl font-bold">{completedLeads}</p>
              <p className="text-xs text-muted-foreground">{conversionRate}% de complétion</p>
            </Card>
            <Card className="p-4 bg-primary/5">
              <h3 className="text-sm font-medium text-muted-foreground">Facture Moyenne</h3>
              <p className="text-2xl font-bold">{Math.round(averageMonthlyBill)}€/mois</p>
            </Card>
            <Card className="p-4 bg-primary/5">
              <h3 className="text-sm font-medium text-muted-foreground">Leads en Négociation</h3>
              <p className="text-2xl font-bold">
                {leads?.filter(lead => lead.installerStatus === 'negociation').length || 0}
              </p>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, email ou ville..."
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="all">
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
                      <TableHead>Type de projet</TableHead>
                      <TableHead>Prénom</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Téléphone</TableHead>
                      <TableHead>Code postal</TableHead>
                      <TableHead>Type de toit</TableHead>
                      <TableHead>Facture mensuelle</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads?.map((lead) => (
                      <TableRow key={lead.id} className="hover:bg-primary/5">
                        <TableCell>
                          <Badge variant="outline" className={lead.projectType === 'professional' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}>
                            {lead.projectType === 'professional' ? 'Professionnel' : 'Résidentiel'}
                          </Badge>
                        </TableCell>
                        <TableCell>{lead.firstName}</TableCell>
                        <TableCell>{lead.lastName}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.phone}</TableCell>
                        <TableCell>{lead.postalCode}</TableCell>
                        <TableCell>{lead.roofType || 'Non renseigné'}</TableCell>
                        <TableCell>{lead.monthlyBill ? `${lead.monthlyBill}€/mois` : 'Non renseigné'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-primary/10">
                            {lead.installerStatus || 'Nouveau'}
                          </Badge>
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
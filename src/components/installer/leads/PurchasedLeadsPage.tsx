import { InstallerLayout } from "../navigation/InstallerLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLeadsSync } from "@/hooks/useLeadsSync";
import { PurchasedLeads } from "../dashboard/PurchasedLeads";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Search, Filter } from "lucide-react";

export const PurchasedLeadsPage = () => {
  const { leads, isLoading } = useLeadsSync();

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
              <PurchasedLeads leads={leads} />
            )}
          </Card>
        </div>
      </div>
    </InstallerLayout>
  );
};
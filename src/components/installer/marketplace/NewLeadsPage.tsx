import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Lead } from "@/types/crm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { InstallerLayout } from "../navigation/InstallerLayout";
import { useLeadsSync } from "@/hooks/useLeadsSync";
import { Card } from "@/components/ui/card";
import { BalanceSection } from "./sections/BalanceSection";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const NewLeadsPage = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const { toast } = useToast();
  const balance = 150;
  const hasEnoughBalance = balance >= 26;

  const handleLeadSelect = (lead: Lead) => {
    if (selectedLeads.some(l => l.id === lead.id)) {
      setSelectedLeads(selectedLeads.filter(l => l.id !== lead.id));
    } else {
      setSelectedLeads([...selectedLeads, lead]);
    }
  };

  const handlePurchase = () => {
    if (!hasEnoughBalance) {
      toast({
        title: "Solde insuffisant",
        description: "Veuillez recharger votre compte pour acheter ce lead.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Achat de lead",
      description: "Redirection vers le paiement...",
    });
  };

  return (
    <InstallerLayout>
      <div className="min-h-screen bg-gradient-to-b from-background/95 to-background">
        <div className="max-w-[1400px] mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <InstallerBreadcrumb />
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtrer
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
            </div>
          </div>
          
          <BalanceSection 
            balance={balance}
            onPrepaidAccount={() => {}}
          />

          <Card className="overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm">
            <div className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-primary/10 hover:bg-primary/5">
                      <TableHead className="text-primary">Type de projet</TableHead>
                      <TableHead className="text-primary">Prénom</TableHead>
                      <TableHead className="text-primary">Nom</TableHead>
                      <TableHead className="text-primary">Email</TableHead>
                      <TableHead className="text-primary">Téléphone</TableHead>
                      <TableHead className="text-primary">Code postal</TableHead>
                      <TableHead className="text-primary">Type de toit</TableHead>
                      <TableHead className="text-primary">Facture mensuelle</TableHead>
                      <TableHead className="text-primary">Installation électrique</TableHead>
                      <TableHead className="text-primary w-[100px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAvailableLeads.map((lead) => (
                      <TableRow 
                        key={lead.id}
                        className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                      >
                        <TableCell className="text-white font-medium">
                          {lead.projectType === 'residential' ? 'Résidentiel' : 'Professionnel'}
                        </TableCell>
                        <TableCell className="text-white">{lead.firstName}</TableCell>
                        <TableCell className="text-white">{lead.lastName}</TableCell>
                        <TableCell className="text-white">{lead.email}</TableCell>
                        <TableCell className="text-white">{lead.phone}</TableCell>
                        <TableCell className="text-white">{lead.postalCode}</TableCell>
                        <TableCell className="text-white">{lead.roofType || "Non spécifié"}</TableCell>
                        <TableCell className="text-white">{lead.monthlyBill || "Non spécifié"}€</TableCell>
                        <TableCell className="text-white">{lead.electricalType || "Non spécifié"}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleLeadSelect(lead)}
                            variant={selectedLeads.some(l => l.id === lead.id) ? "secondary" : "outline"}
                            className="w-full bg-primary/10 hover:bg-primary/20 border-primary/20"
                          >
                            {selectedLeads.some(l => l.id === lead.id) ? "Désélectionner" : "Sélectionner"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>

          {selectedLeads.length > 0 && (
            <Card className="p-6 border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} sélectionné{selectedLeads.length > 1 ? 's' : ''}
                  </h3>
                  <p className="text-primary/80">Total: {selectedLeads.length * 26}€</p>
                </div>
                <Button 
                  onClick={handlePurchase}
                  className="bg-primary hover:bg-primary/90 text-white px-6"
                  size="lg"
                  disabled={!hasEnoughBalance}
                >
                  {hasEnoughBalance ? "Acheter la sélection" : "Recharger pour acheter"}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </InstallerLayout>
  );
};
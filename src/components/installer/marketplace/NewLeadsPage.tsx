import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Lead } from "@/types/crm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { InstallerLayout } from "../navigation/InstallerLayout";
import { useLeadsSync } from "@/hooks/useLeadsSync";
import { LeadsList } from "../dashboard/LeadsList";
import { Card } from "@/components/ui/card";
import { BalanceSection } from "./sections/BalanceSection";
import { PricingCards } from "./sections/PricingCards";
import { BottomCTA } from "./sections/BottomCTA";
import { mockAvailableLeads } from "../dashboard/mockAvailableLeads";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const NewLeadsPage = () => {
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);
  const { toast } = useToast();
  const balance = 150;
  const hasEnoughBalance = balance >= 26;
  const recommendedBalance = 200;
  const needsTopUp = balance < recommendedBalance;

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

  const handlePrepaidAccount = () => {
    toast({
      title: "Compte prépayé",
      description: "Redirection vers la recharge du compte...",
    });
  };

  return (
    <InstallerLayout>
      <div className="max-w-7xl mx-auto space-y-6 p-4 min-h-screen bg-background">
        <InstallerBreadcrumb />
        
        <BalanceSection 
          balance={balance}
          onPrepaidAccount={handlePrepaidAccount}
        />

        {needsTopUp && (
          <Alert className="bg-secondary/10 border-secondary/20 text-white">
            <AlertCircle className="h-4 w-4 text-secondary" />
            <AlertDescription>
              Nous recommandons de maintenir un solde minimum de {recommendedBalance}€ pour ne pas manquer d'opportunités.{' '}
              <Button 
                variant="link" 
                className="text-secondary p-0 h-auto font-semibold hover:text-secondary/80"
                onClick={handlePrepaidAccount}
              >
                Recharger maintenant
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Card className="p-6 bg-background/50 border-secondary/20">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/10">
                  <TableHead className="text-white">Type de projet</TableHead>
                  <TableHead className="text-white">Prénom</TableHead>
                  <TableHead className="text-white">Nom</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Téléphone</TableHead>
                  <TableHead className="text-white">Code postal</TableHead>
                  <TableHead className="text-white">Type de toit</TableHead>
                  <TableHead className="text-white">Facture mensuelle</TableHead>
                  <TableHead className="text-white">Installation électrique</TableHead>
                  <TableHead className="text-white">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAvailableLeads.map((lead) => (
                  <TableRow 
                    key={lead.id}
                    className="border-b border-secondary/10 hover:bg-secondary/5"
                  >
                    <TableCell className="text-white">{lead.projectType}</TableCell>
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
                        className="w-full"
                      >
                        {selectedLeads.some(l => l.id === lead.id) ? "Désélectionner" : "Sélectionner"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {selectedLeads.length > 0 && (
          <Card className="p-6 bg-secondary/5 border-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">
                  {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} sélectionné{selectedLeads.length > 1 ? 's' : ''}
                </h3>
                <p className="text-white/60">Total: {selectedLeads.length * 26}€</p>
              </div>
              <Button 
                onClick={handlePurchase}
                className="bg-secondary hover:bg-secondary/90 text-white px-6"
                size="lg"
                disabled={!hasEnoughBalance}
              >
                {hasEnoughBalance ? "Acheter la sélection" : "Recharger pour acheter"}
              </Button>
            </div>
          </Card>
        )}

        <BottomCTA onPrepaidAccount={handlePrepaidAccount} />
      </div>
    </InstallerLayout>
  );
};
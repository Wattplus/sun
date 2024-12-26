import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ClientInfoForm } from "@/components/client/dashboard/ClientInfoForm";
import { Lead } from "@/types/crm";
import { useToast } from "@/hooks/use-toast";

interface LeadDetailsDialogProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
}

export const LeadDetailsDialog = ({ lead, open, onClose, onOpenChange }: LeadDetailsDialogProps) => {
  const { toast } = useToast();

  const handleFormUpdate = (value: string) => {
    toast({
      title: "Informations mises à jour",
      description: "Les modifications ont été enregistrées avec succès.",
    });
  };

  // Convertir le budget en string pour le formulaire
  const budgetString = lead.budget ? lead.budget.toString() : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Détails du client</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="mt-4 max-h-[80vh] overflow-y-auto">
          <ClientInfoForm 
            onMonthlyBillUpdate={handleFormUpdate}
            initialValues={{
              firstName: lead.firstName || '',
              lastName: lead.lastName || '',
              email: lead.email || '',
              phone: lead.phone || '',
              clientType: lead.projectType === 'residential' ? 'particulier' : 'professionnel',
              roofType: lead.roofType || '',
              monthlyBillEuros: lead.monthlyBill || '',
              electricalType: lead.electricalType || 'monophase',
              address: lead.address || '',
              postalCode: lead.postalCode || '',
              city: lead.city || '',
              budget: budgetString,
              projectType: lead.projectType || 'residential',
              notes: lead.notes || ''
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
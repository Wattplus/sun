import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Send } from "lucide-react";
import { ClientInfoForm } from "@/components/client/dashboard/ClientInfoForm";
import { Lead } from "@/types/crm";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface LeadDetailsDialogProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
}

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

export const LeadDetailsDialog = ({ lead, open, onClose, onOpenChange }: LeadDetailsDialogProps) => {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const handleFormUpdate = (value: string) => {
    toast({
      title: "Informations mises à jour",
      description: "Les modifications ont été enregistrées avec succès.",
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        text: newComment,
        createdAt: new Date().toISOString(),
        author: "Installateur",
      };
      
      setComments([...comments, comment]);
      setNewComment("");
      
      toast({
        title: "Commentaire ajouté",
        description: "Le commentaire a été ajouté avec succès.",
      });
    }
  };

  // Convertir le budget en string pour le formulaire
  const budgetString = lead.budget ? lead.budget.toString() : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Détails du client</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(90vh-200px)]">
            <div className="space-y-6 p-1">
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

              <div className="space-y-4 border-t pt-6">
                <h3 className="font-medium text-lg">Historique des commentaires</h3>
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-primary/5 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(comment.createdAt), 'dd/MM/yyyy HH:mm', { locale: fr })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Ajouter un commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          <Button 
            onClick={handleAddComment} 
            className="w-full mt-2"
            disabled={!newComment.trim()}
          >
            <Send className="h-4 w-4 mr-2" />
            Ajouter un commentaire
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
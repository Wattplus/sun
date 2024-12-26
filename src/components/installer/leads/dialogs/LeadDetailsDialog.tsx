import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { X, Send, Trash2 } from "lucide-react";
import { ClientInfoForm } from "@/components/client/dashboard/ClientInfoForm";
import { Lead, InstallerLeadStatus } from "@/types/crm";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

interface LeadDetailsDialogProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  onStatusChange?: (leadId: string, status: InstallerLeadStatus) => void;
}

export const LeadDetailsDialog = ({ 
  lead, 
  open, 
  onClose, 
  onOpenChange,
  onStatusChange 
}: LeadDetailsDialogProps) => {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

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

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    toast({
      title: "Commentaire supprimé",
      description: "Le commentaire a été supprimé avec succès.",
    });
  };

  const handleStatusChange = (status: InstallerLeadStatus) => {
    if (onStatusChange) {
      onStatusChange(lead.id, status);
      toast({
        title: "Statut mis à jour",
        description: "Le statut du lead a été mis à jour avec succès.",
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
              <div className="flex items-center justify-between bg-primary/5 p-4 rounded-lg">
                <h3 className="font-medium">Statut du lead</h3>
                <Select
                  value={lead.installerStatus || 'nouveau'}
                  onValueChange={(value: InstallerLeadStatus) => handleStatusChange(value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nouveau">Nouveau lead</SelectItem>
                    <SelectItem value="contacte">Contacté</SelectItem>
                    <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
                    <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
                    <SelectItem value="negociation">En négociation</SelectItem>
                    <SelectItem value="signe">Signé</SelectItem>
                    <SelectItem value="perdu">Perdu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                    <div key={comment.id} className="bg-primary/5 p-4 rounded-lg space-y-2 relative group">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(comment.createdAt), 'dd/MM/yyyy HH:mm', { locale: fr })}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteComment(comment.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
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
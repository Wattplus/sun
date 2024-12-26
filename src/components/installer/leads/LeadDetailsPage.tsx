import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockPurchasedLeads } from "../dashboard/mockPurchasedLeads";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Edit2, Save, X } from "lucide-react";
import { LeadContactInfo } from "./LeadContactInfo";
import { LeadProjectInfo } from "./LeadProjectInfo";
import { LeadComments } from "./LeadComments";

export const LeadDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const lead = mockPurchasedLeads.find((l) => l.id === id);
  const [status, setStatus] = useState(lead?.status || "nouveau");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Array<{ text: string; date: string }>>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead);

  if (!lead) {
    return <div>Lead non trouvé</div>;
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    toast({
      title: "Statut mis à jour",
      description: "Le statut du lead a été mis à jour avec succès.",
    });
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([
        { text: comment, date: new Date().toLocaleDateString() },
        ...comments,
      ]);
      setComment("");
      toast({
        title: "Commentaire ajouté",
        description: "Votre commentaire a été ajouté avec succès.",
      });
    }
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    toast({
      title: "Modifications enregistrées",
      description: "Les informations du lead ont été mises à jour avec succès.",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedLead(lead);
  };

  return (
    <div className="space-y-6 p-6">
      <InstallerBreadcrumb />
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {lead.firstName} {lead.lastName}
        </h1>
        <div className="flex gap-4 items-center">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nouveau">Nouveau</SelectItem>
              <SelectItem value="contacte">Contacté</SelectItem>
              <SelectItem value="devis_envoye">Devis envoyé</SelectItem>
              <SelectItem value="rdv_planifie">RDV planifié</SelectItem>
              <SelectItem value="negociation">En négociation</SelectItem>
              <SelectItem value="signe">Signé</SelectItem>
              <SelectItem value="perdu">Perdu</SelectItem>
            </SelectContent>
          </Select>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="destructive" onClick={handleCancelEdit}>
                <X className="w-4 h-4 mr-2" />
                Annuler
              </Button>
              <Button onClick={handleSaveChanges}>
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeadContactInfo 
          lead={lead}
          isEditing={isEditing}
          editedLead={editedLead!}
          setEditedLead={setEditedLead}
        />
        <LeadProjectInfo 
          lead={lead}
          isEditing={isEditing}
          editedLead={editedLead!}
          setEditedLead={setEditedLead}
        />
      </div>

      <LeadComments 
        comment={comment}
        setComment={setComment}
        comments={comments}
        handleAddComment={handleAddComment}
      />
    </div>
  );
};
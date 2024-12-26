import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Edit2, Save, X } from "lucide-react";
import { LeadContactInfo } from "./LeadContactInfo";
import { LeadProjectInfo } from "./LeadProjectInfo";
import { LeadComments } from "./LeadComments";
import { useLeadsSync } from "@/hooks/useLeadsSync";

export const LeadDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Array<{ text: string; date: string }>>([]);

  // Utiliser le hook personnalisé pour la synchronisation des leads
  const { leads, isLoading, updateLead } = useLeadsSync();
  const lead = leads.find((l) => l.id === id);

  const [editedLead, setEditedLead] = useState(lead);

  // Mutation pour mettre à jour le lead
  const mutation = useMutation({
    mutationFn: updateLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchased-leads'] });
      toast({
        title: "Modifications enregistrées",
        description: "Les informations du lead ont été mises à jour avec succès.",
      });
      setIsEditing(false);
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!lead) {
    return <div>Lead non trouvé</div>;
  }

  const handleStatusChange = (newStatus: string) => {
    if (editedLead) {
      const updatedLead = { ...editedLead, installerStatus: newStatus };
      mutation.mutate(updatedLead);
    }
  };

  const handleSaveChanges = () => {
    if (editedLead) {
      mutation.mutate(editedLead);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedLead(lead);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComments = [
        { text: comment, date: new Date().toLocaleDateString() },
        ...comments,
      ];
      setComments(newComments);
      setComment("");
      
      if (editedLead) {
        const updatedLead = {
          ...editedLead,
          comments: newComments,
        };
        mutation.mutate(updatedLead);
      }

      toast({
        title: "Commentaire ajouté",
        description: "Votre commentaire a été ajouté avec succès.",
      });
    }
  };

  return (
    <div className="space-y-6 p-6">
      <InstallerBreadcrumb />
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {lead.firstName} {lead.lastName}
        </h1>
        <div className="flex gap-4 items-center">
          <Select value={lead.installerStatus} onValueChange={handleStatusChange}>
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
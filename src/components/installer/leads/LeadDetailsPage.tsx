import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLeadsSync } from "@/hooks/useLeadsSync";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LeadContactInfo } from "./LeadContactInfo";
import { LeadProjectInfo } from "./LeadProjectInfo";
import { LeadComments } from "./LeadComments";
import { LeadAppointments } from "./sections/LeadAppointments";
import { LeadDocuments } from "./sections/LeadDocuments";
import { LeadTasks } from "./sections/LeadTasks";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, FileText, Edit2, CheckSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Lead } from "@/types/crm";

export const LeadDetailsPage = () => {
  const { id } = useParams();
  const { leads, updateLead } = useLeadsSync();
  const { toast } = useToast();
  const lead = leads?.find(l => l.id === id);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Array<{ text: string; date: string }>>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState<Lead | null>(null);
  const [activeTab, setActiveTab] = useState("info");

  const handleAddComment = () => {
    if (!comment.trim()) return;

    const newComment = {
      text: comment,
      date: new Date().toLocaleString()
    };

    setComments([newComment, ...comments]);
    setComment("");

    toast({
      title: "Commentaire ajouté",
      description: "Votre commentaire a été ajouté avec succès."
    });
  };

  const handleEdit = () => {
    if (lead) {
      setEditedLead(lead);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editedLead) {
      updateLead(editedLead);
      setIsEditing(false);
      toast({
        title: "Lead mis à jour",
        description: "Les modifications ont été enregistrées avec succès."
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedLead(null);
  };

  if (!lead) {
    return (
      <div className="p-6">
        <div className="text-center">Lead non trouvé</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/80 to-background p-6 space-y-8">
      <InstallerBreadcrumb />
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
              {lead.firstName} {lead.lastName}
            </h1>
            <p className="text-muted-foreground">
              Lead créé le {new Date(lead.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-4">
            {isEditing ? (
              <>
                <Button onClick={handleSave} variant="default">
                  Sauvegarder
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  Annuler
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="gap-2" onClick={handleEdit}>
                  <Edit2 className="h-4 w-4" />
                  Modifier
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => setActiveTab("appointments")}>
                  <Calendar className="h-4 w-4" />
                  Planifier RDV
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => setActiveTab("comments")}>
                  <MessageSquare className="h-4 w-4" />
                  Envoyer message
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => setActiveTab("documents")}>
                  <FileText className="h-4 w-4" />
                  Créer devis
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => setActiveTab("tasks")}>
                  <CheckSquare className="h-4 w-4" />
                  Tâches
                </Button>
              </>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="info">Informations</TabsTrigger>
            <TabsTrigger value="comments">Commentaires</TabsTrigger>
            <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="tasks">Tâches</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LeadContactInfo 
                lead={lead} 
                isEditing={isEditing}
                editedLead={editedLead || lead}
                setEditedLead={(lead) => setEditedLead(lead)}
              />
              <LeadProjectInfo 
                lead={lead}
                isEditing={isEditing}
                editedLead={editedLead || lead}
                setEditedLead={(lead) => setEditedLead(lead)}
              />
            </div>
          </TabsContent>

          <TabsContent value="comments">
            <Card>
              <LeadComments
                comment={comment}
                setComment={setComment}
                comments={comments}
                handleAddComment={handleAddComment}
              />
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <LeadAppointments lead={lead} />
          </TabsContent>

          <TabsContent value="documents">
            <LeadDocuments lead={lead} />
          </TabsContent>

          <TabsContent value="tasks">
            <LeadTasks lead={lead} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
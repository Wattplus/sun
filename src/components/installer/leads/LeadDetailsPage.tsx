import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLeadsSync } from "@/hooks/useLeadsSync";
import { InstallerLayout } from "../navigation/InstallerLayout";
import { InstallerBreadcrumb } from "../navigation/InstallerBreadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LeadContactInfo } from "./LeadContactInfo";
import { LeadProjectInfo } from "./LeadProjectInfo";
import { LeadComments } from "./LeadComments";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const LeadDetailsPage = () => {
  const { id } = useParams();
  const { leads, updateLead } = useLeadsSync();
  const { toast } = useToast();
  const lead = leads?.find(l => l.id === id);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Array<{ text: string; date: string }>>([]);

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

  if (!lead) {
    return (
      <InstallerLayout>
        <div className="p-6">
          <div className="text-center">Lead non trouvé</div>
        </div>
      </InstallerLayout>
    );
  }

  return (
    <InstallerLayout>
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
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Planifier RDV
              </Button>
              <Button variant="outline" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Envoyer message
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Créer devis
              </Button>
            </div>
          </div>

          <Tabs defaultValue="info" className="space-y-4">
            <TabsList>
              <TabsTrigger value="info">Informations</TabsTrigger>
              <TabsTrigger value="comments">Commentaires</TabsTrigger>
              <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LeadContactInfo lead={lead} />
                <LeadProjectInfo lead={lead} />
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
              <Card className="p-6">
                <p className="text-muted-foreground">
                  Fonctionnalité de gestion des rendez-vous à venir...
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="p-6">
                <p className="text-muted-foreground">
                  Fonctionnalité de gestion des documents à venir...
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </InstallerLayout>
  );
};
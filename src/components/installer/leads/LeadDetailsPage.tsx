import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPurchasedLeads } from "../dashboard/mockPurchasedLeads";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const LeadDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const lead = mockPurchasedLeads.find((l) => l.id === id);
  const [status, setStatus] = useState(lead?.status || "nouveau");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Array<{ text: string; date: string }>>([]);

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">
          {lead.firstName} {lead.lastName}
        </h1>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations de contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{lead.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <p className="font-medium">{lead.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Adresse</p>
              <p className="font-medium">
                {lead.address}
                <br />
                {lead.postalCode} {lead.city}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails du projet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Type de projet</p>
              <p className="font-medium">{lead.projectType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="font-medium">{lead.budget}€</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Notes</p>
              <p className="font-medium">{lead.notes}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commentaires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Textarea
                placeholder="Ajouter un commentaire..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddComment}>Ajouter</Button>
            </div>
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-2">
                    {comment.date}
                  </p>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
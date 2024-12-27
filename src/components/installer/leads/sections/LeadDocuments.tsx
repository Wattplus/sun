import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lead } from "@/types/crm";
import { FileText, Upload, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface LeadDocumentsProps {
  lead: Lead;
}

export const LeadDocuments = ({ lead }: LeadDocumentsProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Document ajouté",
      description: `Le document ${selectedFile.name} a été ajouté avec succès`,
    });

    setSelectedFile(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter un document</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Type de document</label>
            <select className="w-full p-2 border rounded-md">
              <option value="devis">Devis</option>
              <option value="facture">Facture</option>
              <option value="contrat">Contrat</option>
              <option value="technique">Document technique</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Fichier</label>
            <Input
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx"
            />
          </div>
          <Button onClick={handleUpload} className="w-full gap-2">
            <Upload className="h-4 w-4" />
            Téléverser
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Devis initial</span>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
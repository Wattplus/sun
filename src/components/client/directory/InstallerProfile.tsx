import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Star, Building, CheckCircle, Calendar, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { mockInstallers } from "@/components/admin/InstallerManagement";

export const InstallerProfile = () => {
  const { id } = useParams();
  const installer = mockInstallers.find(inst => inst.id === id);

  if (!installer) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-primary">Installateur non trouvé</h2>
        <p className="text-muted-foreground mt-2">L'installateur que vous recherchez n'existe pas.</p>
      </div>
    );
  }

  const handleCall = () => {
    window.location.href = `tel:${installer.phone}`;
    toast.success("Appel en cours...");
  };

  const handleEmail = () => {
    window.location.href = `mailto:${installer.email}`;
    toast.success("Ouverture de votre messagerie...");
  };

  return (
    <div className="container mx-auto p-6 space-y-6 animate-fade-in">
      <Card className="p-8 bg-background/95 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">{installer.companyName}</h1>
              <p className="text-muted-foreground mt-2">
                Installateur certifié depuis {installer.yearFounded}
              </p>
            </div>
            <Badge variant="outline" className="gap-2">
              <Star className="w-4 h-4" />
              {installer.conversionRate}% de satisfaction
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                <span>SIRET: {installer.siret}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Zones d'intervention: {installer.zones.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Créé en {installer.yearFounded}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>{installer.leadsAssigned} projets réalisés</span>
              </div>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Certifications
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {installer.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="justify-center">
                    {cert}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Button
              className="flex-1 gap-2"
              variant="outline"
              onClick={handleCall}
            >
              <Phone className="w-4 h-4" />
              Appeler
            </Button>
            <Button
              className="flex-1 gap-2"
              variant="outline"
              onClick={handleEmail}
            >
              <Mail className="w-4 h-4" />
              Envoyer un email
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
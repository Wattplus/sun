import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Camera, Save, Award, BadgeCheck } from "lucide-react";
import { Installer } from "@/types/crm";

export const InstallerProfile = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Installer>>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    zones: [],
    description: "",
    certifications: {
      qualiPV: false,
      rge: false,
      qualibat: false
    },
    specialties: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-background/50 backdrop-blur-md p-8 rounded-xl border border-primary/20 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Profil Installateur</h1>
          <Button onClick={() => console.log("Upload photo")} variant="outline" size="icon">
            <Camera className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom de l'entreprise</label>
              <Input
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Votre entreprise"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nom du contact</label>
              <Input
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="Nom complet"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@exemple.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Téléphone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Adresse</label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Adresse complète"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Zones d'intervention</label>
            <Input
              value={formData.zones?.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  zones: e.target.value.split(",").map((zone) => zone.trim()),
                })
              }
              placeholder="75, 92, 93, 94"
            />
            <p className="text-sm text-muted-foreground">
              Séparez les codes postaux par des virgules
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description de l'entreprise</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Décrivez votre entreprise, votre expérience..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-emerald-500" />
              <h3 className="font-medium">Certifications</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                <Award className="h-4 w-4 mr-2" />
                QualiPV
              </Button>
              <Button variant="outline" className="justify-start">
                <Award className="h-4 w-4 mr-2" />
                QualiBat
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            <Save className="h-4 w-4 mr-2" />
            Enregistrer le profil
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InstallerProfile;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Award } from "lucide-react";

interface CertificationsSectionProps {
  data: any;
}

export const CertificationsSection = ({ data }: CertificationsSectionProps) => {
  const [certifications, setCertifications] = useState(data?.certifications || {
    qualiPV: false,
    rge: false,
    qualibat: false,
  });

  const handleToggle = (cert: string) => {
    setCertifications(prev => ({
      ...prev,
      [cert]: !prev[cert]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("installers")
        .update({ certifications })
        .eq("id", data.id);

      if (error) throw error;
      toast.success("Certifications mises à jour avec succès");
    } catch (error) {
      console.error("Error updating certifications:", error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">QualiPV</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={certifications.qualiPV}
              onCheckedChange={() => handleToggle("qualiPV")}
            />
            <Label>Certification QualiPV</Label>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">RGE</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={certifications.rge}
              onCheckedChange={() => handleToggle("rge")}
            />
            <Label>Certification RGE</Label>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Qualibat</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={certifications.qualibat}
              onCheckedChange={() => handleToggle("qualibat")}
            />
            <Label>Certification Qualibat</Label>
          </div>
        </Card>
      </div>

      <Button type="submit" className="w-full md:w-auto">
        <Save className="w-4 h-4 mr-2" />
        Enregistrer les certifications
      </Button>
    </form>
  );
};
import { useState } from "react";
import { FormField } from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

interface ClientInfo {
  roofType: string;
  monthlyConsumption: string;
  electricPhase: string;
  address: string;
  postalCode: string;
  city: string;
}

export const ClientInfoForm = () => {
  const { toast } = useToast();
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    roofType: "",
    monthlyConsumption: "",
    electricPhase: "mono",
    address: "",
    postalCode: "",
    city: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setClientInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Informations mises à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Complétez vos informations</h3>
      <p className="text-sm text-gray-500 mb-6">
        Ces informations nous permettront de mieux évaluer vos besoins en installation solaire
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Type de toit</label>
          <Select
            value={clientInfo.roofType}
            onValueChange={(value) => handleSelectChange("roofType", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez le type de toit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tuiles">Tuiles</SelectItem>
              <SelectItem value="ardoises">Ardoises</SelectItem>
              <SelectItem value="tole">Tôle</SelectItem>
              <SelectItem value="terrasse">Terrasse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <FormField
          label="Consommation mensuelle (kWh)"
          id="monthlyConsumption"
          type="number"
          value={clientInfo.monthlyConsumption}
          onChange={handleChange}
          placeholder="Ex: 300"
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Type d'installation électrique</label>
          <Select
            value={clientInfo.electricPhase}
            onValueChange={(value) => handleSelectChange("electricPhase", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionnez le type d'installation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mono">Monophasé</SelectItem>
              <SelectItem value="tri">Triphasé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          <FormField
            label="Adresse"
            id="address"
            value={clientInfo.address}
            onChange={handleChange}
            placeholder="123 rue de la République"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Code postal"
              id="postalCode"
              value={clientInfo.postalCode}
              onChange={handleChange}
              placeholder="75001"
            />
            <FormField
              label="Ville"
              id="city"
              value={clientInfo.city}
              onChange={handleChange}
              placeholder="Paris"
            />
          </div>
        </div>

        <Button type="submit" className="w-full gap-2">
          <Save className="w-4 h-4" />
          Enregistrer mes informations
        </Button>
      </form>
    </Card>
  );
};
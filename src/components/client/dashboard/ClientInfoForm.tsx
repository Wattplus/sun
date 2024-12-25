import { useState } from "react";
import { FormField } from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Save, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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

  const [errors, setErrors] = useState<Partial<ClientInfo>>({});

  const validateForm = () => {
    const newErrors: Partial<ClientInfo> = {};
    
    if (!clientInfo.roofType) newErrors.roofType = "Le type de toit est requis";
    if (!clientInfo.monthlyConsumption) newErrors.monthlyConsumption = "La consommation est requise";
    if (!clientInfo.address) newErrors.address = "L'adresse est requise";
    if (!clientInfo.postalCode) {
      newErrors.postalCode = "Le code postal est requis";
    } else if (!/^\d{5}$/.test(clientInfo.postalCode)) {
      newErrors.postalCode = "Format invalide (5 chiffres)";
    }
    if (!clientInfo.city) newErrors.city = "La ville est requise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ClientInfo]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setClientInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ClientInfo]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      toast({
        title: "Informations mises à jour",
        description: "Vos informations ont été enregistrées avec succès.",
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
      });
    }
  };

  return (
    <Card className="p-6 glass-panel">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-4 gradient-text">Complétez vos informations</h3>
        <p className="text-sm text-gray-400 mb-6">
          Ces informations nous permettront de mieux évaluer vos besoins en installation solaire
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Type de toit</label>
            <Select
              value={clientInfo.roofType}
              onValueChange={(value) => handleSelectChange("roofType", value)}
            >
              <SelectTrigger className="w-full bg-background-dark/50 border-gray-700">
                <SelectValue placeholder="Sélectionnez le type de toit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tuiles">Tuiles</SelectItem>
                <SelectItem value="ardoises">Ardoises</SelectItem>
                <SelectItem value="tole">Tôle</SelectItem>
                <SelectItem value="terrasse">Terrasse</SelectItem>
              </SelectContent>
            </Select>
            {errors.roofType && <p className="text-red-400 text-sm mt-1">{errors.roofType}</p>}
          </div>

          <FormField
            label="Consommation mensuelle (kWh)"
            id="monthlyConsumption"
            type="number"
            value={clientInfo.monthlyConsumption}
            onChange={handleChange}
            placeholder="Ex: 300"
            error={errors.monthlyConsumption}
            lightMode
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Type d'installation électrique</label>
            <Select
              value={clientInfo.electricPhase}
              onValueChange={(value) => handleSelectChange("electricPhase", value)}
            >
              <SelectTrigger className="w-full bg-background-dark/50 border-gray-700">
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
              error={errors.address}
              lightMode
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Code postal"
                id="postalCode"
                value={clientInfo.postalCode}
                onChange={handleChange}
                placeholder="75001"
                error={errors.postalCode}
                lightMode
              />
              <FormField
                label="Ville"
                id="city"
                value={clientInfo.city}
                onChange={handleChange}
                placeholder="Paris"
                error={errors.city}
                lightMode
              />
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button type="submit" className="w-full gap-2 glass-button">
              <Save className="w-4 h-4" />
              Enregistrer mes informations
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </Card>
  );
};
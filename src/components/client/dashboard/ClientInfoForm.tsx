import { useState } from "react";
import { FormField } from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, Euro } from "lucide-react";
import { motion } from "framer-motion";

interface ClientInfo {
  roofType: string;
  monthlyConsumption: string;
  monthlyBillEuros: string;
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
    monthlyBillEuros: "",
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
    if (!clientInfo.monthlyBillEuros) newErrors.monthlyBillEuros = "La facture mensuelle est requise";
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

  const calculateAnnualBill = () => {
    const monthlyBill = parseFloat(clientInfo.monthlyBillEuros);
    if (!isNaN(monthlyBill)) {
      return (monthlyBill * 12).toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      });
    }
    return "0 €";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      toast({
        title: "Informations mises à jour",
        description: "Vos informations ont été enregistrées avec succès.",
        duration: 3000
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
                <SelectItem value="tuiles-plates">Tuiles plates</SelectItem>
                <SelectItem value="tuiles-mecaniques">Tuiles mécaniques</SelectItem>
                <SelectItem value="tuiles-romaines">Tuiles romaines</SelectItem>
                <SelectItem value="ardoises-naturelles">Ardoises naturelles</SelectItem>
                <SelectItem value="ardoises-fibrociment">Ardoises fibrociment</SelectItem>
                <SelectItem value="bac-acier">Bac acier</SelectItem>
                <SelectItem value="zinc">Zinc</SelectItem>
                <SelectItem value="tole-ondulee">Tôle ondulée</SelectItem>
                <SelectItem value="terrasse-beton">Terrasse béton</SelectItem>
                <SelectItem value="terrasse-graviers">Terrasse gravillonnée</SelectItem>
                <SelectItem value="shingle">Shingle</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
            {errors.roofType && <p className="text-red-400 text-sm mt-1">{errors.roofType}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <FormField
                label="Facture mensuelle (€)"
                id="monthlyBillEuros"
                type="number"
                value={clientInfo.monthlyBillEuros}
                onChange={handleChange}
                placeholder="Ex: 150"
                error={errors.monthlyBillEuros}
                lightMode
              />
              {clientInfo.monthlyBillEuros && !errors.monthlyBillEuros && (
                <div className="text-sm text-green-400 mt-1">
                  Facture annuelle estimée : {calculateAnnualBill()}
                </div>
              )}
            </div>
          </div>

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
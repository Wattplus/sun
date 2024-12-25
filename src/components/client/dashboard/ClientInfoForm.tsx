import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { motion } from "framer-motion";
import { RoofTypeSelect } from "./RoofTypeSelect";
import { MonthlyBillInput } from "./MonthlyBillInput";
import { AddressFields } from "./AddressFields";

interface ClientInfo {
  roofType: string;
  monthlyBillEuros: string;
  electricPhase: string;
  address: string;
  postalCode: string;
  city: string;
}

interface ClientInfoFormProps {
  onMonthlyBillUpdate: (value: string) => void;
}

export const ClientInfoForm = ({ onMonthlyBillUpdate }: ClientInfoFormProps) => {
  const { toast } = useToast();
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    roofType: "",
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
    
    // Mettre à jour la facture mensuelle pour le calcul des économies
    if (name === "monthlyBillEuros") {
      onMonthlyBillUpdate(value);
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
          <RoofTypeSelect
            value={clientInfo.roofType}
            onChange={(value) => handleSelectChange("roofType", value)}
            error={errors.roofType}
          />

          <MonthlyBillInput
            value={clientInfo.monthlyBillEuros}
            onChange={handleChange}
            error={errors.monthlyBillEuros}
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

          <AddressFields
            address={clientInfo.address}
            postalCode={clientInfo.postalCode}
            city={clientInfo.city}
            onChange={handleChange}
            errors={errors}
          />

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
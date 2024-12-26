import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RoofTypeSelect } from "./RoofTypeSelect";
import { MonthlyBillInput } from "./MonthlyBillInput";
import { AddressFields } from "./AddressFields";
import { ElectricalTypeSelect } from "./ElectricalTypeSelect";
import { BudgetInput } from "./BudgetInput";
import { ClientTypeSelect } from "./ClientTypeSelect";

interface ClientInfo {
  clientType: string;
  roofType: string;
  monthlyBillEuros: string;
  electricalType: string;
  address: string;
  postalCode: string;
  city: string;
  budget: string;
  projectType: string;
}

interface Props {
  onMonthlyBillUpdate: (value: string) => void;
  initialValues?: Partial<ClientInfo>;
}

export const ClientInfoForm = ({ onMonthlyBillUpdate, initialValues }: Props) => {
  const { toast } = useToast();
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    clientType: initialValues?.clientType || "",
    roofType: initialValues?.roofType || "",
    monthlyBillEuros: initialValues?.monthlyBillEuros || "",
    electricalType: initialValues?.electricalType || "monophase",
    address: initialValues?.address || "",
    postalCode: initialValues?.postalCode || "75001",
    city: initialValues?.city || "",
    budget: initialValues?.budget || "15000",
    projectType: initialValues?.projectType || "Installation Panneaux Solaires"
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string | undefined } = {};
    
    if (!clientInfo.clientType) newErrors.clientType = "Le type de client est requis";
    if (!clientInfo.roofType) newErrors.roofType = "Le type de toit est requis";
    if (!clientInfo.monthlyBillEuros) newErrors.monthlyBillEuros = "La facture mensuelle est requise";
    if (!clientInfo.address) newErrors.address = "L'adresse est requise";
    if (!clientInfo.postalCode) newErrors.postalCode = "Le code postal est requis";
    if (!clientInfo.city) newErrors.city = "La ville est requise";
    if (!clientInfo.budget) newErrors.budget = "Le budget est requis";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
    
    if (name === "monthlyBillEuros") {
      onMonthlyBillUpdate(value);
    }
  };

  const handleSelectChange = (value: string, name: string) => {
    setClientInfo(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const maskedInfo = {
        ...clientInfo,
        address: "•".repeat(clientInfo.address.length),
        city: "•".repeat(clientInfo.city.length),
      };
      
      console.log("Données masquées:", maskedInfo);
      
      toast({
        title: "Informations mises à jour",
        description: "Vos informations ont été enregistrées avec succès.",
      });
    }
  };

  return (
    <Card className="max-w-3xl mx-auto bg-background/95 backdrop-blur-sm shadow-xl">
      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold text-primary">Installation Panneaux Photovoltaïques</h2>
          <p className="text-sm text-muted-foreground">
            Complétez vos informations pour recevoir une étude personnalisée de votre projet solaire
          </p>
        </div>

        <div className="grid gap-4 md:gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <ClientTypeSelect
              value={clientInfo.clientType}
              onChange={(value) => handleSelectChange(value, "clientType")}
              error={errors.clientType}
            />

            <RoofTypeSelect
              value={clientInfo.roofType}
              onChange={(value) => handleSelectChange(value, "roofType")}
              error={errors.roofType}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <MonthlyBillInput
              value={clientInfo.monthlyBillEuros}
              onChange={handleChange}
              error={errors.monthlyBillEuros}
            />

            <ElectricalTypeSelect
              value={clientInfo.electricalType}
              onChange={(value) => handleSelectChange(value, "electricalType")}
            />
          </div>

          <div className="relative">
            <AddressFields
              address={clientInfo.address}
              postalCode={clientInfo.postalCode}
              city={clientInfo.city}
              onChange={handleChange}
              errors={errors}
            />
            <div className="absolute top-0 right-0 flex items-center text-orange-500 gap-1">
              <Lock className="h-4 w-4" />
              <span className="text-xs">Données sécurisées</span>
            </div>
          </div>

          <BudgetInput
            value={clientInfo.budget}
            onChange={handleChange}
            error={errors.budget}
          />
        </div>

        <div className="flex justify-end pt-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          </motion.div>
        </div>
      </form>
    </Card>
  );
};
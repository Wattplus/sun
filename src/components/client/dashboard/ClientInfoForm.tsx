import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { motion } from "framer-motion";
import { AddressFields } from "./AddressFields";
import { PersonalInfoFields } from "./forms/PersonalInfoFields";
import { ProjectInfoFields } from "./forms/ProjectInfoFields";

interface ClientInfoFormProps {
  onMonthlyBillUpdate?: (value: string) => void;
  initialValues?: Partial<ClientInfo>;
}

interface ClientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  clientType: string;
  roofType: string;
  monthlyBillEuros: string;
  electricalType: string;
  address: string;
  postalCode: string;
  city: string;
  budget: string;
  projectType?: string;
  notes?: string;
}

export const ClientInfoForm = ({ onMonthlyBillUpdate, initialValues = {} }: ClientInfoFormProps) => {
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    firstName: initialValues.firstName || "",
    lastName: initialValues.lastName || "",
    email: initialValues.email || "",
    phone: initialValues.phone || "",
    clientType: initialValues.clientType || "",
    roofType: initialValues.roofType || "",
    monthlyBillEuros: initialValues.monthlyBillEuros || "",
    electricalType: initialValues.electricalType || "monophase",
    address: initialValues.address || "",
    postalCode: initialValues.postalCode || "",
    city: initialValues.city || "",
    budget: initialValues.budget || "",
    projectType: initialValues.projectType,
    notes: initialValues.notes || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string | undefined } = {};
    
    if (!clientInfo.firstName) newErrors.firstName = "Le prénom est requis";
    if (!clientInfo.lastName) newErrors.lastName = "Le nom est requis";
    if (!clientInfo.email) newErrors.email = "L'email est requis";
    if (!clientInfo.phone) newErrors.phone = "Le téléphone est requis";
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
    setClientInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));

    if (name === "monthlyBillEuros" && onMonthlyBillUpdate) {
      onMonthlyBillUpdate(value);
    }
  };

  const handleSelectChange = (value: string, field: keyof ClientInfo) => {
    setClientInfo((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", clientInfo);
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

        <PersonalInfoFields
          firstName={clientInfo.firstName}
          lastName={clientInfo.lastName}
          email={clientInfo.email}
          phone={clientInfo.phone}
          onChange={handleChange}
          errors={errors}
        />

        <ProjectInfoFields
          clientType={clientInfo.clientType}
          roofType={clientInfo.roofType}
          monthlyBillEuros={clientInfo.monthlyBillEuros}
          electricalType={clientInfo.electricalType}
          budget={clientInfo.budget}
          onSelectChange={handleSelectChange}
          onChange={handleChange}
          errors={errors}
        />

        <AddressFields
          address={clientInfo.address}
          postalCode={clientInfo.postalCode}
          city={clientInfo.city}
          onChange={handleChange}
          errors={{
            address: errors.address,
            postalCode: errors.postalCode,
            city: errors.city,
          }}
        />

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
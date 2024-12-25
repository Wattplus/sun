import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode: string;
  projectType: string;
  surface: string;
  budget: string;
}

const validateEmail = (email: string) => {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

const validatePhone = (phone: string) => {
  return phone.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/);
};

const validatePostalCode = (code: string) => {
  return code.match(/^[0-9]{5}$/);
};

export const LeadForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
    projectType: "",
    surface: "",
    budget: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
    if (!validateEmail(formData.email)) newErrors.email = "Email invalide";
    if (!validatePhone(formData.phone)) newErrors.phone = "Numéro de téléphone invalide";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!validatePostalCode(formData.postalCode)) newErrors.postalCode = "Code postal invalide";
    if (!formData.projectType) newErrors.projectType = "Type de projet requis";
    if (!formData.surface) newErrors.surface = "Surface requise";
    if (!formData.budget) newErrors.budget = "Budget requis";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    console.log("Form submitted:", formData);
    
    toast({
      title: "Demande envoyée avec succès !",
      description: "Un expert vous contactera très prochainement.",
    });
    
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      postalCode: "",
      projectType: "",
      surface: "",
      budget: "",
    });
    setStep(1);
  };

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => setStep(1);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Votre étude personnalisée gratuite</h2>
        <p className="text-gray-500">Recevez une estimation détaillée pour votre projet photovoltaïque</p>
      </div>

      <div className="flex justify-between mb-6">
        <div className={`h-1 flex-1 ${step >= 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
        <div className={`h-1 flex-1 ${step >= 2 ? 'bg-green-500' : 'bg-gray-200'}`} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "border-red-500" : ""}
                placeholder="06 12 34 56 78"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="postalCode">Code postal</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className={errors.postalCode ? "border-red-500" : ""}
                placeholder="75001"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
              )}
            </div>
            <div>
              <Label htmlFor="projectType">Type de projet</Label>
              <Select 
                value={formData.projectType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}
              >
                <SelectTrigger className={errors.projectType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Sélectionnez le type de projet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="installation_neuve">Installation neuve</SelectItem>
                  <SelectItem value="renovation">Rénovation</SelectItem>
                  <SelectItem value="extension">Extension</SelectItem>
                </SelectContent>
              </Select>
              {errors.projectType && (
                <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>
              )}
            </div>
            <div>
              <Label htmlFor="surface">Surface disponible (m²)</Label>
              <Input
                type="number"
                id="surface"
                name="surface"
                value={formData.surface}
                onChange={handleChange}
                className={errors.surface ? "border-red-500" : ""}
                min="0"
              />
              {errors.surface && (
                <p className="text-red-500 text-sm mt-1">{errors.surface}</p>
              )}
            </div>
            <div>
              <Label htmlFor="budget">Budget estimé (€)</Label>
              <Input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={errors.budget ? "border-red-500" : ""}
                min="0"
                step="1000"
              />
              {errors.budget && (
                <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          )}
          {step < 2 ? (
            <Button type="button" className="ml-auto" onClick={nextStep}>
              Suivant
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="ml-auto bg-green-600 hover:bg-green-700">
              Envoyer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
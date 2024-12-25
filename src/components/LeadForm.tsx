import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, ArrowLeft } from "lucide-react";

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

export const LeadForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message
    toast({
      title: "Demande envoyée avec succès !",
      description: "Un expert vous contactera très prochainement.",
    });
    
    // Reset form
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

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div id="lead-form" className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold text-center mb-6">Votre étude personnalisée gratuite</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  required
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  required
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                required
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="postalCode">Code postal</Label>
              <Input
                required
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="projectType">Type de projet</Label>
              <Input
                required
                id="projectType"
                name="projectType"
                placeholder="Installation neuve, rénovation..."
                value={formData.projectType}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="surface">Surface disponible (m²)</Label>
              <Input
                required
                type="number"
                id="surface"
                name="surface"
                value={formData.surface}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="budget">Budget estimé (€)</Label>
              <Input
                required
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              />
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
            <Button type="submit" className="ml-auto">
              Envoyer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
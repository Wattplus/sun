import { createLead } from "@/lib/supabase-client";

export const handleFormSubmission = async (
  formData: {
    clientType: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    monthlyBill: string;
    postalCode: string;
  },
  toast: any,
  navigate: any
) => {
  try {
    console.log('Starting form submission...');

    // Create the lead
    const { error: leadError } = await createLead(formData);

    if (leadError) {
      console.error('Error creating lead:', leadError);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de votre demande.",
        variant: "destructive",
      });
      return false;
    }

    // Redirect to thank you page after successful submission
    setTimeout(() => {
      navigate("/thank-you");
    }, 2000);

    return true;
  } catch (error) {
    console.error("Erreur lors de la soumission du formulaire:", error);
    toast({
      title: "Erreur",
      description: "Une erreur est survenue lors de l'envoi de votre demande.",
      variant: "destructive",
    });
    return false;
  }
};
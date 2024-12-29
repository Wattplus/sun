import { createClientAccount, createLead } from "@/lib/supabase-client";

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
  navigate: any,
  generatedPassword: string
) => {
  try {
    console.log('Starting form submission...');

    // Créer le lead d'abord
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

    // Créer le compte client
    const { error: accountError } = await createClientAccount(
      formData.email,
      generatedPassword,
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        postalCode: formData.postalCode,
        clientType: formData.clientType,
        monthlyBill: formData.monthlyBill
      }
    );

    if (accountError) {
      console.error('Error creating account:', accountError);
      if (accountError.message.includes("User already registered")) {
        console.log("Utilisateur existant, mise à jour du profil...");
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la création de votre compte.",
          variant: "destructive",
        });
        return false;
      }
    }

    // Envoyer l'email de bienvenue
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-welcome-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: generatedPassword,
      }),
    });

    if (!response.ok) {
      console.error('Error sending welcome email:', await response.text());
    }

    toast({
      title: "Demande envoyée avec succès",
      description: "Un email contenant vos identifiants de connexion vous a été envoyé.",
    });

    // Rediriger vers l'espace client
    setTimeout(() => {
      navigate("/client-portal");
    }, 2000);

    return true;
  } catch (error) {
    console.error("Erreur lors de la soumission du formulaire:", error);
    toast({
      title: "Erreur",
      description: "Une erreur est survenue lors de la création de votre compte.",
      variant: "destructive",
    });
    return false;
  }
};
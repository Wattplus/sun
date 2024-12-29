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
    // Créer le compte client avec le mot de passe généré
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
      if (accountError.message.includes("User already registered")) {
        // Si l'utilisateur existe déjà, on met à jour ses informations
        console.log("Utilisateur existant, mise à jour du profil...");
      } else {
        toast({
          title: "Erreur",
          description: accountError.message || "Une erreur est survenue lors de la création de votre compte.",
          variant: "destructive",
        });
        return false;
      }
    }

    // Créer le lead
    const { error: leadError } = await createLead(formData);

    if (leadError) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de votre demande.",
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Compte créé avec succès",
      description: "Un email contenant vos identifiants de connexion vous a été envoyé.",
    });

    // Rediriger vers l'espace client
    setTimeout(() => {
      navigate("/client-portal");
    }, 2000);

    return true;
  } catch (error) {
    console.error("Erreur lors de la création du compte:", error);
    toast({
      title: "Erreur",
      description: "Une erreur est survenue lors de la création de votre compte.",
      variant: "destructive",
    });
    return false;
  }
};
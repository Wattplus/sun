import { createLead } from "@/lib/supabase-client";
import emailjs from '@emailjs/browser';

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

    // Send confirmation email
    try {
      const emailParams = {
        to_email: formData.email,
        to_name: `${formData.firstName} ${formData.lastName}`,
        from_name: "WattPlus",
        message: `Bonjour ${formData.firstName},\n\nNous avons bien reçu votre demande d'étude solaire. Notre équipe va l'étudier et reviendra vers vous très rapidement.\n\nCordialement,\nL'équipe WattPlus`,
      };

      await emailjs.send(
        process.env.EMAILJS_SERVICE_ID || '',
        process.env.EMAILJS_TEMPLATE_ID || '',
        emailParams,
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY || '',
        }
      );
      
      console.log('Confirmation email sent successfully');
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't block the form submission if email fails
    }

    // Show success notification
    toast({
      title: "Demande envoyée avec succès !",
      description: "Un de nos partenaires experts vous recontactera très prochainement pour étudier votre projet.",
    });

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
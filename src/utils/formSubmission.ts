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
    console.log('Starting form submission...', formData);

    // Create the lead in Supabase
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

    // Generate a temporary password for the client portal
    const tempPassword = Math.random().toString(36).slice(-8);

    // Send confirmation email using EmailJS
    try {
      const emailParams = {
        to_email: formData.email,
        to_name: `${formData.firstName} ${formData.lastName}`,
        from_name: "WattPlus",
        client_type: formData.clientType,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        postal_code: formData.postalCode,
        monthly_bill: formData.monthlyBill,
        date: new Date().toLocaleDateString('fr-FR'),
        password: tempPassword
      };

      await emailjs.send(
        'service_id', // Replace with your EmailJS service ID
        'template_id', // Replace with your EmailJS template ID
        emailParams,
        'public_key' // Replace with your EmailJS public key
      );
      
      console.log('Confirmation email sent successfully');
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't block the form submission if email fails
      toast({
        title: "Attention",
        description: "Votre demande a été enregistrée mais l'email de confirmation n'a pas pu être envoyé.",
        variant: "warning",
      });
    }

    // Show success notification
    toast({
      title: "Demande envoyée avec succès !",
      description: "Un email de confirmation vous a été envoyé avec vos identifiants de connexion.",
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
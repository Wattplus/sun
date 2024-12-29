export const validateForm = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  monthlyBill: string;
  postalCode: string;
}, toast: any) => {
  if (!formData.firstName.trim()) {
    toast({
      title: "Erreur",
      description: "Le prénom est requis",
      variant: "destructive",
    });
    return false;
  }
  if (!formData.lastName.trim()) {
    toast({
      title: "Erreur",
      description: "Le nom est requis",
      variant: "destructive",
    });
    return false;
  }
  if (!formData.email.trim()) {
    toast({
      title: "Erreur",
      description: "L'email est requis",
      variant: "destructive",
    });
    return false;
  }
  if (!formData.phone.trim()) {
    toast({
      title: "Erreur",
      description: "Le téléphone est requis",
      variant: "destructive",
    });
    return false;
  }
  if (!formData.monthlyBill.trim()) {
    toast({
      title: "Erreur",
      description: "La facture mensuelle est requise",
      variant: "destructive",
    });
    return false;
  }
  if (!formData.postalCode.trim()) {
    toast({
      title: "Erreur",
      description: "Le code postal est requis",
      variant: "destructive",
    });
    return false;
  }
  return true;
};
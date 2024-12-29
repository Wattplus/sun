import emailjs from '@emailjs/browser';

export const initEmailJS = () => {
  emailjs.init("nSGUhEBvdNcDlBp0F");
};

export const sendEmail = async (templateId: string, templateParams: any) => {
  try {
    const response = await emailjs.send(
      "service_wattplus",
      templateId,
      templateParams,
      "nSGUhEBvdNcDlBp0F"
    );
    return response;
  } catch (error) {
    console.error("Erreur d'envoi d'email:", error);
    throw error;
  }
};
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mail.wattplus.org',
  port: 465,
  secure: true,
  auth: {
    user: 'mikael@wattplus.org',
    pass: 'Hanna77026@'
  }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: '"WattPlus" <mikael@wattplus.org>',
      to,
      subject,
      html,
    });
    
    console.log('Email envoyé:', info.messageId);
    return info;
  } catch (error) {
    console.error("Erreur d'envoi d'email:", error);
    throw error;
  }
};

export const sendWelcomeEmail = async (email: string, firstName: string, password: string) => {
  const subject = 'Bienvenue chez WattPlus - Vos identifiants de connexion';
  const html = `
    <h1>Bienvenue ${firstName} !</h1>
    <p>Votre compte a été créé avec succès.</p>
    <p>Voici vos identifiants de connexion :</p>
    <ul>
      <li>Email : ${email}</li>
      <li>Mot de passe : ${password}</li>
    </ul>
    <p>Nous vous recommandons de changer votre mot de passe lors de votre première connexion.</p>
    <p>Vous pouvez maintenant vous connecter à votre espace client pour suivre l'avancement de votre projet.</p>
  `;

  return sendEmail(email, subject, html);
};
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const client = new SmtpClient();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, firstName, password, subject, html } = await req.json()

    await client.connectTLS({
      hostname: "mail.wattplus.org",
      port: 465,
      username: "mikael@wattplus.org",
      password: "Hanna77026@"
    });

    await client.send({
      from: "mikael@wattplus.org",
      to: email,
      subject: subject || 'Bienvenue chez WattPlus - Vos identifiants de connexion',
      html: html || `
        <h1>Bienvenue ${firstName} !</h1>
        <p>Votre compte a été créé avec succès.</p>
        <p>Voici vos identifiants de connexion :</p>
        <ul>
          <li>Email : ${email}</li>
          <li>Mot de passe : ${password}</li>
        </ul>
        <p>Nous vous recommandons de changer votre mot de passe lors de votre première connexion.</p>
        <p>Vous pouvez maintenant vous connecter à votre espace client pour suivre l'avancement de votre projet.</p>
      `
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
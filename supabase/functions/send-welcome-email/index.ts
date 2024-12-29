import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, firstName, password } = await req.json()

    // Configuration de l'envoi d'email (à adapter selon votre service d'email)
    const emailData = {
      to: email,
      subject: 'Bienvenue sur notre plateforme solaire',
      html: `
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
    }

    // Ici, vous devrez implémenter l'envoi d'email avec votre service préféré
    // Par exemple avec SendGrid, Mailgun, etc.
    console.log('Email would be sent:', emailData)

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
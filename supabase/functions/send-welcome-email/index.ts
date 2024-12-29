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
    const { email, firstName, lastName, password } = await req.json()

    // Configuration de l'envoi d'email
    const emailData = {
      to: email,
      subject: 'Bienvenue sur WattPlus - Votre demande a été reçue',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #1d4ed8; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { text-align: center; padding: 20px; color: #666; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Bienvenue ${firstName} ${lastName} !</h1>
                </div>
                <div class="content">
                    <p>Votre demande d'étude solaire a bien été prise en compte.</p>
                    <p>Voici vos identifiants de connexion pour suivre votre projet :</p>
                    <ul>
                        <li>Email : ${email}</li>
                        <li>Mot de passe temporaire : ${password}</li>
                    </ul>
                    <p>Nous vous recommandons de changer votre mot de passe lors de votre première connexion.</p>
                    <p>Notre équipe va étudier votre demande et reviendra vers vous très rapidement.</p>
                </div>
                <div class="footer">
                    <p>WattPlus - Expert en installations photovoltaïques</p>
                </div>
            </div>
        </body>
        </html>
      `
    }

    console.log('Sending email:', emailData)

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
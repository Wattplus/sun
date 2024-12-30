import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@13.6.0?target=deno"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

console.log('Loading create-lead-checkout function...')

serve(async (req) => {
  console.log('Received request:', req.method, req.url)

  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request')
    return new Response(null, {
      headers: corsHeaders,
    })
  }

  try {
    const { leads } = await req.json()
    console.log('Processing leads for checkout:', leads)

    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      throw new Error('Invalid leads data')
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    const lineItems = leads.map(lead => {
      const price = Number(lead.price)
      console.log('Processing price:', { leadId: lead.id, price })
      
      if (isNaN(price) || price <= 0) {
        console.error('Invalid price for lead:', { lead, price })
        throw new Error(`Invalid price for lead ${lead.id}`)
      }

      const priceInCents = Math.round(price * 100)
      console.log('Processing lead payment:', {
        leadId: lead.id,
        clientType: lead.clientType,
        type: lead.type,
        price: price,
        priceInCents: priceInCents
      })

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Lead ${lead.clientType === 'professional' ? 'Professionnel' : 'Particulier'}`,
            description: `Achat ${lead.type === 'mutualise' ? 'mutualisé' : 'exclusif'} du lead #${lead.id}`,
            metadata: {
              lead_id: lead.id,
            },
          },
          unit_amount: priceInCents,
        },
        quantity: 1,
      }
    })

    console.log('Creating Stripe checkout session...')

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/espace-installateur/leads/achetes?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/espace-installateur/leads/nouveaux?canceled=true`,
      metadata: {
        leads: JSON.stringify(leads.map(l => l.id)),
      },
      billing_address_collection: 'required',
      locale: 'fr',
      payment_intent_data: {
        capture_method: 'automatic',
        metadata: {
          leads: JSON.stringify(leads.map(l => l.id)),
        },
      },
      customer_email: leads[0]?.email,
      submit_type: 'pay',
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // Expire in 30 minutes
      ui_mode: 'embedded',
      return_url: `${req.headers.get('origin')}/espace-installateur/leads/achetes?success=true&session_id={CHECKOUT_SESSION_ID}`,
    })

    console.log('Checkout session created successfully:', session.id)

    return new Response(
      JSON.stringify({ 
        url: session.url,
        clientSecret: session.client_secret,
        sessionId: session.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error in create-lead-checkout:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString(),
        stack: error.stack
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
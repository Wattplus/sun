import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import Stripe from 'https://esm.sh/stripe@13.6.0?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

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

    const lineItems = leads.map(lead => {
      const basePrice = lead.clientType === 'professional' ? 49 : 26
      const finalPrice = lead.type === 'exclusif' ? basePrice * 2 : basePrice
      
      console.log('Calculated price for lead:', {
        leadId: lead.id,
        clientType: lead.clientType,
        type: lead.type,
        basePrice,
        finalPrice
      })

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Lead ${lead.clientType === 'professional' ? 'Professionnel' : 'Particulier'}`,
            description: `Achat ${lead.type === 'mutualise' ? 'mutualisé' : 'exclusif'} du lead #${lead.id}`,
          },
          unit_amount: Math.round(finalPrice * 100), // Convert to cents
        },
        quantity: 1,
      }
    })

    console.log('Creating Stripe checkout session with items:', lineItems)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/espace-installateur/leads/achetes?success=true`,
      cancel_url: `${req.headers.get('origin')}/espace-installateur/leads/nouveaux?canceled=true`,
      metadata: {
        leads: JSON.stringify(leads.map(l => l.id)),
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    })

    console.log('Checkout session created successfully:', session.id)

    return new Response(
      JSON.stringify({ url: session.url }),
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
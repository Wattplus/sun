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

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request')
    return new Response(null, {
      headers: corsHeaders,
    })
  }

  try {
    const { leads } = await req.json()
    console.log('Received leads:', leads)

    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      throw new Error('Invalid leads data')
    }

    const lineItems = leads.map(lead => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `Lead - ${lead.firstname} ${lead.lastname}`,
          description: `Lead pour ${lead.clienttype === 'professional' ? 'professionnel' : 'particulier'} - ${lead.postalcode}`,
        },
        unit_amount: lead.clienttype === 'professional' ? 4900 : 2600,
      },
      quantity: 1,
    }))

    console.log('Creating Stripe checkout session with line items:', lineItems)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/espace-installateur/leads/achetes?success=true`,
      cancel_url: `${req.headers.get('origin')}/espace-installateur/leads/nouveaux?canceled=true`,
    })

    console.log('Checkout session created:', session.id)

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
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
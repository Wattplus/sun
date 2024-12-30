import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    console.log('Creating payment session...');
    const { leads } = await req.json();

    if (!leads || !Array.isArray(leads)) {
      console.error('Invalid leads data received:', leads);
      throw new Error('Invalid leads data');
    }

    console.log('Received leads:', leads);

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY is not set');
      throw new Error('Stripe secret key is not configured');
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    console.log('Creating Stripe checkout session...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: leads.map(lead => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Lead - ${lead.firstname} ${lead.lastname}`,
            description: `Lead from ${lead.postalcode} - ${lead.clienttype}`,
          },
          unit_amount: lead.clienttype === 'professional' ? 4900 : 2600, // 49€ or 26€ in cents
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/espace-installateur/leads/achetes?success=true`,
      cancel_url: `${req.headers.get('origin')}/espace-installateur/leads/nouveaux?canceled=true`,
      metadata: {
        leadIds: leads.map(lead => lead.id).join(','),
      }
    });

    console.log('Checkout session created successfully:', session.url);
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating payment session:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 500,
      }
    );
  }
});
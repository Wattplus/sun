import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Creating payment session...');
    const { leads } = await req.json();

    if (!leads || !Array.isArray(leads)) {
      throw new Error('Invalid leads data');
    }

    console.log('Received leads:', leads);

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    console.log('Creating Stripe checkout session...');
    const session = await stripe.checkout.sessions.create({
      line_items: leads.map(lead => ({
        price: lead.priceId,
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/espace-installateur?success=true`,
      cancel_url: `${req.headers.get('origin')}/espace-installateur?canceled=true`,
      metadata: {
        leadIds: leads.map(lead => lead.id).join(','),
        type: leads[0].type
      }
    });

    console.log('Checkout session created successfully:', session.url);
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating payment session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
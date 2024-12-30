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

    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY is not set');
      throw new Error('Stripe secret key is not configured');
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    console.log('Creating Stripe checkout session...');
    const session = await stripe.checkout.sessions.create({
      line_items: leads.map(lead => ({
        price: lead.clienttype === 'professional' 
          ? 'price_1Qa0nUFOePj4Hv47Ih00CR8k'  // 49€ for professional leads
          : 'price_1QaAlfFOePj4Hv475LWE2bGQ',  // 26€ for individual leads
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
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PRICE_IDS = {
  50: 'price_1Qc0XoFOePj4Hv47nLptfY7C',
  100: 'price_1Qc0YjFOePj4Hv47TMzNHKgZ',
  200: 'price_1Qc0YyFOePj4Hv47sPblVuQw',
  500: 'price_1Qc0ZFFOePj4Hv47Hu3I1in6',
  1000: 'price_1Qc0ZWFOePj4Hv471BzQ6I7C',
  1500: 'price_1Qc0ZmFOePj4Hv47eutSkmsB',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount } = await req.json();
    const priceId = PRICE_IDS[amount];

    if (!priceId) {
      throw new Error('Invalid amount');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user?.email) {
      throw new Error('User not authenticated');
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/espace-installateur/mon-compte/prepaid?success=true`,
      cancel_url: `${req.headers.get('origin')}/espace-installateur/mon-compte/prepaid?canceled=true`,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        amount: amount,
      },
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
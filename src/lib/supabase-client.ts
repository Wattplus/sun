import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour créer un nouveau compte client
export const createClientAccount = async (email: string, password: string, userData: any) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          role: 'client'
        }
      }
    });

    if (authError) throw authError;

    // Envoyer un email de bienvenue
    await sendWelcomeEmail(email, userData.firstName);

    return { data: authData, error: null };
  } catch (error) {
    console.error('Error creating client account:', error);
    return { data: null, error };
  }
};

// Fonction pour créer un nouveau lead
export const createLead = async (leadData: any) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          firstName: leadData.firstName,
          lastName: leadData.lastName,
          email: leadData.email,
          phone: leadData.phone,
          postalCode: leadData.postalCode,
          monthlyBill: leadData.monthlyBill,
          clientType: leadData.clientType,
          status: 'new'
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating lead:', error);
    return { data: null, error };
  }
};

// Fonction pour envoyer l'email de bienvenue
const sendWelcomeEmail = async (email: string, firstName: string) => {
  try {
    const { error } = await supabase.functions.invoke('send-welcome-email', {
      body: { email, firstName }
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};
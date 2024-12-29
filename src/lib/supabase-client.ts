import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour envoyer un email via la fonction Edge
export const sendEmail = async (email: string, firstName: string, password: string, subject?: string, html?: string) => {
  try {
    const { error } = await supabase.functions.invoke('send-email', {
      body: { email, firstName, password, subject, html }
    });

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error };
  }
};

// Fonction pour créer ou connecter un compte client
export const createClientAccount = async (email: string, password: string, userData: any) => {
  try {
    // Vérifie d'abord si l'utilisateur existe
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      // Si l'utilisateur existe, on essaie de le connecter
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;
      return { data: signInData, error: null };
    }

    // Si l'utilisateur n'existe pas, on crée un nouveau compte
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

    // Envoyer un email de bienvenue avec le mot de passe
    await sendEmail(email, userData.firstName, password);

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
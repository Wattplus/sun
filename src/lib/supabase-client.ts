import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const EMAILJS_SERVICE_ID = 'service_wattplus';
const EMAILJS_TEMPLATE_ID = 'template_q11t4u8';
const EMAILJS_PUBLIC_KEY = 'nSGUhEBvdNcDlBp0F';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const sendEmail = async (
  email: string, 
  firstName: string, 
  lastName: string, 
  phone: string, 
  postalCode: string,
  clientType: string,
  monthlyBill: string,
  password: string
) => {
  try {
    console.log('Tentative d\'envoi d\'email à:', email);
    
    const templateParams = {
      client_type: clientType,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      postal_code: postalCode,
      monthly_bill: monthlyBill,
      password: password,
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error('Erreur lors de l\'envoi de l\'email');
    }
    
    console.log('Email envoyé avec succès à:', email);
    return { error: null };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return { error };
  }
};

export const createClientAccount = async (email: string, password: string, userData: any) => {
  try {
    // Vérifier si l'utilisateur existe déjà
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return { 
        error: {
          message: "Un compte existe déjà avec cet email. Veuillez vous connecter ou utiliser un autre email."
        }
      };
    }

    // Créer le compte auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone,
          role: 'client'
        }
      }
    });

    if (authError) throw authError;

    // Créer le profil
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            email: email,
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone
          }
        ]);

      if (profileError) throw profileError;
    }

    // Envoyer l'email
    await sendEmail(
      email,
      userData.firstName,
      userData.lastName,
      userData.phone,
      userData.postalCode,
      userData.clientType,
      userData.monthlyBill,
      password
    );

    return { data: authData, error: null };
  } catch (error) {
    console.error('Error creating client account:', error);
    return { data: null, error };
  }
};

export const createLead = async (leadData: any) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          first_name: leadData.firstName,
          last_name: leadData.lastName,
          email: leadData.email,
          phone: leadData.phone,
          postal_code: leadData.postalCode,
          monthly_bill: leadData.monthlyBill,
          client_type: leadData.clientType,
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
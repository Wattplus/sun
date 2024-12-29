import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const EMAILJS_SERVICE_ID = 'service_611ohbh';
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
    console.log('Sending welcome email to:', email);
    
    const templateParams = {
      to_email: email,
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

    console.log('Email sent successfully:', response);
    return { error: null };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error };
  }
};

export const createClientAccount = async (email: string, password: string, userData: any) => {
  try {
    console.log('Starting account creation process for:', email);

    // Créer le compte avec le mot de passe généré
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
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

    if (signUpError) {
      console.error('Error creating auth account:', signUpError);
      return { error: signUpError };
    }

    const userId = signUpData.user?.id;

    if (!userId) {
      console.error('No user ID available after auth operation');
      return { error: new Error('Failed to get user ID') };
    }

    // Créer le profil pour le nouvel utilisateur
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert([
        {
          id: userId,
          email: email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone,
          postal_code: userData.postalCode,
          client_type: userData.clientType,
          monthly_bill: userData.monthlyBill
        }
      ]);

    if (profileError) {
      console.error('Error creating profile:', profileError);
      return { error: profileError };
    }

    // Envoyer l'email de bienvenue
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

    return { data: { userId }, error: null };
  } catch (error) {
    console.error('Unexpected error in createClientAccount:', error);
    return { error };
  }
};

export const createLead = async (leadData: any) => {
  try {
    console.log('Creating lead with data:', leadData);
    
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

    if (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
    
    console.log('Lead created successfully:', data);
    return { data, error: null };
  } catch (error) {
    console.error('Error in createLead:', error);
    return { data: null, error };
  }
};
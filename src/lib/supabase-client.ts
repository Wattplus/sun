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
    console.log('Attempting to send email to:', email);
    
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
      throw new Error('Failed to send email');
    }
    
    console.log('Email sent successfully to:', email);
    return { error: null };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error };
  }
};

export const createClientAccount = async (email: string, password: string, userData: any) => {
  try {
    console.log('Creating client account with data:', userData);
    
    // Vérifie si l'utilisateur existe déjà dans auth
    const { data: { user: existingAuthUser }, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (existingAuthUser) {
      return { 
        error: { 
          message: "Un compte existe déjà avec cet email. Veuillez vous connecter ou utiliser une autre adresse email." 
        }
      };
    }

    // Si l'utilisateur n'existe pas dans auth, on le crée
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
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
      if (signUpError.message.includes('User already registered')) {
        return { 
          error: { 
            message: "Un compte existe déjà avec cet email. Veuillez vous connecter ou utiliser une autre adresse email." 
          }
        };
      }
      return { error: signUpError };
    }

    if (!authData.user) {
      return { error: new Error('Failed to create auth user') };
    }

    // Créer le profil uniquement si l'utilisateur n'existe pas déjà
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle(); // Utilisation de maybeSingle au lieu de single

    if (!existingProfile) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
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

    return { data: authData, error: null };
  } catch (error) {
    console.error('Error in createClientAccount:', error);
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

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating lead:', error);
    return { data: null, error };
  }
};
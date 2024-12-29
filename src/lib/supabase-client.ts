import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

export const checkExistingUser = async (email: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (error) {
    console.error('Error checking existing user:', error);
  }

  return data?.id;
};

export const createClientAccount = async (
  email: string,
  password: string,
  metadata: {
    firstName: string;
    lastName: string;
    phone: string;
    postalCode: string;
    clientType: string;
    monthlyBill: string;
  }
) => {
  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUserId = await checkExistingUser(email);
    
    if (existingUserId) {
      console.log('User already exists, updating profile...');
      // Mettre à jour le profil existant
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          first_name: metadata.firstName,
          last_name: metadata.lastName,
          phone: metadata.phone,
          postal_code: metadata.postalCode,
          client_type: metadata.clientType,
          monthly_bill: metadata.monthlyBill,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingUserId);

      if (updateError) throw updateError;
      
      return { data: { user: { id: existingUserId } }, error: null };
    }

    // Créer un nouveau compte si l'utilisateur n'existe pas
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: metadata.firstName,
          last_name: metadata.lastName,
          phone: metadata.phone,
          postal_code: metadata.postalCode,
          client_type: metadata.clientType,
          monthly_bill: metadata.monthlyBill,
        },
      },
    });

    if (error) throw error;

    // Créer le profil dans la table profiles
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: data.user?.id,
        email,
        first_name: metadata.firstName,
        last_name: metadata.lastName,
        phone: metadata.phone,
        postal_code: metadata.postalCode,
        client_type: metadata.clientType,
        monthly_bill: metadata.monthlyBill,
      },
    ]);

    if (profileError) throw profileError;

    return { data, error: null };
  } catch (error) {
    console.error('Error in createClientAccount:', error);
    return { data: null, error };
  }
};

export const createLead = async (formData: {
  clientType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  monthlyBill: string;
  postalCode: string;
}) => {
  try {
    const { error } = await supabase.from('leads').insert([
      {
        client_type: formData.clientType,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        monthly_bill: formData.monthlyBill,
        postal_code: formData.postalCode,
        status: 'new',
      },
    ]);

    return { error };
  } catch (error) {
    console.error('Error in createLead:', error);
    return { error };
  }
};
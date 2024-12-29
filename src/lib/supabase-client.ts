import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

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
    console.log('Creating lead with data:', formData);
    
    const { error } = await supabase.from('leads').insert([
      {
        clienttype: formData.clientType.toLowerCase(),
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        monthlybill: formData.monthlyBill,
        postalcode: formData.postalCode,
        status: 'new',
      },
    ]);

    if (error) {
      console.error('Error creating lead:', error);
      throw error;
    }

    return { error: null };
  } catch (error) {
    console.error('Error in createLead:', error);
    return { error };
  }
};

export const checkExistingUser = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      console.error('Error checking existing user:', error);
      return null;
    }

    return data?.id;
  } catch (error) {
    console.error('Error in checkExistingUser:', error);
    return null;
  }
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
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: metadata.firstName,
          last_name: metadata.lastName,
          phone: metadata.phone,
          postal_code: metadata.postalCode,
          client_type: metadata.clientType.toLowerCase(),
          monthly_bill: metadata.monthlyBill,
        },
      },
    });

    if (signUpError) throw signUpError;

    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: authData.user?.id,
        email,
        first_name: metadata.firstName,
        last_name: metadata.lastName,
        phone: metadata.phone,
        postal_code: metadata.postalCode,
        client_type: metadata.clientType.toLowerCase(),
        monthly_bill: metadata.monthlyBill,
      },
    ]);

    if (profileError) throw profileError;

    return { data: authData, error: null };
  } catch (error) {
    console.error('Error in createClientAccount:', error);
    return { data: null, error };
  }
};
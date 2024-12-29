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
    const { data: userData } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false,
      },
    });

    return userData?.user?.id || null;
  } catch (error) {
    console.error('Error checking existing user:', error);
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
    // Vérifier si l'utilisateur existe déjà
    const { data: existingUser } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    let userId: string | undefined;

    if (existingUser?.user?.id) {
      // Si l'utilisateur existe, utiliser son ID
      userId = existingUser.user.id;
    } else {
      // Si l'utilisateur n'existe pas, créer un nouveau compte
      const { data: newUser, error: signUpError } = await supabase.auth.signUp({
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
      userId = newUser?.user?.id;
    }

    if (userId) {
      // Mettre à jour ou créer le profil
      const { error: profileError } = await supabase.from('profiles').upsert([
        {
          id: userId,
          email,
          first_name: metadata.firstName,
          last_name: metadata.lastName,
          phone: metadata.phone,
          postal_code: metadata.postalCode,
          client_type: metadata.clientType.toLowerCase(),
          monthly_bill: metadata.monthlyBill,
        },
      ], {
        onConflict: 'id'
      });

      if (profileError) throw profileError;
    }

    return { error: null };
  } catch (error) {
    console.error('Error in createClientAccount:', error);
    return { error };
  }
};
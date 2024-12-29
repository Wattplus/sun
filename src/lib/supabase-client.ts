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
        created_at: new Date().toISOString()
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

export const createSuperAdmin = async (email: string, password: string) => {
  try {
    // 1. Create the user account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData.user) {
      // 2. Create the profile entry
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: authData.user.id,
          email: email,
          role: 'super_admin'
        }
      ]);

      if (profileError) throw profileError;

      // 3. Create the installer entry with verified status
      const { error: installerError } = await supabase.from('installers').insert([
        {
          user_id: authData.user.id,
          company_name: 'WattPlus Admin',
          contact_name: 'Mikael',
          verified: true,
          credits: 999999, // Large number of credits for admin
          service_area: ['All']
        }
      ]);

      if (installerError) throw installerError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error creating super admin:', error);
    return { error };
  }
};

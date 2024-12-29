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
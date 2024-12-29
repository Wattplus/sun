import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const CreateSuperAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const createSuperAdmin = async () => {
      try {
        const { data: existingUser, error: checkError } = await supabase
          .from('profiles')
          .select('role')
          .eq('email', 'mikael@wattplus.org')
          .single();

        if (existingUser?.role === 'super_admin') {
          toast.error("Super admin already exists");
          navigate('/login');
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email: 'mikael@wattplus.org',
          password: 'Hanna77026@',
        });

        if (signUpError) throw signUpError;

        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'super_admin' })
          .eq('email', 'mikael@wattplus.org');

        if (updateError) throw updateError;

        toast.success("Super admin account created successfully");
        navigate('/login');
      } catch (error: any) {
        toast.error(error.message);
        navigate('/login');
      }
    };

    createSuperAdmin();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Creating Super Admin Account</h1>
        <p className="text-muted-foreground">Please wait...</p>
      </div>
    </div>
  );
};
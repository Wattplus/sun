import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase-client';

export const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('No active session found, redirecting to login');
        navigate('/login');
        return;
      }

      // Set up real-time auth state listener
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          console.log('Session ended, redirecting to login');
          navigate('/login');
        }
      });

      // Cleanup subscription
      return () => subscription.unsubscribe();
    };

    checkAuth();
  }, [navigate]);
};
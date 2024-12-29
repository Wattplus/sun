import { createClient } from '@supabase/supabase-js';
import type { Message, Conversation } from '@/types/messages';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation des variables d'environnement
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Les variables d\'environnement Supabase ne sont pas configurées. ' +
    'Veuillez définir VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans votre fichier .env'
  );
}

// Validation de l'URL
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    `L'URL Supabase n'est pas valide: ${supabaseUrl}. ` +
    'Veuillez vérifier la valeur de VITE_SUPABASE_URL dans votre fichier .env'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const messagesService = {
  async getMessages(conversationId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data as Message[];
  },

  async sendMessage(message: Omit<Message, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();
    
    if (error) throw error;
    return data as Message;
  }
};
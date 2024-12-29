import { createClient } from '@supabase/supabase-js';
import type { Message, Conversation } from '@/types/messages';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation plus stricte des variables d'environnement
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase configuration. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseKey}`
    }
  }
});

// Log the configuration (sans la clé complète pour la sécurité)
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key configured:', supabaseKey ? 'Yes' : 'No');
console.log('Supabase Key starts with:', supabaseKey.substring(0, 4) + '...');

export const messagesService = {
  async getMessages(conversationId: string) {
    if (!conversationId) {
      throw new Error('conversationId is required');
    }

    try {
      console.log('Fetching messages for conversation:', conversationId);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Messages fetched successfully:', data?.length || 0);
      return data as Message[];
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  async sendMessage(message: Omit<Message, 'id' | 'created_at'>) {
    if (!message.conversation_id || !message.content) {
      throw new Error('conversation_id and content are required');
    }

    try {
      console.log('Sending message:', { ...message, content: message.content.substring(0, 20) + '...' });
      const { data, error } = await supabase
        .from('messages')
        .insert([message])
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Message sent successfully');
      return data as Message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
};
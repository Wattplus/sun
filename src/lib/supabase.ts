import { createClient } from '@supabase/supabase-js';
import type { Message, Conversation } from '@/types/messages';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be defined'
  );
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(`Invalid VITE_SUPABASE_URL: ${supabaseUrl}`);
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const messagesService = {
  async getMessages(conversationId: string) {
    if (!conversationId) {
      throw new Error('conversationId is required');
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }

    return data as Message[];
  },

  async sendMessage(message: Omit<Message, 'id' | 'created_at'>) {
    if (!message.conversation_id || !message.content) {
      throw new Error('conversation_id and content are required');
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();
    
    if (error) {
      console.error('Error sending message:', error);
      throw error;
    }

    return data as Message;
  }
};
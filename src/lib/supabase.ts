import { createClient } from '@supabase/supabase-js';
import type { Message } from '@/types/messages';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const messagesService = {
  async getMessages(conversationId: string): Promise<Message[]> {
    console.log('Fetching messages for conversation:', conversationId);
    
    if (!conversationId) {
      throw new Error('Conversation ID is required');
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error in getMessages:', error);
      throw error;
    }

    return data || [];
  },

  async sendMessage(message: Omit<Message, 'id' | 'created_at'>): Promise<Message> {
    if (!message.conversation_id) {
      throw new Error('Conversation ID is required');
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

    if (!data) {
      throw new Error('No data returned from insert operation');
    }

    return data;
  }
};
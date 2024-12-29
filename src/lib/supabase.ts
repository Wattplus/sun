import { createClient } from '@supabase/supabase-js';
import type { Message } from '@/types/messages';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const messagesService = {
  async getMessages(conversationId: string): Promise<Message[]> {
    console.log('Fetching messages for conversation:', conversationId);
    
    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        throw error;
      }

      return messages || [];
    } catch (error) {
      console.error('Error in getMessages:', error);
      throw error;
    }
  },

  async sendMessage(message: Omit<Message, 'id' | 'created_at'>): Promise<Message> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          content: message.content,
          sender_id: message.sender_id,
          sender_type: message.sender_type,
          conversation_id: message.conversation_id,
          read: message.read
        }])
        .select()
        .single();

      if (error) {
        console.error('Error sending message:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in sendMessage:', error);
      throw error;
    }
  }
};
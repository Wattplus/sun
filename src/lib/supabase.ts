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
  async getMessages(threadId: string): Promise<Message[]> {
    console.log('Fetching messages for thread:', threadId);
    
    if (!threadId) {
      throw new Error('Thread ID is required');
    }

    // First, let's check if the table exists and log its structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('messages')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('Error checking table:', tableError);
      throw tableError;
    }

    // Log the structure of the first row if it exists
    if (tableInfo && tableInfo.length > 0) {
      console.log('Table structure:', Object.keys(tableInfo[0]));
    } else {
      console.log('Table is empty or does not exist');
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', threadId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error in getMessages:', error);
      throw error;
    }

    return data || [];
  },

  async sendMessage(message: Omit<Message, 'id' | 'created_at'>): Promise<Message> {
    if (!message.thread_id) {
      throw new Error('Thread ID is required');
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([{
        content: message.content,
        sender_id: message.sender_id,
        sender_type: message.sender_type,
        id: message.thread_id, // Using thread_id as the message id for now
        read: message.read
      }])
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
import { createClient } from '@supabase/supabase-js';
import type { Message } from '@/types/messages';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  }
});

export const messagesService = {
  async getMessages(conversationId: string): Promise<Message[]> {
    console.log('Fetching messages for conversation:', conversationId);
    
    // First check if the conversation exists in contacts table
    const { data: contact, error: contactError } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', conversationId)
      .single();

    if (contactError) {
      console.error('Error fetching contact:', contactError);
      throw contactError;
    }

    // If contact exists, return mock messages for now
    // TODO: Replace with actual messages table once created
    return [{
      id: '1',
      content: "Bonjour, je suis intéressé par vos services.",
      sender_id: contact.id,
      sender_type: 'client',
      conversation_id: conversationId,
      created_at: new Date().toISOString(),
      read: false
    }];
  },

  async sendMessage(message: Omit<Message, 'id' | 'created_at'>): Promise<Message> {
    // For now, just return a mock response
    // TODO: Replace with actual message insertion once messages table is created
    return {
      id: Date.now().toString(),
      content: message.content,
      sender_id: message.sender_id,
      sender_type: message.sender_type,
      conversation_id: message.conversation_id,
      created_at: new Date().toISOString(),
      read: false
    };
  }
};
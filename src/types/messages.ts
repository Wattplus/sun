export interface Message {
  id: string;
  content: string;
  sender_id: string;
  sender_type: 'installer' | 'client' | 'system';
  conversation_id: string;
  created_at: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  client_id: string;
  installer_id: string;
  last_message?: string;
  updated_at: string;
  created_at: string;
}
export interface Message {
  id: string;
  content: string;
  sender_id: string;
  sender_type: 'installer' | 'client' | 'system';
  thread_id: string; // Changed from conversation_id to thread_id
  created_at: string;
  read: boolean;
}

export interface Thread {
  id: string;
  client_id: string;
  installer_id: string;
  last_message?: string;
  updated_at: string;
  created_at: string;
}
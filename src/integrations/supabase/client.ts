// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dqzsycxxgltztufrhams.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxenN5Y3h4Z2x0enR1ZnJoYW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NTk1NDUsImV4cCI6MjA1MDQzNTU0NX0.IvUwTEcbdmT5F3NMyJyipNE86ei_Q_VbgK-marr8qkc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
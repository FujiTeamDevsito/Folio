import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image_url: string;
  demo_url: string;
  github_url: string;
  order_position: number;
  created_at: string;
  updated_at: string;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar_url: string;
  linkedin_url: string;
  github_url: string;
  order_position: number;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon_name: string;
  order_position: number;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

// Nueva interfaz para las pistas de música
export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  platform: 'youtube' | 'spotify';
  url: string;
  thumbnail_url: string;
  is_active: boolean;
  order_position: number;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  role: string;
  event_type: string;
  organization: string;
  location: string;
  date: string;
  image_url: string;
  technologies: string[];
  achievement: string;
  link_url: string;
  order_position: number;
  created_at: string;
  updated_at: string;
}
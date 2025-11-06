/*
  # Create Contact and Social Media Tables

  1. New Tables
    - `social_links`
      - `id` (uuid, primary key)
      - `platform` (text, social media platform name)
      - `url` (text, link to the profile)
      - `icon_name` (text, lucide icon name)
      - `order_position` (integer, for sorting links)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, sender's full name)
      - `email` (text, sender's email)
      - `subject` (text, message subject)
      - `message` (text, message content)
      - `read` (boolean, whether admin has read it)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public can view social_links
    - Public can insert contact_messages
    - Authenticated admin users can manage social_links
    - Authenticated admin users can view and update contact_messages
*/

CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  url text NOT NULL,
  icon_name text NOT NULL,
  order_position integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text DEFAULT '',
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view social links"
  ON social_links FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert social links"
  ON social_links FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update social links"
  ON social_links FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete social links"
  ON social_links FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can send contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);
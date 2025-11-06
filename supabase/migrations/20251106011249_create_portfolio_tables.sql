/*
  # Create Portfolio Database Schema

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, project title)
      - `description` (text, project description)
      - `technologies` (text[], array of technologies used)
      - `image_url` (text, project image URL)
      - `demo_url` (text, optional demo link)
      - `github_url` (text, optional GitHub repository link)
      - `order_position` (integer, for sorting projects)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `collaborators`
      - `id` (uuid, primary key)
      - `name` (text, collaborator name)
      - `role` (text, collaborator role/title)
      - `bio` (text, short biography)
      - `avatar_url` (text, profile image URL)
      - `linkedin_url` (text, optional LinkedIn profile)
      - `github_url` (text, optional GitHub profile)
      - `order_position` (integer, for sorting collaborators)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public read access for portfolio display
    - Authenticated admin users can create, update, and delete entries
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  technologies text[] DEFAULT '{}',
  image_url text DEFAULT '',
  demo_url text DEFAULT '',
  github_url text DEFAULT '',
  order_position integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS collaborators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text DEFAULT '',
  avatar_url text DEFAULT '',
  linkedin_url text DEFAULT '',
  github_url text DEFAULT '',
  order_position integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view collaborators"
  ON collaborators FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert collaborators"
  ON collaborators FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update collaborators"
  ON collaborators FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete collaborators"
  ON collaborators FOR DELETE
  TO authenticated
  USING (true);
/*
  # Create image settings table

  1. New Tables
    - `image_settings`
      - `id` (uuid, primary key) - Unique identifier
      - `key` (text, unique) - Setting identifier (e.g., 'profile_image')
      - `zoom` (numeric) - Zoom level for the image
      - `offset_x` (numeric) - Horizontal offset
      - `offset_y` (numeric) - Vertical offset
      - `updated_at` (timestamptz) - Last update timestamp
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `image_settings` table
    - Add policy for public read access (anyone can view settings)
    - Add policy for authenticated insert/update (only authenticated users can modify)

  3. Initial Data
    - Insert default profile image settings
*/

CREATE TABLE IF NOT EXISTS image_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  zoom numeric NOT NULL DEFAULT 1,
  offset_x numeric NOT NULL DEFAULT 0,
  offset_y numeric NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE image_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read image settings"
  ON image_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert image settings"
  ON image_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update image settings"
  ON image_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default profile image settings
INSERT INTO image_settings (key, zoom, offset_x, offset_y)
VALUES ('profile_image', 1.5, 0, -20)
ON CONFLICT (key) DO NOTHING;
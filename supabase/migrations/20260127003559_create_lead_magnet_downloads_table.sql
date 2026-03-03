/*
  # Create lead magnet downloads table

  1. New Tables
    - `lead_magnet_downloads`
      - `id` (uuid, primary key) - Unique identifier for each download
      - `name` (text, required) - Downloader's full name
      - `email` (text, required) - Downloader's email address
      - `company` (text, optional) - Downloader's company name
      - `lead_magnet` (text, required) - Name of the lead magnet downloaded
      - `created_at` (timestamptz) - Timestamp of download
      - `ip_address` (text, optional) - IP address of the requester

  2. Security
    - Enable RLS on `lead_magnet_downloads` table
    - Add policy for anonymous users to insert data (form submissions)
    - No public read access (internal use only)

  3. Notes
    - This table stores all lead magnet download submissions
    - Similar structure to case_study_downloads table
    - Indexes added for common queries
*/

CREATE TABLE IF NOT EXISTS lead_magnet_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  lead_magnet text NOT NULL,
  created_at timestamptz DEFAULT now(),
  ip_address text
);

ALTER TABLE lead_magnet_downloads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_lead_magnet_downloads_email ON lead_magnet_downloads(email);
CREATE INDEX IF NOT EXISTS idx_lead_magnet_downloads_created_at ON lead_magnet_downloads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_magnet_downloads_lead_magnet ON lead_magnet_downloads(lead_magnet);

CREATE POLICY "Anonymous users can insert lead magnet downloads"
  ON lead_magnet_downloads
  FOR INSERT
  TO anon
  WITH CHECK (true);
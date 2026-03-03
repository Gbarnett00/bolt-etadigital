/*
  # Create lead submissions table

  1. New Tables
    - `lead_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text, required) - Lead's full name
      - `email` (text, required) - Lead's email address
      - `company` (text, optional) - Lead's company name
      - `submission_type` (text, required) - Type of submission (lead_magnet, contact_form, etc)
      - `created_at` (timestamptz) - Timestamp of submission
      - `metadata` (jsonb, optional) - Additional data (budget, message, etc)

  2. Security
    - Enable RLS on `lead_submissions` table
    - Add policy for service role to insert data (form submissions)
    - No public read access (internal use only)

  3. Notes
    - This table stores all lead capture submissions
    - Email validation should be handled on the application layer
    - Indexes added for common queries
*/

CREATE TABLE IF NOT EXISTS lead_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  submission_type text NOT NULL DEFAULT 'lead_magnet',
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lead_submissions ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_lead_submissions_email ON lead_submissions(email);
CREATE INDEX IF NOT EXISTS idx_lead_submissions_created_at ON lead_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_submissions_type ON lead_submissions(submission_type);

CREATE POLICY "Service role can insert lead submissions"
  ON lead_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
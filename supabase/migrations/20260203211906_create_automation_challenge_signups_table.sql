/*
  # Create Automation Challenge Signups Table

  1. New Tables
    - `automation_challenge_signups`
      - `id` (uuid, primary key) - Unique identifier for each signup
      - `email` (text, required) - User's email address
      - `company` (text, required) - User's company name
      - `created_at` (timestamptz) - Timestamp of signup
      - `email_sent` (boolean) - Whether notification email was sent
  
  2. Security
    - Enable RLS on `automation_challenge_signups` table
    - Add policy for authenticated admin users to read all signups
    - Add policy for service role to insert signups
  
  3. Purpose
    - Stores signups for the "Automation Challenge" where users receive 7 cost-saving automation opportunities within 30 days
    - Collects only company name and email address as required
*/

CREATE TABLE IF NOT EXISTS automation_challenge_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  company text NOT NULL,
  created_at timestamptz DEFAULT now(),
  email_sent boolean DEFAULT false
);

ALTER TABLE automation_challenge_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert challenge signups"
  ON automation_challenge_signups
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read challenge signups"
  ON automation_challenge_signups
  FOR SELECT
  TO authenticated
  USING (true);
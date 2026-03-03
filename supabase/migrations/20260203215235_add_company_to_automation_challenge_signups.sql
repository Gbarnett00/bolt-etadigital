/*
  # Add company column to automation_challenge_signups table

  1. Changes
    - Add `company` column to `automation_challenge_signups` table
      - Type: text
      - Nullable: true (optional field)

  2. Notes
    - Existing records will have NULL for company field
    - New signups can include company information
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'automation_challenge_signups' AND column_name = 'company'
  ) THEN
    ALTER TABLE automation_challenge_signups ADD COLUMN company text;
  END IF;
END $$;
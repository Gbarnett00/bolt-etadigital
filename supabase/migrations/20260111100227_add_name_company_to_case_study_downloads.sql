/*
  # Add name and company fields to case study downloads

  1. Changes
    - Add `name` column to store the person's name
    - Add `company` column to store the company name (optional)
  
  2. Notes
    - Both fields are nullable for backwards compatibility with existing records
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_study_downloads' AND column_name = 'name'
  ) THEN
    ALTER TABLE case_study_downloads ADD COLUMN name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'case_study_downloads' AND column_name = 'company'
  ) THEN
    ALTER TABLE case_study_downloads ADD COLUMN company text;
  END IF;
END $$;
-- Create the 'toys' table
CREATE TABLE toys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  "imageUrl" TEXT NOT NULL,
  "isNewArrival" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Note: Ensure you have a public bucket named 'toy-images' in Supabase Storage.
-- Set the RLS (Row Level Security) policies to allow public read and authenticated/public insert for 'toys' table.
-- For simplicity in this demo, you can disable RLS for 'toys' table or add a 'true' policy.

-- Policy to allow anyone to read toys
CREATE POLICY "Allow public read" ON toys FOR SELECT USING (true);

-- Policy to allow anyone to insert toys (for this demo)
CREATE POLICY "Allow public insert" ON toys FOR INSERT WITH CHECK (true);

-- Policy to allow anyone to delete toys (for this demo)
CREATE POLICY "Allow public delete" ON toys FOR DELETE USING (true);

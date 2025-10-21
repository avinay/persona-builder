-- Create personas table
CREATE TABLE IF NOT EXISTS personas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER,
    education VARCHAR(255),
    status VARCHAR(100),
    occupation VARCHAR(255),
    location VARCHAR(255),
    tech_literacy VARCHAR(50),
    goals TEXT,
    frustrations TEXT,
    quote TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_personas_created_at ON personas(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for authenticated users
-- You can modify this based on your authentication requirements
CREATE POLICY "Allow all operations for authenticated users" ON personas
    FOR ALL USING (auth.role() = 'authenticated');

-- Create a policy for anonymous access (if you want to allow it)
-- Uncomment the following lines if you want to allow anonymous access
-- CREATE POLICY "Allow anonymous access" ON personas
--     FOR ALL USING (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_personas_updated_at 
    BEFORE UPDATE ON personas 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

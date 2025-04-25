const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://uoaojxguajrojrrmdrdy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvYW9qeGd1YWpyb2pycm1kcmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1Mjk1MzYsImV4cCI6MjA2MTEwNTUzNn0.Yr3Gx-DEj11bsZarTNZ5LOFR364g1YTygNm9BN2nmq0';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;

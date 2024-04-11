import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dfrhtfajysbbpzsmungw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmcmh0ZmFqeXNiYnB6c211bmd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2NTU3NjYsImV4cCI6MjAyNjIzMTc2Nn0.YByR-CQpO_1ZWljb3A60RQDkjhGw5YhWbyo0kV3MD00"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

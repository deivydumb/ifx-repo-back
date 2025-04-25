const express = require('express');
const supabase = require('./config/database');

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  const { data, error } = await supabase.from('User').select('*');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
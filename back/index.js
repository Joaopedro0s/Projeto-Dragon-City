const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração da conexão com o banco MySQL
const db = mysql.createPool({
  host: 'localhost',       
  user: 'root',     
  password: '',   
  database: 'dragoncity'  
});

// Rota para cadastrar dragão
app.post('/dragao', (req, res) => {
  const { nome, tipo, habitat, nivel, raridade, imagem_url } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'O campo nome é obrigatório.' });
  }

  const sql = 'INSERT INTO dragoes (nome, tipo, habitat, nivel, raridade, imagem_url) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nome, tipo, habitat, nivel, raridade, imagem_url], (err, result) => {
    if (err) {
      console.error('Erro no banco:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar dragão.' });
    }
    res.json({ message: 'Dragão cadastrado com sucesso!', id: result.insertId });
  });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

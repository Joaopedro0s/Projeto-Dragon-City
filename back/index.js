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

// Rota para buscar todos os dragões
app.get('/dragoes', (req, res) => {
  const sql = 'SELECT * FROM dragoes ORDER BY nome ASC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar dragões:', err);
      return res.status(500).json({ error: 'Erro ao buscar dragões.' });
    }
    res.json(results);
  });
});

// Rota para atualizar o nível de um dragão
app.put('/dragao/:id', (req, res) => {
  const { id } = req.params;
  const nivel = Number(req.body.nivel);

  if (nivel === undefined || isNaN(nivel) || nivel < 1) {
    return res.status(400).json({ error: 'Nível inválido.' });
  }

  const sql = 'UPDATE dragoes SET nivel = ? WHERE id = ?';
  db.query(sql, [nivel, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar nível:', err.sqlMessage || err);
      return res.status(500).json({ error: 'Erro ao atualizar nível.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Dragão não encontrado.' });
    }
    res.json({ message: 'Nível atualizado com sucesso.' });
  });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});

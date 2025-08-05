create database dragoncity;

use dragoncity;

CREATE TABLE dragoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  tipo VARCHAR(50),
  habitat VARCHAR(100),
  nivel INT,
  raridade VARCHAR(50),
  imagem_url TEXT
);
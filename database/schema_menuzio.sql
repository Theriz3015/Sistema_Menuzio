-- Criar o banco de dados, se ainda não existir
CREATE DATABASE IF NOT EXISTS menuzio_bd;
USE menuzio_bd;

-- Remover tabelas existentes para recriação limpa
DROP TABLE IF EXISTS item_pedido;
DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS estoque;
DROP TABLE IF EXISTS produto;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS cliente;

-- Criar tabelas
CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin', 'garcom', 'cozinha') DEFAULT 'garcom'
);

CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50)
);

CREATE TABLE estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT UNIQUE NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);

CREATE TABLE pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    usuario_id INT NOT NULL, -- Garçom ou quem registrou o pedido
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'em_preparo', 'pronto', 'entregue', 'cancelado') DEFAULT 'pendente',
    total DECIMAL(10, 2) DEFAULT 0.00,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE item_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedido(id),
    FOREIGN KEY (produto_id) REFERENCES produto(id)
);


-- INSERIR CLIENTE SE NÃO EXISTIR
INSERT INTO cliente (nome, email)
SELECT 'João da Silva', 'joao@email.com' FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM cliente WHERE email = 'joao@email.com');

-- INSERIR USUÁRIO SE NÃO EXISTIR
INSERT INTO usuario (nome, email, senha, tipo)
SELECT 'Admin', 'admin@email.com', '123456', 'admin' FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE email = 'admin@email.com');

-- INSERIR PRODUTOS SE NÃO EXISTIREM
INSERT INTO produto (nome, descricao, preco, categoria)
SELECT 'Pizza Calabresa', 'Deliciosa pizza de calabresa', 35.00, 'Pizza' FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Pizza Calabresa');

INSERT INTO produto (nome, descricao, preco, categoria)
SELECT 'Suco de Laranja', 'Suco natural de laranja', 8.00, 'Bebida' FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Suco de Laranja');

INSERT INTO produto (nome, descricao, preco, categoria)
SELECT 'Lasanha', 'Lasanha com molho à bolonhesa', 27.50, 'Massa' FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM produto WHERE nome = 'Lasanha');

-- INSERIR ESTOQUE PARA PRODUTOS QUE AINDA NÃO TÊM
INSERT INTO estoque (produto_id, quantidade)
SELECT p.id, 20 FROM produto p
WHERE NOT EXISTS (SELECT 1 FROM estoque e WHERE e.produto_id = p.id);
-- Verificar cliente
SELECT * FROM cliente;

-- Verificar usuário
SELECT * FROM usuario;

-- Verificar produtos
SELECT * FROM produto;

-- Verificar estoque
SELECT * FROM estoque;


-- Inserir cliente se não existir
INSERT INTO cliente (nome, email)
SELECT * FROM (
  SELECT 'João da Silva' AS nome, 'joao@email.com' AS email
) AS tmp
WHERE NOT EXISTS (
  SELECT 1 FROM cliente WHERE email = 'joao@email.com'
);

-- Inserir usuário admin se não existir
INSERT INTO usuario (nome, email, senha, tipo)
SELECT * FROM (
  SELECT 'Admin' AS nome, 'admin@email.com' AS email, '123456' AS senha, 'admin' AS tipo
) AS tmp
WHERE NOT EXISTS (
  SELECT 1 FROM usuario WHERE email = 'admin@email.com'
);

-- Inserir produtos se não existirem
INSERT INTO produto (nome, descricao, preco, categoria)
SELECT * FROM (
  SELECT 'Pizza Calabresa' AS nome, 'Pizza com calabresa' AS descricao, 35.00 AS preco, 'Pizza' AS categoria
) AS tmp
WHERE NOT EXISTS (
  SELECT 1 FROM produto WHERE nome = 'Pizza Calabresa'
);

INSERT INTO produto (nome, descricao, preco, categoria)
SELECT * FROM (
  SELECT 'Suco de Laranja' AS nome, 'Suco natural de laranja' AS descricao, 8.00 AS preco, 'Bebida' AS categoria
) AS tmp
WHERE NOT EXISTS (
  SELECT 1 FROM produto WHERE nome = 'Suco de Laranja'
);

-- Inserir estoque para produtos existentes se ainda não houver
INSERT INTO estoque (produto_id, quantidade)
SELECT p.id, 20 FROM produto p
WHERE NOT EXISTS (
  SELECT 1 FROM estoque e WHERE e.produto_id = p.id
);

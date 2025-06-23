

-- Verificar pedidos
SELECT * FROM pedido;

-- Verificar itens de pedido
SELECT * FROM item_pedido;

-- Verificar produtos
SELECT * FROM produto;

-- Verificar estoque
SELECT * FROM estoque;

-- Criar um pedido (cliente_id = 1, usuario_id = 1)
INSERT INTO pedido (cliente_id, usuario_id, total)
VALUES (1, 1, 70.00);

-- Verifique o id gerado
SELECT MAX(id) FROM pedido;

-- Suponha que o pedido criado tenha id = 1

-- Inserir item do pedido (2 Pizzas de R$35)
INSERT INTO item_pedido (pedido_id, produto_id, quantidade, preco_unitario)
VALUES (1, 1, 2, 35.00);

-- Atualizar estoque (remover 2 pizzas)
UPDATE estoque SET quantidade = quantidade - 2 WHERE produto_id = 1;


-- Consulta: total de pedidos por cliente
SELECT c.id AS cliente_id, c.nome, COUNT(p.id) AS total_pedidos
FROM cliente c
LEFT JOIN pedido p ON p.cliente_id = c.id
GROUP BY c.id, c.nome;

-- Consulta: produtos da categoria 'Pizza'
SELECT id, nome, descricao, preco FROM produto WHERE categoria = 'Pizza';

-- Consulta: produtos com estoque < 10
SELECT p.nome, e.quantidade
FROM produto p
JOIN estoque e ON e.produto_id = p.id
WHERE e.quantidade < 10;

-- Consulta: total por pedido
SELECT p.id AS pedido_id, c.nome AS cliente_nome,
       SUM(ip.quantidade * ip.preco_unitario) AS total_pedido
FROM pedido p
JOIN cliente c ON p.cliente_id = c.id
JOIN item_pedido ip ON ip.pedido_id = p.id
GROUP BY p.id, c.nome;

-- Consulta: Top 3 produtos mais vendidos
SELECT pr.nome, SUM(ip.quantidade) AS total_vendido
FROM item_pedido ip
JOIN produto pr ON pr.id = ip.produto_id
GROUP BY pr.nome
ORDER BY total_vendido DESC
LIMIT 3;

UPDATE estoque SET quantidade = 5 WHERE produto_id = 1;


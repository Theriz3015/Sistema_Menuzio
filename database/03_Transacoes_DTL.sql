

-- Transação 01: Efetuar um pedido
START TRANSACTION;

-- Inserir pedido (cliente_id 1, usuario_id 1)
INSERT INTO pedido (cliente_id, usuario_id, total)
VALUES (1, 1, 70.00);
SET @pedido_id = LAST_INSERT_ID();

-- SAVEPOINT antes de inserir itens
SAVEPOINT sp_itens;

-- Inserir item 1: Pizza Calabresa (produto_id 1)
INSERT INTO item_pedido (pedido_id, produto_id, quantidade, preco_unitario)
VALUES (@pedido_id, 1, 2, 35.00);

-- Atualizar estoque do produto_id 1
UPDATE estoque SET quantidade = quantidade - 2 WHERE produto_id = 1;

-- Se quantidade for negativa, rollback parcial
-- Exemplo: ROLLBACK TO sp_itens;

-- Finalizar pedido
UPDATE pedido SET status = 'em_preparo' WHERE id = @pedido_id;

COMMIT;


-- Transação 02: Cancelar pedido
START TRANSACTION;

-- Recuperar o último pedido para exemplo
SET @pedido_id_cancelar = (SELECT MAX(id) FROM pedido);

-- SAVEPOINT antes de cancelamento
SAVEPOINT sp_cancelar;

-- Restaurar estoque dos itens do pedido
UPDATE estoque e
JOIN item_pedido ip ON ip.produto_id = e.produto_id
SET e.quantidade = e.quantidade + ip.quantidade
WHERE ip.pedido_id = @pedido_id_cancelar;

-- Deletar itens do pedido
DELETE FROM item_pedido WHERE pedido_id = @pedido_id_cancelar;

-- Deletar o pedido
DELETE FROM pedido WHERE id = @pedido_id_cancelar;

COMMIT;


-- Transação 03: Repor estoque manualmente
START TRANSACTION;

-- SAVEPOINT antes da alteração
SAVEPOINT sp_reposicao;

-- Repor 10 unidades ao produto_id 2 (Suco de Laranja)
UPDATE estoque SET quantidade = quantidade + 10 WHERE produto_id = 2;

-- Simulação de falha:
-- UPDATE estoque SET quantidade = -5 WHERE produto_id = 2;

-- Caso erro, rollback:
-- ROLLBACK TO sp_reposicao;

COMMIT;

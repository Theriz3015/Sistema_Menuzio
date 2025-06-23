
# Menuzio - Banco de Dados

**Integrantes do grupo:**
- Arthur Félix
- Luan Ventura
- Alanna Santos
- Heric Rocha
- Ágata Oliveira
- Sara Trindade

## Visão Geral
Este banco de dados dá suporte ao sistema Menuzio, um sistema web/app que permite gerenciar pedidos, produtos, estoque e usuários de restaurantes. Ele armazena e relaciona dados como clientes, produtos cadastrados, pedidos realizados, movimentações de estoque e controle de usuários.

## Instruções de Importação
1. Crie o banco no MySQL:
   ```sql
   CREATE DATABASE IF NOT EXISTS menuzio_bd;
   USE menuzio_bd;
   ```

2. Importe o script `schema.sql` para criar a estrutura do banco e dados iniciais.
3. Execute `seed_dados_exemplo.sql` para preencher com dados prontos para testes.
4. Execute os scripts:
   - `02_Consultas_DQL.sql`
   - `03_Transacoes_DTL.sql`

## Estrutura de Pastas

```
Avaliacao_Final_BD/
├── 01_Modelagem/
├── 02_Consultas_DQL/
├── 03_Transacoes_DTL/
├── 04_Documentacao/
│   ├── schema.sql
│   ├── seed_dados_exemplo.sql
│   └── README.md
├── 05_Apresentacao/
```

## Requisitos
- MySQL 8.0+
- MySQL Workbench ou DBeaver
- Usuário com permissões para criar bancos e tabelas

## Observações
- Transações usam `SAVEPOINT`, `ROLLBACK`, `COMMIT`
- Relacionamentos com integridade referencial

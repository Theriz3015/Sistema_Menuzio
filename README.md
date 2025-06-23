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

Avaliacao_Final_BD/
├── 01_Modelagem/
├── 02_Consultas_DQL/
├── 03_Transacoes_DTL/
├── 04_Documentacao/
│   ├── schema.sql
│   ├── seed_dados_exemplo.sql
│   └── README.md
├── 05_Apresentacao/


## Requisitos
- MySQL 8.0+
- MySQL Workbench ou DBeaver
- Usuário com permissões para criar bancos e tabelas

## Observações
- Transações usam `SAVEPOINT`, `ROLLBACK`, `COMMIT`
- Relacionamentos com integridade referencial

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
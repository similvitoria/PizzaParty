# 🍕 Projeto Pizzaria API

Este projeto consiste em duas APIs distintas que funcionam de forma complementar para a gestão de uma pizzaria, com funcionalidades como controle de clientes, pedidos e produtos, além de integração com o Stripe para pagamentos online.

## 📁 Estrutura do Projeto

```
--.env
--.gitignore
--package-lock.json
--package.json
--server.js         # API de pagamentos com Stripe
src/
  controllers/      # Controladores de negócio
  db/
    --script.db     # Base de dados (provavelmente SQLite)
  repositories/     # Acesso aos dados
  routes/           # Rotas das APIs
  schemas/          # Modelos/tipagem dos dados
  --database.ts     # Conexão com banco de dados
  --index.ts        # API principal da pizzaria
--tsconfig.json
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão recomendada: 18+)
- npm ou yarn
- Stripe Key configurada (ver `.env`)

### Instalação

```bash
npm install
```

### Ambiente

Crie um arquivo `.env` com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=senha123
DB_NAME=pizzaria
```

### Executando as APIs

**API Principal (TypeScript):**

```bash
npx ts-node src/index.ts
```

**API de Pagamentos (Stripe):**

```bash
node server.js
```

> As duas APIs devem ser executadas simultaneamente em terminais diferentes.

## 🔁 APIs Disponíveis

### API Principal (`index.ts`)
Rotas REST para gerenciamento do sistema da pizzaria:

- `GET /customers`, `POST /customers`, etc.
- `GET /orders`, `POST /orders`, etc.
- `GET /products`, `POST /products`, etc.

As rotas estão organizadas nos arquivos `src/routes/*.ts` com controle e acesso via `controllers/` e `repositories/`.

### API de Pagamentos (`server.js`)
Rota de integração com a Stripe:

#### `POST /create-payment-intent`
Gera um `PaymentIntent` para processar pagamento.

**Corpo esperado:**
```json
{
  "amount": 5000,
  "currency": "brl",
  "customerName": "João da Silva",
  "customerEmail": "joao@email.com"
}
```

**Resposta:**
```json
{
  "clientSecret": "pi_XXX_secret_YYY"
}
```

## 🧠 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Stripe
- dotenv
- PostgreSQL

## 📌 Observações

- A API de pagamentos está configurada para usar uma chave fixa do Stripe diretamente no código. Recomenda-se mover para o `.env` por segurança.
- Há validações robustas nos dados de pagamento, como valor numérico, e-mail e moeda suportada.
- O projeto está modularizado usando camadas (Controller, Repository, Routes).
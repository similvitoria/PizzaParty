# 🍕 Pizza Party - Sistema Completo

## 📋 Visão Geral

O **Pizza Party** é um sistema completo de gerenciamento de pizzaria, incluindo:

- **Frontend**: Interface moderna para pedidos online  
- **Backend**: APIs robustas para gestão de dados  
- **Pagamentos**: Integração com Stripe  

---

## 🚀 Como Executar o Projeto

### ✅ Pré-requisitos

- Node.js (versão 16 ou superior)  
- npm ou yarn  
- PostgreSQL (para o backend)  
- Conta no Stripe (para pagamentos)  

---

### 📦 Instalação

git clone https://github.com/similvitoria/PizzaParty

#### Backend

```env
cd PizzaParty/backend
npm install
```

#### Frontend

```env
cd ../PizzaParty/frontend
npm install
```

#### ⚙️ Configuração

#### Backend (`.env`)

Criar um arquivo .env na pasta backend e colocar o seguinte:
Obs: é necessário ter uma conta no STRIPE para usar a chave pública
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha_do_postgres
DB_NAME=pizzaria
STRIPE_SECRET_KEY=sua_chave_publica_do_stripe
```

---

### ▶️ Execução

#### 

Crie uma database chamada "pizzaria" no PostgreSQL (pgAdmin4) para criar o banco de dados  
Rode este script                     no PostgreSQL (pgAdmin4) para criar as tabelas do banco de dados     
```bash
-- Tabela de produtos
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  image_path VARCHAR(255),
  price FLOAT NOT NULL CHECK (price > 0)
);

-- Tabela de clientes
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT
);

-- Criação da tabela orders com campo product_ids (array de inteiros)
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  total_price FLOAT NOT NULL CHECK (total_price > 0),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending' CHECK (
    status IN ('pending', 'confirmed', 'delivered', 'cancelled')
  ),
  product_ids INTEGER[] NOT NULL
);



```
#### Backend (em terminais separados):

```bash
# API Principal
cd backend
npm run dev

# API de Pagamentos
npm start
```

#### Frontend:

Abrir com Live Server:  
-Clicar com botão direito no arquivo index.html  
-Open with live server 

---

## 📂 Estrutura do Projeto

### Backend

```
.env
server.js              # API de pagamentos
src/
├── controllers/       # Lógica de negócio
├── db/                # Scripts de banco de dados
├── repositories/      # Acesso aos dados
├── routes/            # Definição de rotas
├── schemas/           # Modelos de dados
├── database.ts        # Conexão com DB
└── index.ts           # API principal
```

### Frontend

```
public/
src/
├── components/        # Componentes reutilizáveis
├── pages/             # Páginas principais
├── styles/            # Estilos CSS
├── utils/             # Funções utilitárias
├── App.js             # Componente raiz
└── index.js           # Ponto de entrada
```

---

## 🔄 Fluxo do Sistema

1. Cliente faz pedido no frontend  
2. Dados são enviados para a API principal  
3. Pagamento é processado via API Stripe  
4. Pedido é registrado no banco de dados  
5. A rota de entrega é apresentada ao cliente

---

## 🌐 APIs Disponíveis

### API Principal (`http://localhost:3001`)

- `GET /products` - Lista de produtos  
- `POST /orders` - Cria novo pedido  
- `GET /customers` - Gerencia clientes  

### API de Pagamentos (`http://localhost:3000`)

- `POST /create-payment-intent` - Processa pagamentos  

Exemplo de corpo da requisição:

```json
{
  "amount": 5000,
  "currency": "brl",
  "customerName": "João Silva",
  "customerEmail": "joao@email.com"
}
```

---

## 🛠 Tecnologias Utilizadas

### Backend

- Node.js  
- TypeScript  
- Express  
- PostgreSQL  
- Stripe  

### Frontend

- React.js  
- HTML5/CSS3  
- Leaflet.js (mapas)  
- Font Awesome  

---

## 🛒 Funcionalidades Principais

### Frontend

- Menu interativo por categorias  
- Carrinho persistente  
- Checkout em múltiplas etapas  
- Acompanhamento de entrega em mapa  

### Backend

- CRUD completo de produtos/pedidos/clientes  
- Validação robusta de dados  
- Processamento seguro de pagamentos  
- Modularização por camadas  

---

## 📌 Observações Importantes 

### Desenvolvimento

- O frontend usa `localStorage` para simular carrinho  
- O backend possui validações completas  

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório  
2. Crie uma branch com sua feature  
3. Envie um pull request  

---

## 📧 Contato

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.

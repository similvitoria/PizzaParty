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

#### Backend

```bash
git clone <url-do-repositorio>
cd pizza-party-backend
npm install
```

#### Frontend

```bash
cd ../pizza-party-frontend
npm install
```

---

### ⚙️ Configuração

#### Backend (`.env`)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=senha123
DB_NAME=pizzaria
STRIPE_SECRET_KEY=sua_chave_secreta_do_stripe
```

#### Frontend (`.env`)

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_STRIPE_API_URL=http://localhost:3000
REACT_APP_STRIPE_PUBLIC_KEY=sua_chave_publica_do_stripe
```

---

### ▶️ Execução

#### Backend (em terminais separados):

```bash
# API Principal
npx ts-node src/index.ts

# API de Pagamentos
node server.js
```

#### Frontend:

```bash
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

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
5. Cliente acompanha entrega em tempo real  

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

### Segurança

- Nunca comite chaves do Stripe ou credenciais de banco  
- Use sempre HTTPS em produção  

### Desenvolvimento

- O frontend usa `localStorage` para simular carrinho  
- O backend possui validações completas  

### Produção

- Configure CORS adequadamente  
- Implemente autenticação para APIs  

---

## 📈 Próximos Passos

- Implementar autenticação JWT  
- Criar painel administrativo  
- Adicionar sistema de avaliações  
- Implementar push notifications  

---

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório  
2. Crie uma branch com sua feature  
3. Envie um pull request  

---

## 📧 Contato

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.
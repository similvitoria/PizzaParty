require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Use a chave SECRETA do Stripe (carregada do .env)
const stripe = require('stripe')('sk_test_51RMqjBJCdQLzrfYJ7z0PmbFtoTt9JOgaZnWAVyAGc7RTjVUcBrtgDcRwxQuKcAi5aGgNPBl5J9FLZGt0N8oMMrha00yhttGULp');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
try {
  const { amount, currency, customerName, customerEmail } = req.body;

  // Validações rigorosas
  if (
    typeof amount !== 'number' || isNaN(amount) || amount <= 0 ||
    typeof currency !== 'string' || !['brl', 'usd', 'eur'].includes(currency.toLowerCase())
  ) {
    return res.status(400).json({ error: 'Dados inválidos para pagamento.' });
  }

  if (!customerName || typeof customerName !== 'string') {
    return res.status(400).json({ error: 'Nome do cliente é obrigatório e deve ser uma string.' });
  }

  if (!customerEmail || typeof customerEmail !== 'string' || !customerEmail.includes('@')) {
    return res.status(400).json({ error: 'Email do cliente é obrigatório e deve ser válido.' });
  }

  // Criação do PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: currency.toLowerCase(),
    description: `Pedido de ${customerName}`,
    receipt_email: customerEmail,
  });

  res.json({ clientSecret: paymentIntent.client_secret });

} catch (error) {
  console.error('Erro ao criar PaymentIntent:', {
    message: error.message,
    stack: error.stack,
  });
  res.status(500).json({
    error: 'Não foi possível processar o pagamento. Tente novamente mais tarde.',
  });
}
});

app.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
});
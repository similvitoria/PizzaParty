import express from 'express';
import cors from 'cors'; // <-- importe o CORS
import productRoutes from './routes/productRoutes';
import customerRoutes from './routes/customerRoutes';
import orderRoutes from './routes/orderRoutes';

const port = 3000;
const app = express();

app.use(cors()); // <-- habilita CORS para todas as origens
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});

import { Router } from "express";
import { OrderController } from "../controllers/orderController";

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.get('/', orderController.getAll);
orderRoutes.get('/:id', orderController.getById);
orderRoutes.post('/', orderController.create);
orderRoutes.put('/:id', orderController.update);
orderRoutes.delete('/:id', orderController.delete);

export default orderRoutes;
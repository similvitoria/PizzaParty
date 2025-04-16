import { Router } from "express";
import { CustomerController } from "../controllers/customerController";

const customerRoutes = Router();
const customerController = new CustomerController();

customerRoutes.get('/', customerController.getAll)
customerRoutes.get('/:id', customerController.getById);
customerRoutes.post('/', customerController.create);

export default customerRoutes;
import { Router } from "express";
import { ProductController } from "../controllers/productController";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get('/', productController.getAll)
productRoutes.get('/:id', productController.getById);
productRoutes.post('/', productController.create);
export default productRoutes;
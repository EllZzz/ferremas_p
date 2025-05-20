import express from "express";
import { 
    getAllProducts,
    createProduct,
    deleteProduct
 } from "../controllers/product.controller.js";

const router = express.Router();

router.get('/', getAllProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
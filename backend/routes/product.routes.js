import express from "express";
import { 
    getAllProducts,
    createProduct,
    deleteProduct,
    getProductById,
    updateProduct
 } from "../controllers/product.controller.js";

const router = express.Router();

router.get('/', getAllProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

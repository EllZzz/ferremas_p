import express from "express";

import userRoutes from "./user.routes.js";
import reviewRoutes from "./review.routes.js";
import productRoutes from "./product.routes.js";
import categoryRoutes from "./category.routes.js"; 
import stripeRoutes from './stripe.routes.js';
import authRoutes from "./auth.routes.js";
import brandRoutes from "./brand.routes.js";


const router = express.Router();

router.use("/users", userRoutes); 
router.use("/reviews", reviewRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use('/stripe', stripeRoutes);
router.use("/auth", authRoutes);
router.use("/brand", brandRoutes);

export default router;




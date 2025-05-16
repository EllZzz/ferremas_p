import reviewRoutes from "./review.routes.js";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";  // Importa la ruta de productos
import categoryRoutes from "./category.routes.js"; 
import authRoutes from './auth.routes.js';

const routes = [
  { path: "/api/reviews", router: reviewRoutes },
  { path: "/api/users", router: userRoutes },
  { path: "/api/products", router: productRoutes },  
   { path: "/api/categories", router: categoryRoutes },// Agrega esta línea
    { path: '/api/auth', router: authRoutes },
];

export default routes;

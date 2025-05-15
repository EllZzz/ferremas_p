import reviewRoutes from "./review.routes.js";
import userRoutes from "./user.routes.js";
import productRoutes from "./product.routes.js";  // Importa la ruta de productos

const routes = [
  { path: "/api/reviews", router: reviewRoutes },
  { path: "/api/users", router: userRoutes },
  { path: "/api/products", router: productRoutes },  // Agrega esta línea
];

export default routes;

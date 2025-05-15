import reviewRoutes from "./review.routes.js";
import userRoutes from "./user.routes.js";


const routes = [
  { path: "/api/reviews", router: reviewRoutes },
  { path: "/api/users", router: userRoutes },
];

export default routes;

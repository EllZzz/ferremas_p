import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import models from "./models/index.js"; 
import routes from "./routes/index.js";
import stripeRoutes from './routes/stripe.routes.js';
import Stripe from "stripe";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", (req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});
app.use("/api", routes);
app.use("/images", express.static(path.join(__dirname, "static/images")));

models.sequelize.authenticate()
  .then(() => {
    console.log("Conexión con la base de datos establecida.");
    return models.sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err);
  });

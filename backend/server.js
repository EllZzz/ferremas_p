import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import models from "./models/index.js"; 
import routes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.get("/api/data", (req, res) => {
  res.json({ message: "Hola desde Node.js y Sequelize" });
});

routes.forEach(({ path, router }) => {
  app.use(path, router);
});


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

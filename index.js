require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const employeeRoutes = require("./src/routes/employeeRoutes");
const authRoutes = require("./src/routes/authRoutes");
const evaluationRoutes = require("./src/routes/evaluationRoutes");
const questionRoutes = require("./src/routes/questionRoutes");
const responseRoutes = require("./src/routes/responseRoutes");
const reportRoutes = require("./src/routes/reportRoutes");
const app = express();
const PORT = process.env.PORT || 5000;
const { swaggerUi, swaggerDocs } = require("./src/config/swagger");

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/reports", reportRoutes);

// Ruta base para verificar que el servidor está activo
app.get("/", (req, res) => {
  res.send("Nolatech Test API Server");
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT} port`);
  console.log(
    `Documentación de la API disponible en http://localhost:${PORT}/api-docs`
  );
});

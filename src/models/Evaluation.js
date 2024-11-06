const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  period: { type: String, required: true }, // Ejemplo: "Q1-2024"
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  type: { type: String, enum: ["self", "peer", "manager"], required: true },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  }, // Evaluado
  responses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }], // Referencia a respuestas
});

module.exports = mongoose.model("Evaluation", evaluationSchema);

const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  }, // Referencia a la pregunta
  evaluation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evaluation",
    required: true,
  }, // Evaluación a la que pertenece
  answer: { type: String, required: true }, // Respuesta dada
  score: { type: Number, min: 1, max: 5 }, // Puntuación opcional (de 1 a 5)
});

module.exports = mongoose.model("Response", responseSchema);

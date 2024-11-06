const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Texto de la pregunta
  category: { type: String }, // Categoría opcional, como "habilidades técnicas", "comunicación", etc.
});

module.exports = mongoose.model("Question", questionSchema);

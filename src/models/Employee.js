const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String },
  department: { type: String },
  evaluations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Evaluation" }], // Referencia a evaluaciones
});

module.exports = mongoose.model("Employee", employeeSchema);

const Response = require("../models/Response");

// Controlador para crear una nueva respuesta
exports.createResponse = async (req, res) => {
  const { question, evaluation, answer, score } = req.body;
  try {
    const response = await Response.create({
      question,
      evaluation,
      answer,
      score,
    });
    res
      .status(201)
      .json({ message: "Respuesta creada exitosamente", response });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la respuesta", error });
  }
};

// Controlador para obtener todas las respuestas de una evaluación específica
exports.getResponsesByEvaluation = async (req, res) => {
  try {
    const responses = await Response.find({
      evaluation: req.params.evaluationId,
    })
      .populate("question")
      .populate("evaluation");
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener respuestas", error });
  }
};

// Controlador para actualizar una respuesta por ID
exports.updateResponse = async (req, res) => {
  const { answer, score } = req.body;
  try {
    const response = await Response.findByIdAndUpdate(
      req.params.id,
      { answer, score },
      { new: true }
    );
    if (!response) {
      return res.status(404).json({ message: "Respuesta no encontrada" });
    }
    res.status(200).json({ message: "Respuesta actualizada", response });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la respuesta", error });
  }
};

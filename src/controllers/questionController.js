const Question = require("../models/Question");

// Controlador para crear una nueva pregunta
exports.createQuestion = async (req, res) => {
  const { text, category } = req.body;
  try {
    const question = await Question.create({ text, category });
    res.status(201).json({ message: "Pregunta creada exitosamente", question });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la pregunta", error });
  }
};

// Controlador para obtener todas las preguntas
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener preguntas", error });
  }
};

// Controlador para actualizar una pregunta por ID
exports.updateQuestion = async (req, res) => {
  const { text, category } = req.body;
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { text, category },
      { new: true }
    );
    if (!question) {
      return res.status(404).json({ message: "Pregunta no encontrada" });
    }
    res.status(200).json({ message: "Pregunta actualizada", question });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la pregunta", error });
  }
};

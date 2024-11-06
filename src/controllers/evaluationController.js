const Evaluation = require("../models/Evaluation");
const Response = require("../models/Response");
const User = require("../models/User");

// Controlador para crear una nueva evaluación
exports.createEvaluation = async (req, res) => {
  const { period, status, type, employee } = req.body;
  try {
    const evaluation = await Evaluation.create({
      period,
      status,
      type,
      employee,
    });
    res
      .status(201)
      .json({ message: "Evaluación creada exitosamente", evaluation });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la evaluación", error });
  }
};

// Controlador para obtener todas las evaluaciones
exports.getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find().populate("employee");
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener evaluaciones", error });
  }
};

// Controlador para obtener una evaluación por ID
exports.getEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id).populate(
      "employee"
    );
    if (!evaluation) {
      return res.status(404).json({ message: "Evaluación no encontrada" });
    }
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la evaluación", error });
  }
};

// Controlador para actualizar una evaluación por ID
exports.updateEvaluation = async (req, res) => {
  const { period, status, type } = req.body;
  try {
    const evaluation = await Evaluation.findByIdAndUpdate(
      req.params.id,
      { period, status, type },
      { new: true }
    );
    if (!evaluation) {
      return res.status(404).json({ message: "Evaluación no encontrada" });
    }
    res.status(200).json({ message: "Evaluación actualizada", evaluation });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la evaluación", error });
  }
};

// Controlador para enviar una evaluación completada
exports.submitEvaluation = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ message: "Evaluación no encontrada" });
    }

    // Cambia el estado a "completed" para marcar la evaluación como completada
    evaluation.status = "completed";
    await evaluation.save();

    res.status(200).json({ message: "Evaluación completada", evaluation });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar la evaluación", error });
  }
};

// Controlador para calcular el puntaje de una evaluación específica
exports.calculateEvaluationScore = async (req, res) => {
  try {
    const evaluationId = req.params.id;

    // Obtiene todas las respuestas de la evaluación
    const responses = await Response.find({ evaluation: evaluationId });
    if (responses.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron respuestas para esta evaluación" });
    }

    // Calcula el puntaje promedio
    const totalScore = responses.reduce(
      (sum, response) => sum + (response.score || 0),
      0
    );
    const averageScore = totalScore / responses.length;

    res.status(200).json({
      message: "Puntaje calculado exitosamente",
      evaluationId,
      averageScore,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al calcular el puntaje", error });
  }
};

// Controlador para asignar evaluadores a una evaluación
exports.assignEvaluators = async (req, res) => {
  const { evaluators } = req.body; // Lista de IDs de evaluadores
  const evaluationId = req.params.id;

  try {
    const evaluation = await Evaluation.findById(evaluationId);
    if (!evaluation) {
      return res.status(404).json({ message: "Evaluación no encontrada" });
    }

    // Verifica que los evaluadores existan y que tengan el rol adecuado
    const validEvaluators = await User.find({
      _id: { $in: evaluators },
      role: { $in: ["manager", "employee"] },
    });

    if (validEvaluators.length !== evaluators.length) {
      return res
        .status(400)
        .json({ message: "Uno o más evaluadores no son válidos" });
    }

    // Asigna los evaluadores a la evaluación
    evaluation.evaluators = evaluators;
    await evaluation.save();

    res
      .status(200)
      .json({ message: "Evaluadores asignados exitosamente", evaluation });
  } catch (error) {
    res.status(500).json({ message: "Error al asignar evaluadores", error });
  }
};

// Controlador para enviar notificaciones de evaluaciones pendientes
exports.sendPendingNotifications = async (req, res) => {
  try {
    // Busca evaluaciones pendientes y con evaluadores asignados
    const pendingEvaluations = await Evaluation.find({
      status: "pending",
    }).populate("evaluators");

    if (pendingEvaluations.length === 0) {
      return res
        .status(200)
        .json({ message: "No hay evaluaciones pendientes" });
    }

    // Aquí simulamos el envío de notificaciones
    pendingEvaluations.forEach((evaluation) => {
      evaluation.evaluators.forEach((evaluator) => {
        console.log(
          `Notificación: ${evaluator.username}, tienes una evaluación pendiente para el empleado ${evaluation.employee}`
        );
        // Aquí podrías integrar un sistema real de notificaciones (email, SMS, etc.)
      });
    });

    res.status(200).json({
      message: "Notificaciones enviadas para evaluaciones pendientes",
      count: pendingEvaluations.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar notificaciones", error });
  }
};

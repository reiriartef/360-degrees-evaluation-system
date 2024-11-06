const express = require("express");
const {
  createQuestion,
  getQuestions,
  updateQuestion,
} = require("../controllers/questionController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Preguntas
 *   description: Endpoints para gestionar preguntas de evaluación
 */

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Crea una nueva pregunta
 *     tags: [Preguntas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 *   get:
 *     summary: Obtiene todas las preguntas
 *     tags: [Preguntas]
 *     responses:
 *       200:
 *         description: Lista de preguntas
 */

/**
 * @swagger
 * /api/questions/{id}:
 *   put:
 *     summary: Actualiza una pregunta específica
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la pregunta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pregunta actualizada
 *       404:
 *         description: Pregunta no encontrada
 */

router
  .route("/")
  .post(protect, authorize("admin"), createQuestion) // Sólo admin puede crear preguntas
  .get(protect, authorize("admin", "manager"), getQuestions); // Admin y manager pueden ver todas las preguntas

router.route("/:id").put(protect, authorize("admin"), updateQuestion); // Sólo admin puede actualizar preguntas

module.exports = router;

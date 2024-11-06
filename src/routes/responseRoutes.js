const express = require("express");
const {
  createResponse,
  getResponsesByEvaluation,
  updateResponse,
} = require("../controllers/responseController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Respuestas
 *   description: Endpoints para gestionar respuestas a preguntas de evaluación
 */

/**
 * @swagger
 * /api/responses:
 *   post:
 *     summary: Crea una nueva respuesta a una pregunta
 *     tags: [Respuestas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: ID de la pregunta
 *               evaluation:
 *                 type: string
 *                 description: ID de la evaluación
 *               answer:
 *                 type: string
 *               score:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Respuesta creada exitosamente
 */

/**
 * @swagger
 * /api/responses/evaluation/{evaluationId}:
 *   get:
 *     summary: Obtiene todas las respuestas de una evaluación específica
 *     tags: [Respuestas]
 *     parameters:
 *       - in: path
 *         name: evaluationId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Lista de respuestas
 */

/**
 * @swagger
 * /api/responses/{id}:
 *   put:
 *     summary: Actualiza una respuesta específica
 *     tags: [Respuestas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la respuesta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answer:
 *                 type: string
 *               score:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Respuesta actualizada
 *       404:
 *         description: Respuesta no encontrada
 */

// Ruta para obtener todas las respuestas de una evaluación específica
router
  .route("/evaluation/:evaluationId")
  .get(protect, authorize("admin", "manager"), getResponsesByEvaluation); // Admin y manager pueden ver respuestas de una evaluación

// Ruta para crear una nueva respuesta
router.route("/").post(protect, authorize("employee"), createResponse); // Empleados pueden crear respuestas

// Ruta para actualizar una respuesta específica por ID
router
  .route("/:id")
  .put(protect, authorize("employee", "manager"), updateResponse); // Empleado y manager pueden actualizar respuestas

module.exports = router;

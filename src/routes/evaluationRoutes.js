const express = require("express");
const {
  createEvaluation,
  getEvaluations,
  getEvaluationById,
  updateEvaluation,
  submitEvaluation,
  calculateEvaluationScore,
  assignEvaluators,
  sendPendingNotifications,
} = require("../controllers/evaluationController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Evaluaciones
 *   description: Endpoints para gestionar evaluaciones
 */

/**
 * @swagger
 * /api/evaluations:
 *   post:
 *     summary: Crea una nueva evaluación
 *     tags: [Evaluaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               period:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *               type:
 *                 type: string
 *                 enum: [self, peer, manager]
 *               employee:
 *                 type: string
 *                 description: ID del empleado
 *     responses:
 *       201:
 *         description: Evaluación creada exitosamente
 *   get:
 *     summary: Obtiene todas las evaluaciones
 *     tags: [Evaluaciones]
 *     responses:
 *       200:
 *         description: Lista de evaluaciones
 */

/**
 * @swagger
 * /api/evaluations/{id}:
 *   get:
 *     summary: Obtiene detalles de una evaluación específica
 *     tags: [Evaluaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Detalles de la evaluación
 *       404:
 *         description: Evaluación no encontrada
 *   put:
 *     summary: Actualiza una evaluación específica
 *     tags: [Evaluaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la evaluación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               period:
 *                 type: string
 *               status:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evaluación actualizada
 *       404:
 *         description: Evaluación no encontrada
 */

/**
 * @swagger
 * /api/evaluations/{id}/submit:
 *   post:
 *     summary: Marca una evaluación como completada
 *     tags: [Evaluaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Evaluación completada
 *       404:
 *         description: Evaluación no encontrada
 */

/**
 * @swagger
 * /api/evaluations/{id}/calculate-score:
 *   get:
 *     summary: Calcula el puntaje promedio de una evaluación específica
 *     tags: [Evaluaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Puntaje calculado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 evaluationId:
 *                   type: string
 *                 averageScore:
 *                   type: number
 *                   format: float
 *       404:
 *         description: No se encontraron respuestas para esta evaluación
 *       500:
 *         description: Error al calcular el puntaje
 */

/**
 * @swagger
 * /api/evaluations/{id}/assign-evaluators:
 *   put:
 *     summary: Asigna evaluadores a una evaluación específica
 *     tags: [Evaluaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la evaluación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               evaluators:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de IDs de los evaluadores a asignar
 *     responses:
 *       200:
 *         description: Evaluadores asignados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 evaluation:
 *                   type: object
 *                   description: Detalles de la evaluación con evaluadores asignados
 *       400:
 *         description: Uno o más evaluadores no son válidos
 *       404:
 *         description: Evaluación no encontrada
 *       500:
 *         description: Error al asignar evaluadores
 */
/**
 * @swagger
 * /api/evaluations/notifications/pending:
 *   get:
 *     summary: Envía notificaciones para todas las evaluaciones pendientes
 *     tags: [Evaluaciones]
 *     responses:
 *       200:
 *         description: Notificaciones enviadas para evaluaciones pendientes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 count:
 *                   type: integer
 *                   description: Número de evaluaciones pendientes notificadas
 *       500:
 *         description: Error al enviar notificaciones
 */

router
  .route("/")
  .post(protect, authorize("admin", "manager"), createEvaluation) // Sólo admin y manager pueden crear evaluaciones
  .get(protect, authorize("admin", "manager"), getEvaluations); // Sólo admin y manager pueden listar evaluaciones

router
  .route("/:id")
  .get(protect, authorize("admin", "manager"), getEvaluationById) // Sólo admin y manager pueden ver una evaluación específica
  .put(protect, authorize("admin", "manager"), updateEvaluation); // Sólo admin y manager pueden actualizar evaluaciones

router
  .route("/:id/submit")
  .post(protect, authorize("admin", "manager"), submitEvaluation); // Sólo admin y manager pueden enviar evaluaciones

router.get(
  "/:id/calculate-score",
  protect,
  authorize("admin", "manager"),
  calculateEvaluationScore
);

router.put(
  "/:id/assign-evaluators",
  protect,
  authorize("admin", "manager"),
  assignEvaluators
);

router.get(
  "/notifications/pending",
  protect,
  authorize("admin", "manager"),
  sendPendingNotifications
);

module.exports = router;

const express = require("express");
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
} = require("../controllers/employeeController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: Endpoints para gestionar empleados
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Obtiene todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados
 *   post:
 *     summary: Crea un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 */
router
  .route("/")
  .get(protect, authorize("admin", "manager"), getEmployees)
  .post(protect, authorize("admin"), createEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Obtiene detalles de un empleado específico
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Detalles del empleado
 *       404:
 *         description: Empleado no encontrado
 *   put:
 *     summary: Actualiza un empleado específico
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               position:
 *                 type: string
               department:
                 type: string
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *       404:
 *         description: Empleado no encontrado
 */
router
  .route("/:id")
  .get(protect, authorize("admin", "manager"), getEmployeeById)
  .put(protect, authorize("admin", "manager"), updateEmployee);

module.exports = router;

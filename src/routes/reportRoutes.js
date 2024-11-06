const express = require("express");
const {
  getEmployeeReport,
  getDepartmentReport,
} = require("../controllers/reportController");
const { protect, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reportes
 *   description: Endpoints para generar reportes de evaluaciones
 */

/**
 * @swagger
 * /api/reports/employee/{id}:
 *   get:
 *     summary: Genera un reporte de evaluación para un empleado específico
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Reporte del empleado generado
 *       404:
 *         description: Empleado no encontrado
 */

/**
 * @swagger
 * /api/reports/department/{id}:
 *   get:
 *     summary: Genera un reporte de evaluaciones para un departamento
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del departamento
 *     responses:
 *       200:
 *         description: Reporte del departamento generado
 *       404:
 *         description: No se encontraron empleados en el departamento
 */

// Rutas de reportes protegidas
router.get(
  "/employee/:id",
  protect,
  authorize("admin", "manager"),
  getEmployeeReport
); // Sólo admin y manager pueden ver reportes de empleados
router.get(
  "/department/:id",
  protect,
  authorize("admin", "manager"),
  getDepartmentReport
); // Sólo admin y manager pueden ver reportes por departamento

module.exports = router;

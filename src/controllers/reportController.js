const Employee = require("../models/Employee");
const Evaluation = require("../models/Evaluation");
const Response = require("../models/Response");

// Controlador para obtener un reporte de evaluación de un empleado específico
exports.getEmployeeReport = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Verifica que el empleado exista
    const employee = await Employee.findById(employeeId).populate(
      "evaluations"
    );
    if (!employee) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // Obtiene todas las evaluaciones y sus respuestas relacionadas con el empleado
    const evaluations = await Evaluation.find({
      employee: employeeId,
    }).populate({
      path: "responses",
      populate: { path: "question", select: "text" },
    });

    res.status(200).json({
      message: "Reporte de evaluaciones del empleado",
      employee: {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        position: employee.position,
        department: employee.department,
      },
      evaluations,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al generar el reporte del empleado", error });
  }
};

// Controlador para obtener un reporte de evaluaciones por departamento
exports.getDepartmentReport = async (req, res) => {
  try {
    const department = req.params.id;

    // Busca empleados en el departamento especificado
    const employees = await Employee.find({ department });
    if (employees.length === 0) {
      return res
        .status(404)
        .json({
          message:
            "No se encontraron empleados en el departamento especificado",
        });
    }

    // Para cada empleado en el departamento, obtiene sus evaluaciones y respuestas
    const departmentEvaluations = [];
    for (const employee of employees) {
      const evaluations = await Evaluation.find({
        employee: employee._id,
      }).populate({
        path: "responses",
        populate: { path: "question", select: "text" },
      });

      departmentEvaluations.push({
        employee: {
          id: employee._id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          position: employee.position,
        },
        evaluations,
      });
    }

    res.status(200).json({
      message: "Reporte de evaluaciones por departamento",
      department,
      evaluations: departmentEvaluations,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al generar el reporte del departamento", error });
  }
};

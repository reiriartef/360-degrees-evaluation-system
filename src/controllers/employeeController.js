const Employee = require("../models/Employee");

// Controlador para obtener todos los empleados
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener empleados", error });
  }
};

// Controlador para obtener un empleado por ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el empleado", error });
  }
};

// Controlador para crear un nuevo empleado
exports.createEmployee = async (req, res) => {
  const { firstName, lastName, position, department } = req.body;
  try {
    const employee = await Employee.create({
      firstName,
      lastName,
      position,
      department,
    });
    res.status(201).json({ message: "Empleado creado exitosamente", employee });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el empleado", error });
  }
};

// Controlador para actualizar un empleado por ID
exports.updateEmployee = async (req, res) => {
  const { firstName, lastName, position, department } = req.body;
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, position, department },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.status(200).json({ message: "Empleado actualizado", employee });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el empleado", error });
  }
};

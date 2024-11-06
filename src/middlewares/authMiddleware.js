const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware de autenticación
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extrae el token del encabezado
      token = req.headers.authorization.split(" ")[1];

      // Decodifica el token y obtiene el ID del usuario
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password"); // Excluye la contraseña

      next();
    } catch (error) {
      res.status(401).json({ message: "No autorizado, token inválido" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No autorizado, se requiere token" });
  }
};

// Middleware de autorización basado en roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para acceder a esta ruta" });
    }
    next();
  };
};

module.exports = { protect, authorize };

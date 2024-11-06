const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Registrar nuevo usuario
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crea el nuevo usuario
    const user = new User({ username, email, password, role });
    await user.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario", error });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Verifica si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Verifica la contraseña
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Genera el token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

import user from '../models/user.model.js'; // minúscula

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await user.findOne({ where: { email, password } }); // minúscula también aquí
    if (!foundUser) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    return res.json({
      idUser: foundUser.idUser,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.fk_idRol,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

// REGISTRO
export const register = async (req, res) => {
  const {
    rut, name, lastname, email, password,
    address, phone, fk_idRol, fk_idCommune
  } = req.body;

  try {
    const existingUser = await user.findOne({ where: { email } }); // minúscula
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const newUser = await user.create({
      rut, name, lastname, email, password,
      address, phone, fk_idRol, fk_idCommune
    });

    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: {
        idUser: newUser.idUser,
        name: newUser.name,
        email: newUser.email,
        role: newUser.fk_idRol,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

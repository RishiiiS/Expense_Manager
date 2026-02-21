const authService = require("../services/auth.service");

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const user = await authService.register({ name, email, password });

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async login(req, res) {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.login({
      email,
      password,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
}

module.exports = new AuthController();
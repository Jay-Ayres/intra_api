import jwt from "jsonwebtoken";

import User from "../models/User";
import authConfig from "../../config/auth";

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password invalid" });
    }
    const { id, username } = user;

    return res.json({
      user: {
        id,
        username,
        email
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();

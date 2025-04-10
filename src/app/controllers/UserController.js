import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async store(req, res) {
    /*
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }
*/
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create(req.body);

    console.log(user);

    return res.status(200).json(user);
  }

  async update(req, res) {
    /*
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        // a funcao recebe dois parametros. O nome do fild que queros e uma funcao.
        // a funcao recebe o nome do field e o segundo parametro se refere ao campo inicial, no caso aqui passwordS
        // nesse caso como so tem uma linha na funcao, nao se faze necessario usar o return
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required.oneOf([Yup.ref("password")]) : field
      )
    });
    */

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email != user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    await user.update(req.body);

    return res.json(user);
  }

  async index(req, res) {
    const users = await User.findAll();

    return res.status(200).json(users);
  }
}

export default new UserController();

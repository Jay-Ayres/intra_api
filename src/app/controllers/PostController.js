import * as Yup from "yup";
import Post from "../models/Post";

class PostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const { name, description, url_image } = req.body;

    const post = await Post.create({
      user_id: req.userId,
      name,
      description,
      url_image
    });
    return res.json(post);
  }

  async update(req, res) {
    const { name, description } = req.body;
    const post = await Post.findOne({ id: req.params.id, user_id: req.userId });
    await post.update({ name, description });

    return res.json(post);
  }
  //Todo mudar para que seja atalizado a data de delecao e nao deletar o arquivo fisicamente
  async delete(req, res) {
    const post = await Post.findByPk(req.params.id);
    await post.destroy();
    return res.status(200).json();
  }

  async index(req, res) {
    const posts = await Post.findAll();
    return res.status(200).json(posts);
  }
}

export default new PostController();

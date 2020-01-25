import * as Yup from "yup";
import Event from "../models/Event";

class EventController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

    const {
      name,
      description,
      url_image,
      limit_date,
      event_date,
      event_end_date
    } = req.body;

    const event = await Event.create({
      user_id: req.userId,
      name,
      description,
      url_image,
      limit_date,
      event_date,
      event_end_date
    });
    return res.json(event);
  }

  async update(req, res) {
    const {
      name,
      description,
      url_image,
      limit_date,
      event_date,
      event_end_date
    } = req.body;
    const event = await Event.findOne({
      id: req.params.id,
      user_id: req.userId
    });
    await event.update({
      name,
      description,
      url_image,
      limit_date,
      event_date,
      event_end_date
    });

    return res.json(event);
  }
  //Todo mudar para que seja atalizado a data de delecao e nao deletar o arquivo fisicamente
  async delete(req, res) {
    const event = await Event.findByPk(req.params.id);
    await event.destroy();
    return res.status(200).json();
  }

  async index(req, res) {
    const events = await Event.findAll();
    return res.status(200).json(events);
  }
}

export default new EventController();

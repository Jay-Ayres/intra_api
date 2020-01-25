import * as Yup from "yup";
import EventsUsers from "../models/EventsUsers";
import Event from "../models/Event";

class EventsUsersController {
  async store(req, res) {
    /*
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }
    */

    const { user_id, event_id } = req.body;

    const eventsUsers = await EventsUsers.create({
      user_id,
      event_id
    });
    return res.json(eventsUsers);
  }

  async update(req, res) {
    /*
    const { name, description } = req.body;
    const post = await Post.findOne({ id: req.params.id, user_id: req.userId });
    await post.update({ name, description });

    return res.json(post);
    */
  }
  //Todo mudar para que seja atalizado a data de delecao e nao deletar o arquivo fisicamente
  async delete(req, res) {
    const eventsUsers = await EventsUsers.findByPk(req.params.id);
    await eventsUsers.destroy();
    return res.status(200).json();
  }

  async index(req, res) {
    const eventUsers = await EventsUsers.findAll();
    return res.status(200).json(eventUsers);
  }

  async eventsByUser(req, res) {
    const eventUsers = await EventsUsers.findAll({
      where: { user_id: req.params.id },
      raw: true
    });
    const events = await Event.findAll({ raw: true });

    if (eventUsers) {
      events.forEach(event => {
        const eventUser = eventUsers.find(element => {
          return element.event_id == event.id;
        });
        event.isConfirmed = eventUser ? true : false;
      });
    }

    return res.status(200).json(events);
  }
}

export default new EventsUsersController();

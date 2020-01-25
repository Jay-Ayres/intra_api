import { Router } from "express";
import AuthMiddleware from "./app/middlewares/auth";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import PostController from "./app/controllers/PostController";
import EventController from "./app/controllers/EventController";
import EventsUsersController from "./app/controllers/EventsUsersController";

const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(AuthMiddleware);

routes.get("/users", UserController.index);
routes.put("/users", UserController.update);

routes.post("/posts", PostController.store);
routes.get("/posts", PostController.index);
routes.put("/posts/:id", PostController.update);
routes.delete("/posts/:id", PostController.delete);

routes.post("/events", EventController.store);
routes.get("/events", EventController.index);
routes.put("/events/:id", EventController.update);
routes.delete("/events/:id", EventController.delete);

// routes.get("/eventsusers", EventsUsersController.index);

routes.post("/event/user", EventsUsersController.store);
routes.get("/event/user/:id", EventsUsersController.eventsByUser);
///events/user/12

export default routes;

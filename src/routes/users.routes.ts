import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserController } from "../modules/accounts/useCases/updateUser/UpdateUserController";
import { ListTicketsController } from "../modules/event/useCases/listTickets/ListTicketsController";
import { ensureAuthenticated } from "../shared/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listTicketsController = new ListTicketsController();
const updateUserController = new UpdateUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/tickets", ensureAuthenticated, listTicketsController.handle);
usersRoutes.patch("/", ensureAuthenticated, updateUserController.handle);

export { usersRoutes };
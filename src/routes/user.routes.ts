import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import loginUserController from "../controllers/users/loginUser.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import userSchema from "../schemas/users.schemas";

const userRoutes = Router();

userRoutes.post("", validationMiddleware(userSchema), createUserController);
userRoutes.post("/login", loginUserController);

export default userRoutes;

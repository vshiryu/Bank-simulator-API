import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import loginUserController from "../controllers/users/loginUser.controller";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.post("/login", loginUserController);

export default userRoutes;

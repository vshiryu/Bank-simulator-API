import { Router } from "express";
import getBalanceController from "../controllers/accounts/getBalance.controller";
import authenticationMiddleware from "../middlewares/authentication.middleware";

const accountRoutes = Router();

accountRoutes.get("", authenticationMiddleware, getBalanceController);

export default accountRoutes;

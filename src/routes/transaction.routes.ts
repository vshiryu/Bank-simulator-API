import { Router } from "express";
import createTransactionController from "../controllers/transactions/createTransaction.controller";
import listTransactionsController from "../controllers/transactions/listTransactions.controller";
import authenticationMiddleware from "../middlewares/authentication.middleware";

const transactionRoutes = Router();

transactionRoutes.post(
  "",
  authenticationMiddleware,
  createTransactionController
);

transactionRoutes.get("", authenticationMiddleware, listTransactionsController);

export default transactionRoutes;

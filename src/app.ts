import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { handleErrorMiddleware } from "./middlewares/handleError.middleware";
import userRoutes from "./routes/user.routes";
import accountRoutes from "./routes/account.routes";
import transactionRoutes from "./routes/transaction.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/accounts", accountRoutes);
app.use("/transactions", transactionRoutes);

app.use(handleErrorMiddleware);

export default app;

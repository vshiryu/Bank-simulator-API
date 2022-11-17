import { Request, Response } from "express";
import listTransactionsService from "../../services/transactions/listTransactions.service";
import { instanceToPlain } from "class-transformer";

const listTransactionsController = async (req: Request, res: Response) => {
  const { accountId } = req.user;

  const transactions = await listTransactionsService(accountId, req.query);

  return res.status(200).json(instanceToPlain(transactions));
};

export default listTransactionsController;

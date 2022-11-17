import { Request, Response } from "express";
import createTransactionService from "../../services/transactions/createTransaction.service";
import { instanceToPlain } from "class-transformer";

const createTransactionController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { value, creditedUsername } = req.body;

  const transaction = await createTransactionService({
    id,
    creditedUsername,
    value,
  });

  return res.status(201).json(instanceToPlain(transaction));
};

export default createTransactionController;

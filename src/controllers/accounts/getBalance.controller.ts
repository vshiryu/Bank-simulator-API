import { Request, Response } from "express";
import getBalanceService from "../../services/accounts/getBalance.service";

const getBalanceController = async (req: Request, res: Response) => {
  const id = req.user.id;

  const account = await getBalanceService(id);

  return res.status(200).json(account);
};

export default getBalanceController;

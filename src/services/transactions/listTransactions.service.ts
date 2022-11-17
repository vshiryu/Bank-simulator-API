import AppDataSource from "../../data-source";
import { Account } from "../../entities/account.entity";
import { Transaction } from "../../entities/transaction.entity";
import { AppError } from "../../errors/appError";

const listTransactionsService = async (accountId: string) => {
  const transactionReposity = AppDataSource.getRepository(Transaction);

  const accTrans = await transactionReposity.find({
    where: [
      { creditedAccount: { id: accountId } },
      { debitedAccount: { id: accountId } },
    ],
  });

  return accTrans;
};

export default listTransactionsService;

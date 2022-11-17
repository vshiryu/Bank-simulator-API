import AppDataSource from "../../data-source";
import { Transaction } from "../../entities/transaction.entity";

const listTransactionsService = async (accountId: string) => {
  const transactionReposity = AppDataSource.getRepository(Transaction);

  const accountTransactions = await transactionReposity.find({
    where: [
      { creditedAccount: { id: accountId } },
      { debitedAccount: { id: accountId } },
    ],
  });

  return accountTransactions;
};

export default listTransactionsService;

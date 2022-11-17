import AppDataSource from "../../data-source";
import { Account } from "../../entities/account.entity";
import { Transaction } from "../../entities/transaction.entity";
import { AppError } from "../../errors/appError";

const listTransactionsService = async (accountId: string, query: any) => {
  const transactionReposity = AppDataSource.getRepository(Transaction);
  const accountRepository = AppDataSource.getRepository(Account);

  const account = await accountRepository.findOneBy({ id: accountId });

  if (!account) {
    throw new AppError(404, "Account not found");
  }

  const debits = account.debitTransactions;
  debits.map((elem) => {
    elem.value *= -1;
    return elem;
  });

  const credits = account.creditTransactions;

  let transactions = [...credits, ...debits];

  if (query.cashin) {
    transactions = credits;
  }

  if (query.cashout) {
    transactions = debits;
  }

  if (query.sort) {
    transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  return transactions;
};

export default listTransactionsService;

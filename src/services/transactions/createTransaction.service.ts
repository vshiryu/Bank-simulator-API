import { ObjectID } from "typeorm";
import AppDataSource from "../../data-source";
import { Account } from "../../entities/account.entity";
import { Transaction } from "../../entities/transaction.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { ITransactionRequest } from "../../interfaces/transaction.interfaces";

const createTransactionService = async ({
  id,
  creditedUsername,
  value,
}: ITransactionRequest) => {
  const transactionRepository = AppDataSource.getRepository(Transaction);
  const userRepository = AppDataSource.getRepository(User);
  const accountRepository = AppDataSource.getRepository(Account);

  const debitedUser = await userRepository.findOneBy({ id });

  if (!debitedUser) {
    throw new AppError(404, "Debited account not found");
  }

  if (!creditedUsername) {
    throw new AppError(400, "Credited username required");
  }

  const creditedUser = await userRepository.findOneBy({
    username: creditedUsername,
  });

  if (!creditedUser) {
    throw new AppError(404, "Credited account not found");
  }

  if (debitedUser.id === creditedUser.id) {
    throw new AppError(400, "Unable to transfer to yourself");
  }

  if (value <= 0) {
    throw new AppError(400, "Value must be greater than 0");
  }

  const debitedBalance = debitedUser.account.balance - value;
  const creditedBalance = creditedUser.account.balance + value;

  if (debitedBalance < 0) {
    throw new AppError(400, "Insufficient funds");
  }

  const updateDebited = await accountRepository.update(debitedUser.account.id, {
    balance: debitedBalance,
  });

  const updateCredited = await accountRepository.update(
    creditedUser.account.id,
    {
      balance: creditedBalance,
    }
  );

  const transaction = transactionRepository.create({
    value,
    debitedAccount: debitedUser.account,
    creditedAccount: creditedUser.account,
  });

  await transactionRepository.save(transaction);

  return transaction;
};

export default createTransactionService;

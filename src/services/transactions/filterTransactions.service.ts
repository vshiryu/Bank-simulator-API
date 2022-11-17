import AppDataSource from "../../data-source";
import { Transaction } from "../../entities/transaction.entity";

const filterTransactionsService = async (id: string) => {
  const transactionReposity = AppDataSource.getRepository(Transaction);
};

export default filterTransactionsService;

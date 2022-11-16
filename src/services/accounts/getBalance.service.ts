import AppDataSource from "../../data-source";
import { Account } from "../../entities/account.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const getBalanceService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError(404, "Account not found");
  }

  return user.account;
};

export default getBalanceService;

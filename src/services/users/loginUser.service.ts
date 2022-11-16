import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserLogin } from "../../interfaces/user.interfaces";
import "dotenv/config";

const loginUserService = async ({ username, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ username });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const correctPass = await compare(password, user.password);

  if (!correctPass) {
    throw new AppError(403, "Incorrect password");
  }

  const token = jwt.sign({}, process.env.SECRET_KEY as string, {
    subject: user.id,
    expiresIn: "24h",
  });

  return token;
};

export default loginUserService;

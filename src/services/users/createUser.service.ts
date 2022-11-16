import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/user.interfaces";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/appError";

const createUserService = async ({
  username,
  password,
  name,
  email,
  age,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError(400, "Email already exists");
  }

  const usernameAlreadyExists = users.find(
    (user) => user.username === username
  );

  if (usernameAlreadyExists) {
    throw new AppError(400, "Username already exists");
  }

  const hashedPass = await hash(password, 10);

  const user = userRepository.create({
    username,
    password: hashedPass,
    name,
    email,
    age,
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;

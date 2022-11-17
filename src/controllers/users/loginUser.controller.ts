import { Request, Response } from "express";
import loginUserService from "../../services/users/loginUser.service";

const loginUserController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { token, userId, accountId } = await loginUserService({
    username,
    password,
  });

  return res.status(200).json({ token, userId, accountId });
};

export default loginUserController;

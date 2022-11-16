import { Request, Response } from "express";
import loginUserService from "../../services/users/loginUser.service";

const loginUserController = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { token, userId } = await loginUserService({ username, password });

  return res.status(200).json({ token, userId });
};

export default loginUserController;

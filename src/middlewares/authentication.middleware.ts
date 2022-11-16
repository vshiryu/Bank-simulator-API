import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";
import "dotenv/config";

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError(401, "Missing authorization");
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(401, "Unauthorized");
      }

      req.user = {
        id: decoded.sub,
      };
    }
  );
  next();
};

export default authenticationMiddleware;

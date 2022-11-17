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

  if (token.split(" ")[0] !== "Bearer") {
    throw new AppError(401, "Invalid token");
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
        accountId: decoded.accountId,
      };
    }
  );
  next();
};

export default authenticationMiddleware;

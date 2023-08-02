import { NextFunction, Response } from "express";
import { CustomRequest } from "../../common-services/types/request";
import jwt from "jsonwebtoken";
import { HttpExceptionError } from "../../common-services/utils/errors";

export function authenticateToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) throw new HttpExceptionError(401, "Unauthorized");
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) throw new HttpExceptionError(401, "Unauthorized");
      req.user = user;
      next();
    });
  } catch (error: any) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error has occured" });
    }
  }
}

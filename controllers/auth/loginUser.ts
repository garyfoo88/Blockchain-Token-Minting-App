import { Request, Response } from "express";
import { makeUserService } from "../../common-services/services/user/makeUserService";
import { HttpExceptionError } from "../../common-services/utils/errors";

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new HttpExceptionError(400, "Missing required fields");
  }

  try {
    const userService = makeUserService();

    const token = await userService.loginUser(username, password);

    res.status(200).json({ token });
  } catch (error: any) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error logging in" });
    }
  }
};

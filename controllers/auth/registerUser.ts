import { Request, Response } from "express";
import { makeUserService } from "../../common-services/services/user/makeUserService";
import { HttpExceptionError } from "../../common-services/utils/errors";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, ethAddress } = req.body;

  // In actual dev we should set validations/requirements for the below fields (e.g. password/username length)
  if (!username || !password || !ethAddress) {
    throw new HttpExceptionError(400, "Missing required fields");
  }

  try {
    const userService = makeUserService();

    await userService.registerUser(username, password, ethAddress);

    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error registering user", error });
    }
  }
};

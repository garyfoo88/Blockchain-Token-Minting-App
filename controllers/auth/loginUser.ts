import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../common-services/models/User";
import { validatePassword } from "../../common-services/helpers/auth";

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = validatePassword(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);

  res.status(200).json({ token });
};

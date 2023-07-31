import { Request, Response } from "express";
import User from "../../common-services/models/User";
import { hashPassword } from "../../common-services/helpers/auth";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, ethAddress } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = hashPassword(password);

    const user = new User({ username, password: hashedPassword, ethAddress });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

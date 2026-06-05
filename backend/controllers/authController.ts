import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/UserModel";
import generateToken from "../utils/generatetoken";

export const login = async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);

    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    console.log("USER:", user);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (!user.password) {
      return res.status(500).json({
        message: "User password is missing in database",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Password incorrect",
      });
    }

    return res.status(200).json({
      token: generateToken(user._id.toString()),
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
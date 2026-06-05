import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "./models/UserModel";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI!
    );

    await User.deleteMany({
      email: {
        $in: [
          "alice@example.com",
          "bob@example.com",
        ],
      },
    });

    await User.create({
      email: "alice@example.com",
      password: await bcrypt.hash(
        "password123",
        10
      ),
    });

    await User.create({
      email: "bob@example.com",
      password: await bcrypt.hash(
        "password123",
        10
      ),
    });

    console.log(
      "Users seeded successfully"
    );

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seed();
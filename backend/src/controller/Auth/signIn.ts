import { Request, Response } from "express";
import { User } from "../../models/User";
import { z } from "zod";
import bcrypt from "bcrypt";

export const signIn = async (req: Request, res: Response) => {

  // User Data Schema using Zod:
  const UserSchemaZod = z.object({
    name: z.string().min(1, "Name is required"), // 1 refer that at least 1 Character is present.
    username: z.string().min(1, "Username is required"),
    password: z
      .string()
      .min(8, "Password must be min of 8 length")
      .regex(/[a-z]/, "password must contain at least one small character")
      .regex(/[A-Z]/, "password must contain at least one capital character")
      .regex(/[0-9]/, "password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "password must contain at least one special character"
      ), // Excluding this all only special character needed to be validated.
    email: z.string().email("Invalid email format").min(1, "Email must be needed."),
  });

  try {
    let hashedPassword: string = "";
    let username_: string = req.body.username;
    let name_: string = req.body.name;
    let password_: string = req.body.password;
    let confirmPassword_: string = req.body.confirmPassword;
    let email_: string = req.body.email;

    const UserData = UserSchemaZod.safeParse({
      name: name_,
      username: username_,
      password: password_,
      email: email_,
    });

    if (!UserData.success) {
      return res.status(400).json({
        message: "Invalid Data.",
        error: UserData.error.errors,
      });
    }

    if (password_ !== confirmPassword_) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    // Check if there are any users in the database
    const existingUser = await User.findOne({
      $or: [{ username: username_ }, { email: email_ }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already in use.",
      });
    }

    // Check if it's the first user in the system
    const totalUsers = await User.countDocuments(); // Get total number of users in the DB
    let accountType = "Customer"; // Default account type

    if (totalUsers === 0) {
      accountType = "Admin"; // First user gets Admin role
    }

    hashedPassword = await bcrypt.hash(password_, 10);

    const dbUser = await User.create({
      username: username_,
      password: hashedPassword,
      name: name_,
      email: email_,
      accountType: accountType, // Set account type dynamically
    });

    if (dbUser) {
      return res.status(200).json({
        message: "User created successfully.",
        user: dbUser,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server error." + e,
    });
  }
};

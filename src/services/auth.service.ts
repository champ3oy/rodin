import { User, IUser } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";

export const authService = {
  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<IUser> {
    const existingUser = await User.findOne({
      email: String(userData.email).toLowerCase(),
    });
    if (existingUser) {
      throw new AppError("Email already registered", 400);
    }
    return User.create(userData);
  },

  async login(email: string, password: string): Promise<IUser> {
    const user = await User.findOne({
      email: String(email).toLowerCase(),
    }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError("Invalid credentials", 401);
    }
    return user;
  },
};

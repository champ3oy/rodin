import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { authService } from "../services/auth.service.js";

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    const token = user.getSignedToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    const token = user.getSignedToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }),
};

import type UserMongooseRepository from "../repository/UsersMongooseRepository.js";
import { type Response } from "express";
import { type UserCredentialStructure } from "../types.js";
import { type NextFunction } from "connect";
import jwt, { type JwtPayload } from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError.js";

class UserController {
  constructor(private readonly userRepository: UserMongooseRepository) {}

  loginUser = async (
    req: UserCredentialStructure,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { username, password } = req.body;
      const user = await this.userRepository.getUser(username, password);
      const userData: JwtPayload = { sub: user.salt, name: user.user };
      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY!);

      res.status(200).json({ token });
    } catch (privateError) {
      const error = new CustomError(
        "Error bad credentials",
        401,
        (privateError as Error).message,
      );
      next(error);
    }
  };
}

export default UserController;

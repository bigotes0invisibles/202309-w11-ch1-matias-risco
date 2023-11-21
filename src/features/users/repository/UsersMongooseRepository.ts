import User from "../model/Users.js";
import { type UserStructure } from "../types";

class UserMongooseRepository {
  getUser = async (
    username: string,
    password: string,
  ): Promise<UserStructure> => {
    console.log(`${username} ${password}`);
    const user = await User.findOne({ user: username });
    if (!user) {
      throw new Error("Username not found");
    }

    const userPassword = await User.findOne({ password });

    if (!userPassword) {
      throw new Error("Incorrect password");
    }

    return user;
  };
}

export default UserMongooseRepository;

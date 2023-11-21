import { Schema, model } from "mongoose";
import { type UserStructure } from "../types";

const userSchema = new Schema<UserStructure>({
  _id: { type: String, required: true },
  user: { type: String, required: true, unique: true, minlength: 4 },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

const User = model("User", userSchema, "User");

export default User;

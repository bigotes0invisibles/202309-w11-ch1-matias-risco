import chalk from "chalk";
import mongoose from "mongoose";
import debugCreator from "debug";

const debug = debugCreator("app:database");

const mongodbUrl = process.env.MONGODB_URL;

export const connectToDataBase = async (mongodbUrl: string) => {
  try {
    await mongoose.connect(mongodbUrl);
    debug(chalk.green("Connected to database"));
  } catch {
    debug(chalk.red("Couldn't connect to database"));
    process.exit(1);
  }
};

export default connectToDataBase;

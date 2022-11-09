// noinspection JSVoidFunctionReturnValueUsed

import mongoose, { CallbackWithoutResult } from 'mongoose';

const connectDB = (uri: string, callback: CallbackWithoutResult) => {
  /*
   Connect to MongoDB

   * There is an opportunity to use "try catch":
   * try { const connection = await mongoose.connect(process.env.MONGO_URI) } catch (error) { process.exit(1) }
   * Then you should create an asynchronous function.
   */
  mongoose
    .connect((process.env.MONGO_URI as string), ({ useNewUrlParser: true } as object))
    .then((connection) => console.log(`MongoDB Connected: ${connection.connection.host}`.cyan.underline))
    .catch((error) => console.log(`Error: ${error.message}`.red));
}

module.exports = connectDB;
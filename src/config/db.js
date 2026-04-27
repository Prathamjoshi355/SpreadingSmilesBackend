import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const dbName = process.env.MONGODB_DB || process.env.MongoDB_DB;
    const conn = await mongoose.connect(process.env.MONGODB_URI, dbName ? { dbName } : {});
    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

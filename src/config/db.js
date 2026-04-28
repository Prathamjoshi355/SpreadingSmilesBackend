import mongoose from 'mongoose';

let cachedConnection = null;

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not configured');
    }

    if (cachedConnection && mongoose.connection.readyState === 1) {
      return cachedConnection;
    }

    const dbName = process.env.MONGODB_DB || process.env.MongoDB_DB;
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      ...(dbName ? { dbName } : {}),
      serverSelectionTimeoutMS: 10000
    });
    cachedConnection = conn;
    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection failed:', {
      message: error.message,
      hasMongoUri: Boolean(process.env.MONGODB_URI),
      dbName: process.env.MONGODB_DB || process.env.MongoDB_DB || null
    });
    throw error;
  }
};

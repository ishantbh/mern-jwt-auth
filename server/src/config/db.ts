import mongoose from 'mongoose'
import { logger } from '../utils/logger.js'

export async function connectDB() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables')
  }

  try {
    await mongoose.connect(uri)
    logger.info('MongoDB connected')
  } catch (err) {
    logger.error({ err }, 'MongoDB connection failed')
    process.exit(1)
  }
}

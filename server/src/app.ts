import express from 'express'
import cors from 'cors'
import { pinoHttp } from 'pino-http'
import { logger } from './utils/logger.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
    credentials: true,
  }),
)

app.use(express.json())
app.use(pinoHttp({ logger }))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use(notFoundHandler)
app.use(errorHandler)

export default app

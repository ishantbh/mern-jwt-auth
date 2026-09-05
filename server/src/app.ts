import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import cors from 'cors'
import { pinoHttp } from 'pino-http'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { logger } from './utils/logger.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'
import authRoutes from './routes/authRoutes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(helmet())
app.use(pinoHttp({ logger }))
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)

// serve React's built static files
const clientDistPath = path.join(__dirname, '../../client/dist')
app.use(express.static(clientDistPath))

app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'))
})

app.use('/api', notFoundHandler)
app.use(errorHandler)

export default app

import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app

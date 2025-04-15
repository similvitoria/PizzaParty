import express from 'express'
import pool from './database'

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello from TypeScript backend 👋')
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})

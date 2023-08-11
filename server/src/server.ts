import express, { Application } from 'express'
import cors from 'cors'
// import path from 'path'

import 'colors'
import 'dotenv/config'

import { connectDB } from './config/db'
import { errorHandler } from './middleware/error'

import Users from './routes/users'

const port = process.env.PORT || 5000
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

connectDB()

// Routes
app.use('/api/users', Users)

// Serve Frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')))
//
//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'client', 'build', 'index.html')
//     )
//   )
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'))
// }

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`.cyan))

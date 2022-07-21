// IMPORTS
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import compression from 'compression'
dotenv.config()
import cors from 'cors'
const app = express()
const port = process.env.PORT || 8080
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import getSlovnik from './controllers/fetchSeznam.js'

// MIDDLEWARES

// app.use(helmet());
app.use(compression())
app.use(mongoSanitize())
// app.use(xss());
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'too many request from this ip please try again in an hour',
})
// app.use("/api", limiter);
// app.use(cors());

app.use(express.json())
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/slovnikSeznam', async (req, res) => {
  console.log('dostal jsem request')
  const slovo = req.body.slovo
  console.log('slovo: ', slovo)
  const htmlSeznamSlovnik = await getSlovnik(slovo)
  res.status(200).json({
    message: 'success',
    htmlSeznamSlovnik,
  })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

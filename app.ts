import express from 'express'
import morgan from 'morgan'
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import router from "./routers";

const app = express()

app.use(cors({
  origin: new RegExp(process.env.CORS as string)
}))
app.use(express.json({limit: process.env.INPUT_SIZE_LIMIT as string}))
app.use(express.urlencoded({ extended: false, limit: process.env.INPUT_SIZE_LIMIT as string }))
app.use(morgan('dev'))

app.use('/api', router)

app.use((req, res, next) => {
  next(createError(StatusCodes.NOT_FOUND))
})

export default app

import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import tasksRouter from "./tasks.router";

const router = Router()

router.use('/tasks', tasksRouter)

if (process.env.APP_ENV !== 'prod') {
  router.use('/_swagger', serve, setup(
    swaggerJsdoc({
      definition: {
        openapi: '3.0.0',
        consumes: ['application/json'],
        produces: ['application/json', 'image/png', 'application/octet-stream'],
        info: {
          title: 'Vanilla Express API',
          version: '0.0.1',
          description: 'Simple Node+Express API to handle `tasks`',
        },
      },
      apis: ['./routers/*.router.ts'],
    }),
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'Vanilla Express API Docs'
  ))
}

export default router

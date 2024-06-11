import { Router } from "express";
import tasksService from "../services/tasks.service";
import { StatusCodes } from "http-status-codes";

const tasksRouter = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: 'Unique string to identify tasks'
 *           example: '1'
 *         description:
 *           type: string
 *           description: "Task's details"
 *           example: 'Remember to breath'
 * /api/tasks:
 *   get:
 *     tags: ['tasks']
 *     description: Get all individual tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: [{"uid": "1", "description": "my task"}, '...']
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: On any error
 */
tasksRouter.get('/', (req, res) => {
  tasksService.getTasks()
    .then((tasks) => res.json(tasks))
    .catch(() => res.status(StatusCodes.INTERNAL_SERVER_ERROR).send())
})

/**
 * @swagger
 * /api/tasks/{uid}:
 *   get:
 *     tags: ['tasks']
 *     description: Get an individual task
 *     parameters:
 *       - in: path
 *         name: uid
 *         description: A valid `Task.uid`
 *         example: 1
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The individual task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *               example: {"uid": "1", "description": "my task"}
 *       500:
 *         description: On any error
 */
tasksRouter.get<string, { uid : string }>('/:uid', (req, res) => {
  tasksService.getTask(req.params.uid)
    .then((task) => res.json(task))
    .catch(() => res.status(StatusCodes.INTERNAL_SERVER_ERROR).send())
})

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOrUpdateTaskRequest:
 *       type: object
 *       properties:
 *         description:
 *           required: true
 *           type: string
 *           description: Task to be added
 *           example: "My brand-new or modified task's description"
 * /api/tasks:
 *   post:
 *     tags: ['tasks']
 *     description: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrUpdateTaskRequest'
 *     responses:
 *       201:
 *         description: When new task is created successfully
 *       500:
 *         description: On any error
 */
tasksRouter.post<string, any, any, {
  description : string
}>('/', (req, res) => {
  tasksService.create(req.body.description)
    .then(() => res.status(StatusCodes.CREATED).send())
    .catch(() => res.status(StatusCodes.INTERNAL_SERVER_ERROR).send())
})

/**
 * @swagger
 * /api/tasks/{uid}:
 *   put:
 *     tags: ['tasks']
 *     description: Update the given task's (by its `uid`) `description`
 *     parameters:
 *       - in: path
 *         name: uid
 *         description: A valid `Task.uid`
 *         example: 1
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrUpdateTaskRequest'
 *     responses:
 *       204:
 *         description: When successfully updated task's description
 *       500:
 *         description: On any error
 */
tasksRouter.put<string, { uid : string }, any, {
  description : string
}>('/:uid', (req, res) => {
  tasksService.update(req.params.uid, req.body.description)
    .then(() => res.status(StatusCodes.NO_CONTENT).send())
    .catch(() => res.status(StatusCodes.INTERNAL_SERVER_ERROR).send())
})

/**
 * @swagger
 * /api/tasks/{uid}:
 *   delete:
 *     tags: ['tasks']
 *     description: Deletes the given task's (by its `uid`)
 *     parameters:
 *       - in: path
 *         name: uid
 *         description: A valid `Task.uid`
 *         example: 1
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: When successfully updated task's description
 *       500:
 *         description: On any error
 */
tasksRouter.delete<string, { uid : string }>('/:uid', (req, res) => {
  tasksService.delete(req.params.uid)
    .then(() => res.status(StatusCodes.NO_CONTENT).send())
    .catch(() => res.status(StatusCodes.INTERNAL_SERVER_ERROR).send())
})

export default tasksRouter

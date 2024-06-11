import AbstractService from "./abstract.service";
import Debug from "debug";
import { Task } from "./models/task";
import tasksRepository, { TasksRepository } from "../repositories/tasks.repository";

export class TasksService extends AbstractService {
  debug = Debug('app:services:tasks.service')

  constructor(private readonly repository: TasksRepository) {
    super();
  }

  async getTasks() : Promise<Task[]> {
    return this.repository.getTasks();
  }

  async getTask(uid : string) : Promise<Task> {
    const tasks = (await this.getTasks()).filter((task) => task.uid === uid)

    if (tasks.length === 0) {
      return this.createErrorPromiseAndLog(new Error(`Invalid uid entered '${uid}'`))
    }

    return Promise.resolve(tasks[0]);
  }

  async create(description : string) : Promise<void> {
    return this.repository.create(description)
  }

  async update(uid : string, description : string) : Promise<void> {
    const index = (await this.getTasks()).findIndex((task) => task.uid === uid)
    if (index === -1) {
      return this.createErrorPromiseAndLog(new Error(`Invalid uid entered '${uid}'`))
    }

    return this.repository.update(index, description)
  }

  async delete(uid : string) : Promise<void> {
    const index = (await this.getTasks()).findIndex((task) => task.uid === uid)
    if (index === -1) {
      return this.createErrorPromiseAndLog(new Error(`Invalid uid entered '${uid}'`))
    }

    return this.repository.delete(index)
  }
}

export default new TasksService(tasksRepository)

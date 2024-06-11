import AbstractRepository from "./abstract.repository";
import Debug from "debug";
import { Task } from "../services/models/task";

export class TasksRepository extends AbstractRepository {
  debug = Debug('app:repositories:tasks.repository')

  private tasks : Task[] = [
    Task.create('1', 'task 1'),
    Task.create('2', 'task 2'),
  ]

  async getTasks() : Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }

  async create(description : string) : Promise<void> {
    this.tasks.push(Task.create((this.tasks.length + 1).toString(), description))

    return Promise.resolve()
  }

  async update(index : number, description : string) : Promise<void> {
    this.tasks[index].description = description

    return Promise.resolve()
  }

  async delete(index : number) : Promise<void> {
    this.tasks.splice(index, 1)
  }
}

export default new TasksRepository()

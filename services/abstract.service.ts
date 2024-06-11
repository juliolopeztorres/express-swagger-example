import Debug from "debug";

export default class AbstractService {
  protected debug = Debug('app:services:abstract.service')

  protected createErrorPromiseAndLog(error: Error) {
    this.debug(error.message)

    return Promise.reject(error)
  }
}

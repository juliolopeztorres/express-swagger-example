import { join } from "path";
import { QueryFile } from "pg-promise";
import Debug from "debug";

export default class AbstractRepository {
  protected debug = Debug('app:repositories:abstract.repository')

  protected sql(file: string): QueryFile {
    return new QueryFile(join(__dirname, file), { minify: true })
  }

  protected createErrorPromiseAndLog(errorFormat: string, ...errorInformation: any[]): Promise<never> {
    this.debug(errorFormat, ...errorInformation)

    return Promise.reject()
  }
}

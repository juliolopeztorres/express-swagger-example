export class Task {
  private constructor(
    public uid : string,
    public description : string,
  ) {}

  public static create(
    uid : string,
    description : string,
  ) : Task {
    return new Task(uid, description);
  }
}

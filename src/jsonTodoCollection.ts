import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

type SchemaType = {
  tasks: { id: number; task: string; complete: boolean }[];
};

export class JsonTodoCollection extends TodoCollection {
  private database: Low<SchemaType>;

  constructor(
    public userName: string,
    todoItems: TodoItem[] = [],
  ) {
    super(userName, todoItems);
    const adapter = new JSONFile<SchemaType>("todos.json");
    this.database = new Low<SchemaType>(adapter, { tasks: [] });
  }

  async init(todoItems: TodoItem[] = []) {
    await this.database.read();

    this.database.data ||= { tasks: [] };

    if (this.database.data.tasks.length > 0) {
      const dbItems = this.database.data.tasks;

      dbItems.forEach((item) =>
        this.itemMap.set(
          item.id,
          new TodoItem(item.id, item.task, item.complete),
        ),
      );
    } else {
      this.database.data.tasks = todoItems;
      await this.database.write();
    }
  }
}

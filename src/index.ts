import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

let todos: TodoItem[] = [
  new TodoItem(1, "Buy Flowers"),
  new TodoItem(2, "Get Shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true),
];

let collection: TodoCollection = new TodoCollection("Charles", todos);

console.log(`${collection.userName}'s Todo List:`);

let newId: number = collection.addTodo("Go for a run");
let todoItem: TodoItem | undefined = collection.getTodoById(newId);
todoItem?.printDetails();

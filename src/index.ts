import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import { select, input, checkbox } from "@inquirer/prompts";

let todos: TodoItem[] = [
  new TodoItem(1, "Buy Flowers"),
  new TodoItem(2, "Get Shoes"),
  new TodoItem(3, "Collect Tickets"),
  new TodoItem(4, "Call Joe", true),
];

let collection: TodoCollection = new TodoCollection("Charles", todos);
let showCompleted: boolean = true;

function displayTodoList(): void {
  console.log(
    `${collection.userName}'s Todo List ` +
      `(${collection.getItemCounts().incomplete} items to do)`,
  );
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}
displayTodoList();

enum Commands {
  Add = "Add new task",
  Complete = "Complete Task",
  Toggle = "Show/Hide Completed",
  Quit = "Quit",
}

async function promptAdd(): Promise<void> {
  console.clear();
  const task = await input({ message: "Enter a new task to add" });
  if (task) {
    collection.addTodo(task);
  }
  promptUser();
}

async function promptComplete(): Promise<void> {
  const answer = await checkbox({
    message: "Mark as Complete",
    choices: collection.getTodoItems(showCompleted).map((item) => ({
      name: item.task,
      value: item.id,
      checked: item.complete,
    })),
  });
  console.log(answer);
}

async function promptUser(): Promise<void> {
  console.clear();
  displayTodoList();
  const answer = await select({
    message: "Choose an option",
    choices: Object.values(Commands),
  });
  switch (answer) {
    case Commands.Toggle:
      showCompleted = !showCompleted;
      promptUser();
      break;
    case Commands.Add:
      await promptAdd();
      break;
    case Commands.Complete:
      await promptComplete();
      break;
  }
}

promptUser();

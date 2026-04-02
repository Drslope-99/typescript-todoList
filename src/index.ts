import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import { select, Separator } from "@inquirer/prompts";

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
  Toggle = "Show/Hide Completed",
  Quit = "Quit",
}

async function promptUser(): Promise<void> {
  console.clear();
  displayTodoList();
  const answer = await select({
    message: "Select a package manager",
    choices: [
      {
        name: "npm",
        value: "npm",
        description: "npm is the most popular package manager",
      },
      {
        name: "yarn",
        value: "yarn",
        description: "yarn is an awesome package manager",
        disabled: true,
      },
      new Separator(),
      {
        name: "jspm",
        value: "jspm",
        disabled: true,
      },
      {
        name: "pnpm",
        value: "pnpm",
        disabled: "(pnpm is not available)",
      },
    ],
  });
  console.log(`your selected ${answer}`);
}

promptUser();

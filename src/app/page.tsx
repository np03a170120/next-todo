import prisma from "../../lib/prisma";
import TodoList from "./component/TodoList";

export default async function Home() {
  const todoList = await prisma.todo.findMany();

  return (
    <>
      <TodoList todoList={todoList} />
    </>
  );
}

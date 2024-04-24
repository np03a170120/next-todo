import prisma from "../../lib/prisma";
import TodolistCreate from "./component/Create/TodolistCreate";
import TodoList from "./component/TodoList/TodoList";

export default async function Home() {
  const todoList = await prisma.todo.findMany();

  return (
    <>
      <div className=" flex  justify-center items-center w-full">
        <div className="mt-12">
          <TodolistCreate />
          <TodoList todoList={todoList} />
        </div>
      </div>
    </>
  );
}

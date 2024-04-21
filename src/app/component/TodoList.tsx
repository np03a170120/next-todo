import React from "react";

interface props {
  todoList: any;
}

const TodoList = ({ todoList }: props) => {
  console.log(todoList);
  return (
    <>
      {todoList.map((item: any) => {
        return (
          <>
            <h1>{item.title}</h1>
          </>
        );
      })}
    </>
  );
};

export default TodoList;

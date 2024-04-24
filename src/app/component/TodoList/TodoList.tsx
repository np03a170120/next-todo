"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ITodoList } from "./todolist-schema";
import { Pencil, Trash, Check, X } from "@phosphor-icons/react";

interface props {
  todoList: Array<ITodoList>;
}

const TodoList = ({ todoList }: props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    // resolver: zodResolver(""),
  });

  const [selectId, setSelectId] = useState<string>();
  const deleteTodo = (id: string) => {
    fetch(`/api/delete/` + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success > 0) {
          router.refresh();
        }
      });
  };

  const onsubmit = async (data: ITodoList | any) => {
    fetch(`/api/edit/` + selectId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      <div className="my-8">
        {todoList.map((item: any) => {
          return (
            <>
              <form
                className="w-[24rem] flex flex-col gap-2"
                method="POST"
                action=""
                onSubmit={handleSubmit(onsubmit)}
              >
                <div className="flex justify-between mb-2">
                  {selectId !== item.id && <h1>{item.title}</h1>}
                  {selectId === item.id && (
                    <input
                      {...register("title", { required: true })}
                      defaultValue={item.title}
                      className="border-2 p-2"
                      type="text"
                    />
                  )}
                  {selectId === item.id ? (
                    <div className="flex gap-2">
                      <button type="submit">
                        <Check
                          type="submit"
                          className="cursor-pointer"
                          size={24}
                        />
                      </button>
                      <button onClick={() => setSelectId("")}>
                        {" "}
                        <X type="submit" className="cursor-pointer" size={24} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Pencil
                        onClick={() => setSelectId(item.id)}
                        className="cursor-pointer"
                        size={24}
                      />
                      <Trash
                        onClick={() => deleteTodo(item.id)}
                        className="cursor-pointer"
                        size={24}
                      />
                    </div>
                  )}
                </div>
              </form>
            </>
          );
        })}
      </div>
    </>
  );
};

export default TodoList;

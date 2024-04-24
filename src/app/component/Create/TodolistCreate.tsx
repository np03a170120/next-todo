"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ITodoList } from "../TodoList/todolist-schema";
import { useRouter } from "next/navigation";

const TodolistCreate = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    // resolver: zodResolver(""),
  });
  const onsubmit = async (data: ITodoList | any) =>
    fetch(`/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success > 0) {
          router.refresh();
        }
      });

  return (
    <>
      <form
        className="w-[24rem] flex flex-col gap-2"
        method="POST"
        action=""
        onSubmit={handleSubmit(onsubmit)}
      >
        <input
          placeholder="title"
          className="border py-2 px-3"
          {...register("title", { required: true })}
          type="text"
        />{" "}
        <textarea
          placeholder="description"
          className="border py-2 px-3"
          {...register("content")}
        />{" "}
        <button className="bg-black  text-white">Submit</button>
      </form>
    </>
  );
};

export default TodolistCreate;

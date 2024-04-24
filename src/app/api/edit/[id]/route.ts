import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.error();
  }

  const post = await prisma.todo.findUnique({
    where: {
      id: id.toString(),
    },
  });

  const { title, content } = await request.json();
  const updatedPost = await prisma.todo.update({
    where: {
      id: id.toString(),
    },
    data: {
      title: title,
      content: content,
    },
  });

  return NextResponse.json({
    success: 1,
    todo: updatedPost,
    message: "Update success",
  });
}

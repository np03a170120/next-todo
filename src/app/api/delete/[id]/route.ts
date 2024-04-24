import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.error();
  }

  const deleteTodo = await prisma.todo.delete({
    where: {
      id: id.toString(),
    },
  });

  return NextResponse.json({ success: 1, message: "Delete success" });
}

import Link from "next/link";
import React from "react";
import { prisma } from "../db";
import { redirect } from "next/navigation";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  await prisma.todo.create({ data: { title, complete: false } });
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="w-full flex justify-between items-center mb-6 py-6">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTodo} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-4 justify-end">
          <Link
            href=".."
            className="outline-none border text-slate-300 border-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="outline-none border text-slate-300 border-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700"
          >
            Create
          </button>
        </div>
      </form>
      <h1></h1>
    </>
  );
}

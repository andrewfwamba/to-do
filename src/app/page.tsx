import Image from "next/image";
import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "@/components/TodoItem";

function getTodos() {
  return prisma.todo.findMany();
}

export default async function Home() {
  const todos = await getTodos();
  // await prisma.todo.create({ data: { title: "test", complete: false } });
  return (
    <main className="text-slate-100 container mx-auto py-6">
      <header className="w-full flex justify-between items-center mb-6">
        <h1>Todos</h1>
        <Link
          className="outline-none border text-slate-300 border-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem key={index} {...todo} />
        ))}
      </ul>
    </main>
  );
}

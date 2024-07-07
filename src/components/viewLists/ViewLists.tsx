"use client";
import Link from "next/link";
import { useViewLists } from "./useViewLists";

export default function ViewLists() {
  const { lists } = useViewLists();

  return (
    <div className="flex flex-col">
      {lists.map((list, index) => {
        return (
          <Link key={index} href={`/tasks?listId=${list.id}`}>
            {list.title}
          </Link>
        );
      })}
    </div>
  );
}

import AddTask from "@/components/addTask/AddTask";
import Tasks from "@/components/tasks/Tasks";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tasks",
  description: "View your tasks inside your list.",
  openGraph: {
    title: "Tasks - Todo App",
    description: "View your tasks inside your list.",
    url: `${process.env.DOMAIN}/tasks`,
  },
};

export default async function Task({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const theme = searchParams?.theme as string;
  return (
    <div
      className={`md:py-20 py-10 px-10 min-h-screen bg-${theme}Background text-${theme}Primary bg-dotted-pattern bg-dotted-size`}
    >
      <div className="w-full max-w-sm mx-auto md:max-w-md lg:max-w-2xl">
        <AddTask />
        <Tasks theme={theme} />
      </div>
    </div>
  );
}

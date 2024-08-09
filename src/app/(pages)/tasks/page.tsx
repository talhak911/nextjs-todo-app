import AddTask from "@/components/addTask/AddTask";
import { BackButton } from "@/components/backButton/BackButton";
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
      className={` px-[30px] pt-[24px] min-h-screen bg-${theme}Background text-${theme}Primary bg-dotted-pattern bg-dotted-size`}
    >
      <BackButton />
      <div className="w-full max-w-sm mx-auto md:max-w-md lg:max-w-2xl">
        <AddTask />
        <Tasks theme={theme} />
      </div>
    </div>
  );
}

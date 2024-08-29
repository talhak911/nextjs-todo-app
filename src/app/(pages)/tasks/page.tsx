import AddTask from "@/components/addTask/AddTask";
import { BackButton } from "@/components/backButton/BackButton";
import Tasks from "@/components/tasks/Tasks";
import { Theme } from "@/components/theme/Theme";
import { Metadata } from "next";
import { SettingsIcon } from "../../../../public/assets/icons/settingsIcon";
import Link from "next/link";

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
      className={`p-[24px] min-h-screen bg-${theme}Background text-${theme}Primary bg-dotted-pattern bg-dotted-size`}
    >
      <div className="flex justify-between">
        <BackButton />
        <Link href={`/settings?theme=${theme}`}>
          <SettingsIcon />
        </Link>
      </div>
      <div className={` px-[30px] pt-[24px]`}>
        <div className={` px-[30px] pt-[24px]`}>
          <div className="w-full max-w-sm mx-auto md:max-w-md lg:max-w-2xl">
            <AddTask />
            <Tasks theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}

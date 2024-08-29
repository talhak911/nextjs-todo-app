"use client";
import Link from "next/link";
import { useViewLists } from "./useViewLists";
import ListCrud from "../listCrud/ListCrud";
import { Loader } from "../../../public/assets/icons/loader";

export default function ViewLists({ theme }: { theme?: string }) {
  const { lists, loading } = useViewLists();
  if (loading) {
    return (
      <div className="mt-3">
        <Loader/>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1 xl:gap-[18px] xl:mb-[18px]">
      {lists?.map((list, index) => {
        return (
          <div key={index} className=" flex justify-between items-center px-5">
            <Link
              href={`/tasks?listId=${list?.id}&listName=${list?.title}&theme=${list?.theme}`}
              className="relative text-xl md:text-3xl xl:text-[64px] xl:leading-[83.2px] w-fit h-fit"
            >
              <span className="relative z-10">{list?.title}</span>
              <span
                className={`absolute left-0 right-0 bottom-2 xl:bottom-3 h-[3px] xl:h-[20px] bg-${list.theme}Accent z-0`}
              ></span>
            </Link>
            <ListCrud
              theme={theme}
              update={true}
              listIdToUpdate={list?.id}
              listTitle={list?.title}
            />
          </div>
        );
      })}
    </div>
  );
}

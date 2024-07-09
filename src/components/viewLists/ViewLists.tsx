"use client";
import Link from "next/link";
import { useViewLists } from "./useViewLists";
import ListCrud from "../listCrud/ListCrud";

export default function ViewLists() {
  const { lists ,loading} = useViewLists();
if(loading){
  return (
    <div>
      <h1>Loading</h1>
    </div>
  )
}
  return (
    <div className="flex flex-col gap-2">
      {lists?.map((list, index) => {
        return (
         <div 
         key={index} 
         className=" flex justify-between">
             <Link 
           
            href={`/tasks?listId=${list?.id}&listName=${list?.title}&theme=${list?.theme}`} 
            className="relative text-3xl w-fit"
          >
            <span className="relative z-10">{list?.title}</span>
            <span className="absolute left-0 right-0 bottom-2 h-[4px] bg-vintage-garden-accent z-0"></span>
          </Link>
         <ListCrud update={true} listIdToUpdate = {list?.id} listTitle={list?.title}/>
         </div>
        );
      })}
    </div>
  );
}

import AddTask from "@/components/addTask/AddTask";
import Tasks from "@/components/tasks/Tasks";
import { COLORS } from "@/constants/colors";
import { THEMES } from "@/constants/themes";
import clsx from "clsx";

export default async  function Task({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
})

{
  const theme = searchParams?.theme as string;
// const bg= `${searchParams?.theme}Background`
// const textColor = `${searchParams?.theme}Primary`
    return (

       <div 
       className={`py-20 px-10 min-h-screen bg-${theme}Background text-${theme}Primary bg-dotted-pattern bg-dotted-size`}
      //  style={{
      //   backgroundColor:COLORS[bg],
      //   color:COLORS[textColor]
        
      //  }
      //  }
       >
        <div className="w-full max-w-sm mx-auto md:max-w-md lg:max-w-2xl">
        <AddTask/>
        <Tasks theme={theme} />
        </div>
      
       
       </div>
    )
}
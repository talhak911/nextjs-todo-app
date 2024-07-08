import AddTask from "@/components/addTask/AddTask";
import Tasks from "@/components/tasks/Tasks";

export default function Task(){
    return (
       <div className="md:px-40 px-8 py-20 min-h-screen bg-vintage-garden-background">
        
         <AddTask/>
        <Tasks/>
       
       </div>
    )
}
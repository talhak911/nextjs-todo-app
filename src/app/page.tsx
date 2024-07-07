import AddList from "@/components/addList/AddList"
import ViewLists from "@/components/viewLists/ViewLists"

export default function Home(){
    // const session =useSession()

//  if(session.status==="unauthenticated"){
//     return(
//         <div className="flex items-center justify-center min-h-screen bg-vintage-garden-background">
//             <h1>{session.status}</h1>
//         </div>
//     )
//  }
    return (
        <div className="p-20 min-h-screen bg-vintage-garden-background">
            <h1 className="w-full text-center  text-3xl md:text-4xl lg:text-6xl ">Todo Lists</h1>
            <ViewLists/>
            <AddList/>
        </div>
    )
}
import { getServerSession } from "next-auth"


export default async function  Profile(){
    const user =await getServerSession()
  
    console.log(user?.user?.name)
    return(
        <div className="mx-auto w-full  max-w-[550px] h-screen bg-slate-500 text-white">
            <div className="flex flex-col items-center justify-center">
                {user?.user?.email}
            </div>

            <h3>
                {  user?.user?.name}
            </h3>
        </div>
    )
}
import { auth } from "/auth"

export default async function  Profile(){
    const user =await auth()
  
    console.log(user?.user?.id)
    return(
        <div className="mx-auto w-full  max-w-[550px] h-screen bg-slate-500">
            <div className="flex flex-col items-center justify-center">
                {user?.user?.email}
            </div>

            <h3>
                {  user?.user?.id}
            </h3>
        </div>
    )
}
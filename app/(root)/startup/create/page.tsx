import StartupForm from "@/components/StartupForm"
// import { url } from "inspector";
import { redirect } from "next/navigation";
import  {auth } from "@/app/auth"

const page = async() => {  

    const session =  await auth();

    if(!session) redirect('/');

  return (
    <>
        <section className="pink_container !min-h-[230px]">
            <h1 className="heading"> Submit Your StartUp  </h1>

        </section>
        <StartupForm />
    
    </>
  )
}

export default page
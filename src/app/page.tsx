import Footer from "@/components/footer";
import { HouseIcon, User, UserPlus } from "lucide-react";


export default function Home() {
  return (
    <>
      <main className="h-full w-full flex flex-col items-center justify-center p-3.5">
        <div className="flex flex-col items-center text-center gap-16">
          <div className="flex flex-col gap-10 items-center">
            <HouseIcon size={50}/>
            <span className="text-3xl font-extrabold uppercase">Selecione uma opção</span>
          </div>
          <div className="flex flex-col gap-5 w-full text-center text-gray-500 font-bold">
            <a href="/cadastro" className="relative h-12 bg-white rounded-full flex items-center justify-center gap-2.5">
              <UserPlus size={25} color="grey" className=" absolute left-4"/>
              <span>Novo cadastro</span>
            </a>
            <a href="/entrar" className="relative h-12 bg-white rounded-full flex items-center justify-center gap-2.5">
               <User size={25} color="grey" className="absolute left-4"/>
               <span>Entrar</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>    
    )
}
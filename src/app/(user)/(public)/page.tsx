// vital-health-insights/src/app/(user)/(public)/page.tsx
'use client';

import Footer from "@/components/footer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // Importe Tooltip
import { HouseIcon, User, UserPlus } from "lucide-react";
import Link from "next/link";

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
            <Link href="/cadastro" className="relative h-12 bg-white rounded-full flex items-center justify-center gap-2.5">
              <UserPlus size={25} color="grey" className=" absolute left-4"/>
              <span>Novo cadastro</span>
            </Link>
            <Link href="/entrar" className="relative h-12 bg-white rounded-full flex items-center justify-center gap-2.5">
              <User size={25} color="grey" className="absolute left-4"/>
              <span>Entrar</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/admin" className="relative h-12 bg-red-500 rounded-full flex items-center justify-center gap-2.5 text-white">
                  Dashboard Admin
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-red-500">
                <p>Visualizar todos os usuários cadastrados (provisório)</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
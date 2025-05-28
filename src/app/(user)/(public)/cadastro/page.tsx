import Footer from "@/components/footer";
import InputIcon from "@/components/ui/InputIcon";
import { Calendar, CircleAlert, CornerUpLeft, MapPinHouse, Shield, ShieldCheck, User, UserSquare } from "lucide-react";
import Link from "next/link";
import RegistroForm from "./form";


export default function Cadastro() {
    return (
        <>
            <main className="relative h-full w-full flex flex-col items-center justify-center gap-10">
                <Link href="/">
                    <CornerUpLeft size={25} className="absolute left-2 top-15"/>
                </Link>
                <h1 className="text-3xl font-extrabold uppercase">Cadastro</h1>
                <span className="flex items-center gap-2.5">
                     <CircleAlert size={30} className="right-2 top-15 text-red-600" />
                     <span className=" text-red-500 text-sm font-bold">NÃO UTILIZE DADOS REAIS (VERSÃO DEMO)</span>
                </span>
                <RegistroForm />
            </main>
            <Footer />
        </>    
    );
}
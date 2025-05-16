import Footer from "@/components/footer";
import InputIcon from "@/components/ui/InputIcon";
import { Calendar, CornerUpLeft, MapPinHouse, Shield, ShieldCheck, User, UserSquare } from "lucide-react";
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
                <RegistroForm />
            </main>
            <Footer />
        </>    
    );
}
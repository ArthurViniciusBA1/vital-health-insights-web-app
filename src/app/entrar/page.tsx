import Footer from "@/components/footer";
import { CornerUpLeft } from "lucide-react";
import Link from "next/link";
import EntrarForm from "./form";

export default function Entrar() {
    
    return (
        <>
            <main className="relative h-full w-full flex flex-col items-center justify-center gap-10">
                <Link href="/">
                    <CornerUpLeft size={25} className="absolute left-2 top-15"/>
                </Link>
                <h1 className="text-3xl font-extrabold uppercase">Entrar</h1>
                <EntrarForm />
            </main>
            <Footer />
        </>
    );
}
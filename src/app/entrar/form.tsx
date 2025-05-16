"use client";

import InputIcon from "@/components/ui/InputIcon";
import { Shield, UserSquare } from "lucide-react";


export default function EntrarForm() {

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);

        const cpf = formData.get("cpf");
        const password = formData.get("password");

        const data = { cpf, password};

        console.log(data);
      }


    return (
        <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5">
                    <InputIcon placeholder="CPF" iconLeft={<UserSquare size={25} />} name="cpf"/>
                    <InputIcon placeholder="Senha" iconLeft={<Shield size={25} />} showToggle={true} name="password"/>
                </div>
            <button type="submit" className="h-12 bg-green-500 rounded-full flex items-center justify-center gap-2.5">
                Entrar
            </button>
        </form>
    )
}
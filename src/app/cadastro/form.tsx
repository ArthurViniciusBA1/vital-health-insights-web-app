"use client";

import InputIcon from "@/components/ui/InputIcon";
import { Calendar, MapPinHouse, Shield, ShieldCheck, User, UserSquare } from "lucide-react";


export default function RegistroForm() {

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const cpf = formData.get("cpf");
        const birthDate = formData.get("birthDate");
        const address = formData.get("address");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        const data = {name, cpf, birthDate, address, password, confirmPassword};

        console.log(data);
      }


    return (
        <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
                <InputIcon placeholder="Nome Completo" iconLeft={<User size={25} />} name="name"/>
                <InputIcon placeholder="CPF" iconLeft={<UserSquare size={25} />} name="cpf"/>
                <InputIcon iconLeft={<Calendar size={25} />} type="date"name="birthDate"/>
                <InputIcon placeholder="Endereço" iconLeft={<MapPinHouse size={25} />} name="address"/>
                <InputIcon placeholder="Senha" iconLeft={<Shield size={25} />} showToggle={true} name="password"/>
                <InputIcon placeholder="Senha" iconLeft={<ShieldCheck size={25} />} showToggle={true} name="confirmPassword"/>
            </div>
            <button type="submit" className="h-12 bg-green-500 rounded-full flex items-center justify-center gap-2.5">
                Cadastrar
            </button>
        </form>
    )
}
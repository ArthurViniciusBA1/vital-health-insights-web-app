"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputIcon from "@/components/ui/InputIcon";

import { Shield, UserSquare } from "lucide-react";
import { loginSchema, tLogin } from "@/lib/schemas/usuarioSchema";
import { cleanNumberString } from "@/lib/utils";

export default function EntrarForm() {
  const router = useRouter();

  const form = useForm<tLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      cpf: "",
      password: "",
    },
  });

  const onSubmit = async (data: tLogin) => {
    const cleanedCpf = cleanNumberString(data.cpf);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, cpf: cleanedCpf }),
    });

    const result = await res.json();    

    if (!res.ok) {
        if(result.error.cpf || result.error.password){
            toast.error("CPF ou senha inválidos");
        }
      
      return;
    }

    toast.success("Login realizado com sucesso!");

    router.push("/dashboard");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">CPF</FormLabel>
                <FormControl>
                  <InputIcon placeholder="CPF" iconLeft={<UserSquare size={25} />} {...field} mask="___.___.___-__"/>
                </FormControl>
                <FormMessage className=""/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Senha</FormLabel>
                <FormControl>
                  <InputIcon
                    placeholder="Senha"
                    iconLeft={<Shield size={25} />}
                    showToggle
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting} variant={"success"}>
          {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
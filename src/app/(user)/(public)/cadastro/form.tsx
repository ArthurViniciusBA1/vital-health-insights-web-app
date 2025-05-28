"use client";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InputIcon from "@/components/ui/InputIcon";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroSchema, tCadastro, tUsuario } from "@/lib/schemas/usuarioSchema";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Calendar, MapPin, Shield, ShieldCheck, User, UserSquare } from "lucide-react";
import { cleanNumberString, createUtcDateFromDdMmYyyy } from "@/lib/utils";

export default function CadastroForm() {
  const form = useForm<tCadastro>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      name: "",
      cpf: "",
      birthDate: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const delay = 15;
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(delay);

  const onSubmit = async (data: tCadastro) => {
    const cleanedCpf = cleanNumberString(data.cpf);
    const date = createUtcDateFromDdMmYyyy(data.birthDate);	

    const res = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, cpf: cleanedCpf, birthDate: date }), 
    });

    if (res.status === 409) {
      form.setError("cpf", { message: "CPF já cadastrado" });
      return;
    }

    const result = await res.json();
    setName(result.usuario?.name || "Usuário");
    setModalOpen(true);
    form.reset();
  };

  useEffect(() => {
    if (!modalOpen) return;

    const interval = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/entrar");
    }, delay * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [modalOpen, router]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputIcon placeholder="Nome completo" iconLeft={<User size={25} />} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputIcon placeholder="CPF" iconLeft={<UserSquare size={25} />} {...field} mask="___.___.___-__"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputIcon placeholder="Data de nascimento" iconLeft={<Calendar size={25} />} {...field} mask="__/__/____"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputIcon placeholder="Endereço" iconLeft={<MapPin size={25} />} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputIcon placeholder="Senha" iconLeft={<Shield size={25} />} showToggle type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputIcon placeholder="Confirmar senha" iconLeft={<ShieldCheck size={25} />} showToggle type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting} variant="success">
          {form.formState.isSubmitting ? "Enviando..." : "Cadastrar"}
        </Button>
      </form>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold text-center">
              {name}, seja bem-vindo!
            </DialogTitle>
            <DialogDescription className="text-center text-xl mt-4">
              Você será redirecionado para a tela de login em{" "}
              <span className="font-bold flex flex-col mt-1.5">
                <span className="text-3xl">{redirectCountdown}</span> segundos
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="success"
              className="w-full text-2xl font-extrabold"
              onClick={() => router.push("/entrar")}
            >
              Ir agora
            </Button>
            
          </DialogFooter>
          
          
        </DialogContent>
      </Dialog>
    </Form>
  );
}

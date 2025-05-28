
import { z } from "zod";

export const cadastroSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(11, "CPF inválido"),
  birthDate: z.string().min(1, "Data de nascimento obrigatória"),
  address: z.string().min(1, "Endereço é obrigatório"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "As senhas não coincidem",
});

export type tCadastro = z.infer<typeof cadastroSchema>;

export type tUsuario = Omit<tCadastro, "confirmPassword"> & { id: string };

export const loginSchema = z.object({
  cpf: z.string().min(11, "CPF obrigatório"),
  password: z.string().min(1, "Senha obrigatória"),
});

export type tLogin = z.infer<typeof loginSchema>;

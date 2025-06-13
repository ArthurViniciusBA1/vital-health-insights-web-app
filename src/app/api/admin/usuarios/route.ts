import { decrypt } from "@/lib/encryption";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  
    try {
      const users = await prisma.usuario.findMany({
        select: {
          id: true,
          name: true,
          cpf: true,
          birthDate: true,
          address: true,
          createdAt: true,
        },
      });
  
      const decryptedUsers = users.map(user => ({
        ...user,
        cpf: decrypt(user.cpf),
        encryptedCpf: user.cpf  // Adiciona o campo "encriptedCpf" com o CPF encriptado (provisório, deve ser removido)
      }));
  
      return NextResponse.json(decryptedUsers, { status: 200 });
    } catch (error) {
      console.error("Erro ao buscar usuários para o painel de administração:", error);
      return NextResponse.json({ message: 'Erro ao buscar usuários.' }, { status: 500 });
    }
  }
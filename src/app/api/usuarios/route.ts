import { NextResponse } from "next/server";
import { cadastroSchema } from "@/lib/schemas/usuarioSchema"; 
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"; 
import { gerarToken } from "@/lib/jwt"; 
import { cookies } from "next/headers";
import { decrypt, encrypt } from "@/lib/encryption"; 
import { procurarUsuario } from "@/lib/user"; 

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = cadastroSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.format() }, { status: 400 });
    }

    const { name, cpf, birthDate, address, password } = result.data;

    const existing = await procurarUsuario(cpf);

    if (existing) {
      return NextResponse.json({ error: "CPF já cadastrado" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: {
        name,
        cpf: encrypt(cpf),
        birthDate: new Date(birthDate),
        address,
        password: hashedPassword,
      },
    });

    const token = gerarToken({ id: usuario.id, name: usuario.name });

    const cookie = await cookies()

    cookie.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({
      message: "Usuário cadastrado com sucesso",
      usuario: {
        id: usuario.id,
        name: usuario.name,
      },
    }, { status: 201 });

  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    return NextResponse.json({ error: "Erro interno do servidor"}, { status: 500 });
  }
}


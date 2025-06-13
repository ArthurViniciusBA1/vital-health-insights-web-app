import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { gerarToken } from "@/lib/jwt"; 
import { cookies } from "next/headers";
import { loginSchema } from "@/lib/schemas/usuarioSchema"; 
import { procurarUsuario } from "@/lib/user";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = loginSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      );
    }

    const { cpf, password } = result.data;

    const usuario = await procurarUsuario(cpf);

    if (!usuario) {
      return NextResponse.json({ error: {cpf: "CPF ou senha inválidos"} }, { status: 401 });
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.password);

    if (!senhaCorreta) {
      return NextResponse.json({ error: {password: "CPF ou senha inválidos"} }, { status: 401 });
    }

    const token = gerarToken({ id: usuario.id, name: usuario.name }); 

    const cookie = await cookies()

    if (cookie.has("token")) {
      cookie.delete("token");
    }

    cookie.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({
      message: "Login realizado com sucesso",
      usuario: {
        id: usuario.id,
        name: usuario.name,
      },
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}


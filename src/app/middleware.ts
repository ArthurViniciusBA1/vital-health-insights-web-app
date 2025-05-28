import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("ERRO CRÍTICO DE CONFIGURAÇÃO: JWT_SECRET não está definido nas variáveis de ambiente.");
    return NextResponse.json(
      { message: "Erro interno do servidor: Configuração de segurança ausente." },
      { status: 500 }
    );
  }
  const encryptionKey = process.env.ENCRYPTION_KEY;
  if (!encryptionKey || encryptionKey.length !== 64) {
    console.error("ERRO CRÍTICO DE CONFIGURAÇÃO: ENCRYPTION_KEY não está definida ou não tem o formato correto (64 caracteres hexadecimais).");
    return NextResponse.json(
      { message: "Erro interno do servidor: Configuração de criptografia inválida." },
      { status: 500 }
    );
  }

  const token = request.cookies.get('token')?.value;

  let isAuthenticated = false;
  if (token) {
    try {
      jwt.verify(token, jwtSecret);
      isAuthenticated = true;
    } catch (error) {
      console.error("Token inválido no middleware:", (error as Error).message);
      isAuthenticated = false;
    }
  }

  const publicAuthPaths = ['/entrar', '/cadastro', '/forgot-password'];
  const isPublicAuthPath = publicAuthPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isAuthenticated && isPublicAuthPath) {
    console.log("Middleware: Autenticado e em rota pública de auth. Redirecionando para /dashboard.");
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/entrar/:path*', '/cadastro/:path*', '/dashboard/:path*', '/'], //
};
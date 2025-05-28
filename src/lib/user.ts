import { prisma } from "./prisma"; 
import { encrypt } from "./encryption"; 
import { Usuario } from "@prisma/client"; 

/**
 * Procura um usuário no banco de dados pelo CPF, criptografando o CPF antes da busca.
 * @param cpf O CPF do usuário em texto puro.
 * @returns O objeto Usuario encontrado ou null se não for encontrado.
 */
export async function procurarUsuario(cpf: string): Promise<Usuario | null> {
  try {
    const encryptedCpf = encrypt(cpf); // Criptografa o CPF recebido

    const usuario = await prisma.usuario.findUnique({
      where: {
        cpf: encryptedCpf,
      },
    });

    return usuario;
  } catch (error) {
    console.error("Erro ao procurar usuário por CPF (criptografado):", error);
    throw new Error("Falha ao procurar usuário.");
  }
}

/**
 * Procura um usuário no banco de dados pelo ID.
 * @param id O ID do usuário.
 * @returns O objeto Usuario encontrado ou null se não for encontrado.
 */
export async function procurarUsuarioPorId(id: string): Promise<Usuario | null> {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: id,
      },
    });
    return usuario;
  } catch (error) {
    console.error("Erro ao procurar usuário por ID:", error);
    throw new Error("Falha ao procurar usuário por ID.");
  }
}
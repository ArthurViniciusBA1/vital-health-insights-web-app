import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserProvider, UserContextType } from '@/context/UserContext';
import { decrypt } from '@/lib/encryption';
import { procurarUsuarioPorId } from '@/lib/user';
import { Usuario } from '@prisma/client';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("Erro de configuração: JWT_SECRET não definido.");
  }

  const encryptionKey = process.env.ENCRYPTION_KEY;
  if (!encryptionKey || encryptionKey.length !== 64) {
    throw new Error("Erro de configuração: ENCRYPTION_KEY inválida.");
  }

  let isAuthenticated = false;
  let currentUserPrisma: Usuario | null = null;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
      
      currentUserPrisma = await procurarUsuarioPorId(decodedToken.id);

      if (currentUserPrisma) {
        isAuthenticated = true;
      } else {
        isAuthenticated = false;
      }

    } catch (error) {
      if ((error as any).digest === "NEXT_REDIRECT") {
        throw error;
      }
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated || !currentUserPrisma) {
    const errorMessage = encodeURIComponent("Você precisa estar autenticado para acessar esta página.");
    redirect(`/loading-redirect?error=${errorMessage}`);
  }

  const decryptedCpf = decrypt(currentUserPrisma.cpf);

  const userContextData: UserContextType = {
    id: currentUserPrisma.id,
    name: currentUserPrisma.name,
    cpf: decryptedCpf,
    birthDate: currentUserPrisma.birthDate,
    address: currentUserPrisma.address,
  };

  return (
    <UserProvider user={userContextData}>
      {children}
    </UserProvider>
  );
}

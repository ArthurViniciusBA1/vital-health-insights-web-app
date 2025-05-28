'use client';

import { useRouter } from 'next/navigation'; 
import { useUser } from '@/context/UserContext';
import { formatCpf } from '@/lib/utils'; 
import { Button } from '@/components/ui/button'; 
import { LogOut } from 'lucide-react'; 
import { toast } from 'sonner';

export default function Dashboard() {
    const router = useRouter();
    const user = useUser();

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/logout', {
                method: 'POST',
            });

            if (res.ok) {
                router.push('/'); 
                toast.success('Logout realizado com sucesso!');
            } else {
                console.error('Falha ao fazer logout:', res.status);
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const displayCpf = user.cpf ? formatCpf(user.cpf) : 'CPF não disponível';

    return (
        <main className="relative h-full w-full flex flex-col items-center justify-center gap-10 ">
            <h1 className="text-3xl font-extrabold uppercase">Bem-vindo, {user.name}!</h1>
            <ul>
                <li>ID: {user.id}</li>
                <li>CPF: {displayCpf}</li>
                <li>Data de Nascimento: {user.birthDate.toLocaleDateString()}</li>
                <li>Endereço: {user.address}</li>
            </ul>

            <Button onClick={handleLogout} variant="destructive" className="mt-10 cursor-pointer w-fit px-5">
                <LogOut size={20} className="mr-2" />
                Sair
            </Button>
        </main>
    );
}
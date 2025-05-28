// vital-health-insights/src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { formatCpf } from '@/lib/utils';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';

interface UserData {
    id: string;
    name: string;
    cpf: string; // Este será o CPF descriptografado
    encryptedCpf: string; // Adicionamos esta propriedade para o CPF criptografado
    birthDate: string;
    address: string;
    createdAt: string;
}

export default function Admin() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch('/api/admin/usuarios');

                if (res.ok) {
                    const data: UserData[] = await res.json();
                    setUsers(data);
                } else {
                    const errorBody = await res.text();
                    console.error("Erro na API /api/admin/users. Status:", res.status, "Corpo da resposta:", errorBody);

                    try {
                        const errorJson = JSON.parse(errorBody);
                        setError(errorJson.message || `Erro do servidor (Código: ${res.status})`);
                    } catch (jsonError) {
                        setError(`Erro inesperado do servidor (Código: ${res.status}). Verifique o console para mais detalhes.`);
                    }
                }
            } catch (err) {
                console.error("Erro de conexão ao tentar chamar /api/admin/users:", err);
                setError('Erro de conexão ao servidor. Verifique se o servidor está rodando.');
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    return (
        <main className="relative h-full w-full flex flex-col items-center justify-center p-4">
            {/* NOVO HEADER RESPONSIVO PARA ADMIN */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between w-full max-w-4xl px-2">
                <Link href="/" className="flex-shrink-0">
                    <HomeIcon size={25} />
                </Link>
                <h1 className="text-3xl font-extrabold uppercase text-center flex-grow">Usuários Cadastrados</h1>
                {/* Espaçador para centralizar o título se houver apenas um elemento à esquerda */}
                <div className="w-[25px] h-[25px] opacity-0"></div>
            </div>
            {/* FIM DO NOVO HEADER */}

            {/* Ajustado padding-top do main para não sobrepor o header */}
            <div className="flex flex-col items-center justify-center pt-20 w-full"> {/* Adicionado pt-20 e w-full aqui */}
                {loading && <p>Carregando usuários...</p>}
                {error && <p className="text-red-500">Erro: {error}</p>}

                {!loading && !error && (
                    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                        {users.length === 0 ? (
                            <p className="text-center text-gray-600">Nenhum usuário cadastrado.</p>
                        ) : (
                            <>
                                {/* Tabela para telas maiores */}
                                <table className="min-w-full divide-y divide-gray-200 hidden md:table">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF no banco de dados</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nascimento</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCpf(user.cpf)}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900 break-all">{user.encryptedCpf}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(user.birthDate).toLocaleDateString('pt-BR')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.address}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Cards para telas menores */}
                                <div className="md:hidden flex flex-col gap-4">
                                    {users.map((user) => (
                                        <div key={user.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                            <p className="text-sm font-medium text-gray-700">
                                                <span className="font-bold">Nome:</span> {user.name}
                                            </p>
                                            <p className="text-sm font-medium text-gray-700">
                                                <span className="font-bold">CPF:</span> {formatCpf(user.cpf)}
                                            </p>
                                            <p className="text-sm font-medium text-gray-700">
                                                <span className="font-bold">CPF (criptografado):</span> <span className="break-all">{user.encryptedCpf}</span>
                                            </p>
                                            <p className="text-sm font-medium text-gray-700">
                                                <span className="font-bold">Nascimento:</span> {new Date(user.birthDate).toLocaleDateString('pt-BR')}
                                            </p>
                                            <p className="text-sm font-medium text-gray-700">
                                                <span className="font-bold">Endereço:</span> {user.address}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
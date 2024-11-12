"use client";

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { BiSolidEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import EditUserModal from '../components/EditUserModal';
import { formatCPF, formatRG } from '../utils/formatters'; // Formatadores de CPF e RG
import '../styles/globals.css';

// Mensagens de erro e acesso
const ERROR_FETCH_USERS = "Erro ao carregar usuários. Tente novamente mais tarde.";
const ACCESS_DENIED_MESSAGE = "Esta página requer autenticação.";

// Definindo tipo de dados para o usuário
type User = {
  id: number;
  name: string;
  rm: string;
  cpf: string;
  rg: string;
  profession: string;
};

export default function UserManagementPage() {
  // Estados para dados e controle de interface
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Indica se o usuário está autenticado

  const router = useRouter();

  // Verifica autenticação na montagem do componente
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken); // Define `true` se existir `authToken`, senão `false`
  }, []);

  // Carrega usuários se autenticado
  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    } else if (isAuthenticated === false) {
      setLoading(false); // Para o carregamento se o usuário não está autenticado
    }
  }, [isAuthenticated]);

  // Busca usuários do backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error("Falha ao buscar usuários");
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch {
      setError(ERROR_FETCH_USERS);
    } finally {
      setLoading(false);
    }
  };

  // Deleta um usuário
  const deleteUser = async (id: number) => {
    setDeletingUserId(id);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Delay para feedback visual
    setUsers(users.filter(user => user.id !== id));
    setDeletingUserId(null);
  };

  // Salva edição do usuário
  const saveUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`/api/users/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (!response.ok) throw new Error("Erro ao atualizar o usuário");
  
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      setError("Erro ao atualizar o usuário. Tente novamente.");
    }
  };

  // Exibe a mensagem de acesso restrito se o usuário não estiver autenticado
  if (isAuthenticated === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-page">
        <div className="w-full max-w-md container-bg p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-color mb-4">Acesso Restrito</h2>
          <p className="text-sm text-secondary mb-6">{ACCESS_DENIED_MESSAGE}</p>
          <button onClick={() => router.push("/login")} className="button-primary w-full">
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <div className="w-full max-w-6xl p-8 space-y-6 container-bg relative">
        <h2 className="text-3xl font-bold text-center" style={{ color: "var(--text-color)" }}>User Management</h2>

        {loading ? (
          <div className="text-center text-secondary">Carregando usuários...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : users.length === 0 ? (
          // Mostra mensagem se lista de usuários estiver vazia
          <div className="text-center text-secondary">Nenhum usuário encontrado.</div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs table-header">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">RM</th>
                <th className="px-6 py-3 text-left">CPF</th>
                <th className="px-6 py-3 text-left">RG</th>
                <th className="px-6 py-3 text-left">Profession</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="table-row">
                  <td className="px-6 py-4 text-left table-cell">{user.id}</td>
                  <td className="px-6 py-4 text-left table-cell">{user.name}</td>
                  <td className="px-6 py-4 text-left table-cell">{user.rm}</td>
                  <td className="px-6 py-4 text-left table-cell">{formatCPF(user.cpf)}</td>
                  <td className="px-6 py-4 text-left table-cell">{formatRG(user.rg)}</td>
                  <td className="px-6 py-4 text-left table-cell">{user.profession}</td>
                  <td className="px-6 py-4 flex justify-center items-center gap-2">
                    <button className="button-icon" onClick={() => setEditingUser(user)}>
                      <BiSolidEdit size={20} />
                    </button>
                    <button
                      className={`button-icon ${deletingUserId === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !deletingUserId && deleteUser(user.id)}
                      disabled={deletingUserId === user.id}
                    >
                      {deletingUserId === user.id ? "Deletando..." : <BsTrash size={20} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={saveUser}
        />
      )}
    </div>
  );
}

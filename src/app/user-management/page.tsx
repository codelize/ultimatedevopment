"use client";

import { useEffect, useState } from 'react';
import { BiSolidEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import EditUserModal from '../components/EditUserModal';
import '../styles/globals.css';

type User = {
  id: number;
  name: string;
  rm: string;
  cpf: string;
  rg: string;
  profession: string;
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null); // ID do usuário que está sendo deletado

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error("Falha ao buscar usuários");
        const data = await response.json();
        setUsers(data);
        setError(null);
      } catch (error) {
        setError("Erro ao carregar usuários. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatRG = (rg: string) => {
    return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
  };

  const deleteUser = async (id: number) => {
    setDeleting(id);
    // Simulação de atraso para mostrar o feedback de deleção
    await new Promise((resolve) => setTimeout(resolve, 500));
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setDeleting(null);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
  };

  const saveUser = (updatedUser: User) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <div className="w-full max-w-6xl p-8 space-y-6 container-bg">
        <h2 className="text-3xl font-bold text-center" style={{ color: "var(--text-color)" }}>User Management</h2>

        {loading ? (
          <div className="text-center text-secondary">Carregando usuários...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
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
                    <button className="button-icon" onClick={() => openEditModal(user)}>
                      <BiSolidEdit size={20} />
                    </button>
                    <button
                      className={`button-icon ${deleting === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !deleting && deleteUser(user.id)}
                      disabled={deleting === user.id}
                    >
                      {deleting === user.id ? "Deletando..." : <BsTrash size={20} />}
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

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useUserManagement, User } from '../hooks/useUserManagement';
import UserTable from '../components/UserTable';
import EditUserModal from '../components/EditUserModal';

export default function UserManagementPage() {
  const { users, loading, error, isAuthenticated, updateUser, deleteUser } = useUserManagement();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true); // Novo estado para verificar autenticação
  const router = useRouter();

  useEffect(() => {
    // Simulando verificação de autenticação
    const checkAuth = async () => {
      setAuthLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulação de espera
      setAuthLoading(false);
    };
    checkAuth();
  }, []);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-page">
        <div className="loader"></div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-page">
        <div className="w-full max-w-md container-bg p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-color mb-4">Acesso Restrito</h2>
          <p className="text-sm text-secondary mb-6">Você precisa estar logado para acessar esta página.</p>
          <button onClick={() => router.push("/login")} className="button-primary w-full">
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  const handleEditUser = (user: User) => setEditingUser(user);
  const handleDeleteUser = (id: number) => deleteUser(id);
  const handleSaveUser = (updatedUser: User) => {
    updateUser(updatedUser);
    setEditingUser(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-page">
      <div className="w-full max-w-6xl p-8 container-bg space-y-6">
        <h2 className="text-3xl font-bold text-center text-color">User Management</h2>
        {loading ? (
          <p className="text-center text-secondary">Carregando usuários...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
        )}
      </div>
      {editingUser && (
        <EditUserModal user={editingUser} onClose={() => setEditingUser(null)} onSave={handleSaveUser} />
      )}
    </div>
  );
}

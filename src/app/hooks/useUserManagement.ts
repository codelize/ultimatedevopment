import { useEffect, useState } from 'react';

export type User = {
  id: number;
  name: string;
  rm: string;
  cpf: string;
  rg: string;
  profession: string;
};

export function useUserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error("Erro ao buscar usuários");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError("Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (newUser: User) => {
    // Gera um ID temporário para o novo usuário
    const tempId = Math.random(); 
    setUsers((prevUsers) => [...prevUsers, { ...newUser, id: tempId }]);

    try {
      const response = await fetch('/api/users', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Erro ao registrar o usuário");

      const createdUser = await response.json();

      // Substitui o usuário com ID temporário pelo usuário retornado do servidor
      setUsers((prevUsers) => 
        prevUsers.map(user => user.id === tempId ? createdUser : user)
      );
    } catch {
      setError("Erro ao registrar o usuário.");
      // Remove o usuário temporário em caso de erro
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== tempId));
    }
  };

  const updateUser = async (updatedUser: User) => {
    // Atualiza o usuário na lista localmente
    setUsers((prevUsers) =>
      prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );

    // Envia a atualização para o backend
    try {
      await fetch(`/api/users/${updatedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
    } catch {
      setError("Erro ao atualizar o usuário.");
    }
  };

  const deleteUser = (id: number) => {
    // Remove o usuário da lista local imediatamente
    setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));

    // Não realiza chamada ao backend para deletar (pois o objetivo é apenas deletar localmente)
  };

  return {
    users,
    loading,
    error,
    isAuthenticated,
    fetchUsers,
    registerUser,
    updateUser,
    deleteUser,
  };
}

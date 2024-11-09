"use client";

import { useEffect, useState } from 'react';
import { BiSolidEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import EditUserModal from '../components/EditUserModal';

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
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);

  const deleteUser = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
  };

  const saveUser = (updatedUser: User) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-6xl p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">User Management</h2>
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th className="px-6 py-3 text-center">ID</th>
              <th className="px-6 py-3 text-center">Name</th>
              <th className="px-6 py-3 text-center">RM</th>
              <th className="px-6 py-3 text-center">CPF</th>
              <th className="px-6 py-3 text-center">RG</th>
              <th className="px-6 py-3 text-center">Profession</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-gray-800 border-b border-gray-700 h-12">
                <td className="px-6 py-4 text-center">{user.id}</td>
                <td className="px-6 py-4 text-center">{user.name}</td>
                <td className="px-6 py-4 text-center">{user.rm}</td>
                <td className="px-6 py-4 text-center">{user.cpf}</td>
                <td className="px-6 py-4 text-center">{user.rg}</td>
                <td className="px-6 py-4 text-center">{user.profession}</td>
                <td className="px-6 py-4 flex justify-center items-center gap-2">
                  <button
                    className="text-gray-400 hover:text-gray-700"
                    onClick={() => openEditModal(user)}
                  >
                    <BiSolidEdit size={20} />
                  </button>
                  <button
                    className="text-gray-400 hover:text-gray-700"
                    onClick={() => deleteUser(user.id)}
                  >
                    <BsTrash size={20} /> {/* Ícone de lixeira vazado */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

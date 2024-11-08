"use client";

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">User Management</h2>
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">RM</th>
              <th scope="col" className="px-6 py-3">CPF</th>
              <th scope="col" className="px-6 py-3">RG</th>
              <th scope="col" className="px-6 py-3">Profession</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-gray-800 border-b border-gray-700">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.rm}</td>
                <td className="px-6 py-4">{user.cpf}</td>
                <td className="px-6 py-4">{user.rg}</td>
                <td className="px-6 py-4">{user.profession}</td>
                <td className="px-6 py-4">
                  <button className="px-2 py-1 mr-2 text-xs text-white bg-blue-500 rounded hover:bg-blue-600">Edit</button>
                  <button className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

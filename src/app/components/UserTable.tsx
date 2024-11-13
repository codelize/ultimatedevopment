import React from 'react';
import { User } from '../hooks/useUserManagement';
import { BiSolidEdit } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
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
        {users.map(user => (
          <tr key={user.id} className="table-row">
            <td className="px-6 py-4 table-cell">{user.id}</td>
            <td className="px-6 py-4 table-cell">{user.name}</td>
            <td className="px-6 py-4 table-cell">{user.rm}</td>
            <td className="px-6 py-4 table-cell">{user.cpf}</td>
            <td className="px-6 py-4 table-cell">{user.rg}</td>
            <td className="px-6 py-4 table-cell">{user.profession}</td>
            <td className="px-6 py-4 flex justify-center items-center gap-2">
              <button className="button-icon" onClick={() => onEdit(user)}>
                <BiSolidEdit size={20} />
              </button>
              <button className="button-icon" onClick={() => onDelete(user.id)}>
                <BsTrash size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

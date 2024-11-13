import React, { useState } from 'react';

type User = {
  id: number;
  name: string;
  rm: string;
  cpf: string;
  rg: string;
  profession: string;
};

type EditUserModalProps = {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
};

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (field: keyof User, value: string) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  // Função para salvar as alterações no backend via API
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${editedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar o usuário');
      }

      // Se a atualização for bem-sucedida, chama a função onSave para atualizar a interface
      onSave(editedUser);
      onClose(); // Fecha o modal após a edição
    } catch (error) {
      console.error('Erro ao salvar o usuário:', error);
      alert('Ocorreu um erro ao atualizar o usuário. Tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="container-bg w-full max-w-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-color)" }}>
          Edit User
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-color)" }}>ID</label>
            <input
              type="text"
              value={editedUser.id}
              readOnly
              className="w-full p-2 rounded"
              style={{
                backgroundColor: "var(--table-header-bg)",
                color: "var(--text-color)",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-color)" }}>Name</label>
            <input
              type="text"
              value={editedUser.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full p-2 rounded"
              style={{
                backgroundColor: "var(--table-header-bg)",
                color: "var(--text-color)",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-color)" }}>RM</label>
            <input
              type="text"
              value={editedUser.rm}
              onChange={(e) => handleChange("rm", e.target.value)}
              className="w-full p-2 rounded"
              style={{
                backgroundColor: "var(--table-header-bg)",
                color: "var(--text-color)",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-color)" }}>CPF</label>
            <input
              type="text"
              value={editedUser.cpf}
              onChange={(e) => handleChange("cpf", e.target.value)}
              className="w-full p-2 rounded"
              style={{
                backgroundColor: "var(--table-header-bg)",
                color: "var(--text-color)",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-color)" }}>RG</label>
            <input
              type="text"
              value={editedUser.rg}
              onChange={(e) => handleChange("rg", e.target.value)}
              className="w-full p-2 rounded"
              style={{
                backgroundColor: "var(--table-header-bg)",
                color: "var(--text-color)",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-color)" }}>Profession</label>
            <input
              type="text"
              value={editedUser.profession}
              onChange={(e) => handleChange("profession", e.target.value)}
              className="w-full p-2 rounded"
              style={{
                backgroundColor: "var(--table-header-bg)",
                color: "var(--text-color)",
              }}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 rounded"
            onClick={onClose}
            style={{
              backgroundColor: "#D9534F", // Cor do botão "Cancel"
              color: "var(--text-color)",
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded"
            onClick={handleSave} // Chama a função handleSave ao clicar em "Save"
            style={{
              backgroundColor: "#5CB85C", // Cor do botão "Save"
              color: "var(--text-color)",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="container-bg w-full max-w-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-color)" }}>
          Edit User
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            value={editedUser.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Name"
            className="w-full p-2 rounded"
            style={{
              backgroundColor: "var(--table-header-bg)",
              color: "var(--text-color)",
            }}
          />
          <input
            type="text"
            value={editedUser.rm}
            onChange={(e) => handleChange("rm", e.target.value)}
            placeholder="RM"
            className="w-full p-2 rounded"
            style={{
              backgroundColor: "var(--table-header-bg)",
              color: "var(--text-color)",
            }}
          />
          <input
            type="text"
            value={editedUser.cpf}
            onChange={(e) => handleChange("cpf", e.target.value)}
            placeholder="CPF"
            className="w-full p-2 rounded"
            style={{
              backgroundColor: "var(--table-header-bg)",
              color: "var(--text-color)",
            }}
          />
          <input
            type="text"
            value={editedUser.rg}
            onChange={(e) => handleChange("rg", e.target.value)}
            placeholder="RG"
            className="w-full p-2 rounded"
            style={{
              backgroundColor: "var(--table-header-bg)",
              color: "var(--text-color)",
            }}
          />
          <input
            type="text"
            value={editedUser.profession}
            onChange={(e) => handleChange("profession", e.target.value)}
            placeholder="Profession"
            className="w-full p-2 rounded"
            style={{
              backgroundColor: "var(--table-header-bg)",
              color: "var(--text-color)",
            }}
          />
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
            onClick={() => onSave(editedUser)}
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

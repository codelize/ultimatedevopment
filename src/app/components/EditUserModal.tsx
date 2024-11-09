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
        <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-white mb-4">Edit User</h2>
            <div className="space-y-4">
            <input
                type="text"
                value={editedUser.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Name"
                className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
                type="text"
                value={editedUser.rm}
                onChange={(e) => handleChange("rm", e.target.value)}
                placeholder="RM"
                className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
                type="text"
                value={editedUser.cpf}
                onChange={(e) => handleChange("cpf", e.target.value)}
                placeholder="CPF"
                className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
                type="text"
                value={editedUser.rg}
                onChange={(e) => handleChange("rg", e.target.value)}
                placeholder="RG"
                className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
                type="text"
                value={editedUser.profession}
                onChange={(e) => handleChange("profession", e.target.value)}
                placeholder="Profession"
                className="w-full p-2 rounded bg-gray-700 text-white"
            />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
            <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={onClose}
            >
                Cancel
            </button>
            <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => onSave(editedUser)}
            >
                Save
            </button>
            </div>
        </div>
        </div>
    );
    };

    export default EditUserModal;

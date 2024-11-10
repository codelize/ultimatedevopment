"use client";

import { useState, useRef } from "react";
import '../styles/globals.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    rm: "",
    cpf: "",
    rg: "",
    profession: "",
    image: null,
  });
  const [fileName, setFileName] = useState("Nenhum arquivo selecionado.");
  const fileInputRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
    setFileName(file ? file.name : "Nenhum arquivo selecionado.");
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulário enviado:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-page">
      <div className="w-full max-w-lg container-bg p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-color mb-4">User Registration</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-color mb-1">ID:</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              placeholder="Enter ID "
              className="form-input input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-color mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name "
              className="form-input input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-color mb-1">RM:</label>
            <input
              type="text"
              name="rm"
              value={formData.rm}
              onChange={handleInputChange}
              placeholder="Enter RM "
              className="form-input input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-color mb-1">CPF:</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              placeholder="Enter CPF "
              className="form-input input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-color mb-1">RG:</label>
            <input
              type="text"
              name="rg"
              value={formData.rg}
              onChange={handleInputChange}
              placeholder="Enter RG "
              className="form-input input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-color mb-1">Profession:</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              placeholder="Enter Profession "
              className="form-input input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-color mb-1">Image:</label>
            <div className="input-file-group">
              <button
                type="button"
                onClick={handleFileUpload}
                className="input-file-button"
              >
                Procurar...
              </button>
              <input
                type="text"
                value={fileName}
                readOnly
                className="input-file-text"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          <button
            type="submit"
            className="button-primary"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-secondary mt-3">
          Already have an account?{" "}
          <a href="/login" className="link">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import '../styles/globals.css';

// Dados iniciais do formulário
const initialFormData = {
  id: "",
  name: "",
  rm: "",
  cpf: "",
  rg: "",
  profession: "",
  image: null,
};

export default function RegisterPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [fileName, setFileName] = useState("Nenhum arquivo selecionado.");
  const [errors, setErrors] = useState({}); // Estado para mensagens de erro
  const [formSubmitted, setFormSubmitted] = useState(false); // Estado para controle de submissão
  const fileInputRef = useRef(null);

  // Manipulador de mudanças nos campos de texto
  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (formSubmitted) validateForm({ ...formData, [name]: value });
  };

  // Manipulador de seleção de arquivo de imagem
  const handleFileChange = ({ target: { files } }) => {
    const file = files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
    setFileName(file ? file.name : "Nenhum arquivo selecionado.");
  };

  // Ação para abrir o seletor de arquivos
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Validação dos campos obrigatórios e retorno das mensagens de erro
  const validateForm = (data) => {
    const { id, name, rm, cpf, rg, profession } = data;
    const newErrors = {};

    if (!id) newErrors.id = "ID é obrigatório";
    if (!name) newErrors.name = "Nome é obrigatório";
    if (!rm) newErrors.rm = "RM é obrigatório";
    if (!cpf) newErrors.cpf = "CPF é obrigatório";
    if (!rg) newErrors.rg = "RG é obrigatório";
    if (!profession) newErrors.profession = "Profissão é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!validateForm(formData)) return;

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Usuário registrado com sucesso!");
        window.location.href = "/login";
      } else {
        alert("Erro ao registrar usuário. Verifique os dados.");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("Erro ao registrar usuário.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-page">
      <div className="w-full max-w-lg container-bg p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-color mb-4">User Registration</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {renderInput("ID", "id", formData.id, handleInputChange, errors.id, formSubmitted)}
          {renderInput("Name", "name", formData.name, handleInputChange, errors.name, formSubmitted)}
          {renderInput("RM", "rm", formData.rm, handleInputChange, errors.rm, formSubmitted)}
          {renderInput("CPF", "cpf", formData.cpf, handleInputChange, errors.cpf, formSubmitted)}
          {renderInput("RG", "rg", formData.rg, handleInputChange, errors.rg, formSubmitted)}
          {renderInput("Profession", "profession", formData.profession, handleInputChange, errors.profession, formSubmitted)}
          {renderFileInput(fileName, handleFileUpload, handleFileChange, fileInputRef)}
          <button type="submit" className="button-primary">Register</button>
        </form>
        <LoginRedirect />
      </div>
    </div>
  );
}

// Função para renderizar um campo de entrada com etiqueta e mensagem de erro
function renderInput(label, name, value, onChange, error, formSubmitted) {
  return (
    <div>
      <label className="block text-sm font-medium text-color mb-1">{label}:</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`   Enter ${label}`} // Adiciona espaços extras no início do placeholder
        className="form-input input-field"
      />
      {formSubmitted && error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// Função para renderizar o seletor de arquivo com botão
function renderFileInput(fileName, handleFileUpload, handleFileChange, fileInputRef) {
  return (
    <div>
      <label className="block text-sm font-medium text-color mb-1">Image:</label>
      <div className="input-file-group">
        <button type="button" onClick={handleFileUpload} className="input-file-button">
          Procurar...
        </button>
        <input type="text" value={fileName} readOnly className="input-file-text" />
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
      </div>
    </div>
  );
}

// Componente de redirecionamento para o login
function LoginRedirect() {
  return (
    <p className="text-sm text-center text-secondary mt-3">
      Already have an account? <a href="/login" className="link">Log in</a>
    </p>
  );
}

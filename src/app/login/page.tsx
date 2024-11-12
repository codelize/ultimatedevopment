"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import '../styles/globals.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Credenciais mocadas
    const mockUsername = "admin";
    const mockPassword = "123456";

    if (formData.username === mockUsername && formData.password === mockPassword) {
      // Salva o token de autenticação no localStorage
      localStorage.setItem("authToken", "authenticated");

      // Redireciona para a página de User Management
      router.push("/user-management");
    } else {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-page">
      <div className="w-full max-w-md container-bg p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-color mb-4">User Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-color mb-1">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="   Enter Username"
              className="form-input input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-color mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="   Enter Password"
              className="form-input input-field"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="button-primary w-full"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-secondary mt-3">
        Want to add a user?{" "}
          <a href="/register" className="link">
          Click here
          </a>
        </p>
      </div>
    </div>
  );
}

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();

  const isAuthTokenValid = (token: string) => {
    // Adicione lógica de validação de token aqui
    return true;
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken || !isAuthTokenValid(authToken)) {
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
      router.push("/login");
    }
  }, [router]);

  return isAuthenticated;
}

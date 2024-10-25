import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  id: string;
  email: string;
  // Puedes agregar más campos según tus necesidades
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Inicializamos el estado basado en el almacenamiento local
    const token = localStorage.getItem("authToken");
    return !!token;
  });
  const [user, setUser] = useState<User | null>(() => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  });

  useEffect(() => {
    // Configuramos el token en las cabeceras de Axios si existe
    const token = localStorage.getItem("authToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Guardamos el token y los datos del usuario en localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(user));

      // Configuramos el token en las cabeceras de Axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setIsAuthenticated(true);
      setUser(user);
    } catch (error) {
      // Manejo de errores
      console.error("Error al iniciar sesión:", error);
      throw error; // Propagar el error para que pueda ser manejado en el componente que llama
    }
  };

  const logout = () => {
    // Eliminamos el token y los datos del usuario de localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    // Eliminamos el token de las cabeceras de Axios
    delete axios.defaults.headers.common["Authorization"];

    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

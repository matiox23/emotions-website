import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTie,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tipo_usuario, settipo_usuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailExists, setEmailExists] = useState(false); // Estado para mostrar el mensaje

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const userRegister = () => {
    if (email.length === 0) {
      alert("Email en Blanco");
    } else if (password.length === 0) {
      alert("Contraseña en Blanco");
    } else {
      axios
        .post("http://localhost:5000/api/users", {
          correo: email,
          nombre: name,
          password: password,
          tipo_usuario: tipo_usuario,
        })
        .then((response) => {
          console.log(response);
          const route = tipo_usuario === "profesor" ? "/home" : "/exam";
          navigate(route, { state: { message: "Inicio de sesión exitoso" } });
          setEmailExists(false); // Restablece el mensaje de error si el registro es exitoso
        })
        .catch((error) => {
          console.log(error, "error");
          if (error.response && error.response.status === 409) {
            setEmailExists(true); // Muestra el mensaje de error si el correo ya existe
          } else {
            alert("Correo ya registrado.");
          }
        });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Registro de Usuarios
        </h2>
        <form
          onSubmit={handleRegister}
          className="space-y-6 h-full flex flex-col justify-center"
        >
          <div>
            <label className="mb-1 font-medium text-gray-700 flex items-center gap-2">
              <FaUser /> Nombre
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 font-medium text-gray-700 flex items-center gap-2">
              <FaEnvelope /> Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700"
              value={email}
              placeholder="correo@ejemplo.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 font-medium text-gray-700 flex items-center gap-2">
              <FaLock /> Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 p-3 bg-gray-50 bg-opacity-50"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="tipo_usuario"
              className="text-gray-700 font-medium flex items-center gap-2"
            >
              <FaUserTie /> Tipo de Usuario
            </Label>
            <Select onValueChange={settipo_usuario} value={tipo_usuario}>
              <SelectTrigger className="bg-gray-50 text-gray-700 w-full rounded-lg">
                <SelectValue placeholder="Selecciona el tipo de usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="estudiante">Estudiante</SelectItem>
                <SelectItem value="profesor">Profesor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-800 transition-colors"
            onClick={userRegister}
          >
            Registrarse
          </motion.button>

          {emailExists && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-red-500 text-center mt-4"
            >
              El correo ya está registrado.
            </motion.div>
          )}

          <p className="mt-4 text-gray-600 text-center">
            ¿Ya tienes una cuenta?{" "}
            <a className="text-blue-700 hover:underline" href="./login">
              Iniciar Sesión
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;

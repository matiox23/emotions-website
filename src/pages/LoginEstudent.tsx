// src/pages/Register.tsx
import { register } from "module";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userRegister = () => {
    if (email.length === 0) {
      alert("Email en Blanco");
    } else if (password.length === 0) {
      alert("Contraseña en Blanco");
    } else if (tipoUsuario === "profesor") {
      axios
        .post("http://localhost:5000/signup", {
          email: email,
          name: name,
          password: password,
          tipoUsuario: tipoUsuario,
        })
        .then(function (response) {
          console.log(response);
          navigate("/home", { state: { message: "Inicio de sesión exitoso" } });
        })
        .catch(function (error) {
          console.log(error, "error");
          if (error.response.status === 401) {
            alert("Email o Contraseña incorrectos");
          }
        });
    } else {
      axios
        .post("http://localhost:5000/signup", {
          email: email,
          name: name,
          password: password,
          tipoUsuario: tipoUsuario,
        })
        .then(function (response) {
          console.log(response);
          navigate("/exam", { state: { message: "Inicio de sesión exitoso" } });
        })
        .catch(function (error) {
          console.log(error, "error");
          if (error.response.status === 401) {
            alert("Email o Contraseña incorrectos");
          }
        });
    }
  };



  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar los datos al backend
    //navigate("/login");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-900">
      <div className="w-full  max-w-md bg-white p-6 rounded-2xl	">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Registro de Estudiantes
        </h2>
        <form
          onSubmit={handleRegister}
          className="space-y-4 h-full flex flex-col justify-center"
        >
          <div>
            <label className="block mb-1 font-medium text-black">Nombre</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 bg-gray-100 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-black">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500  bg-gray-100 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-black">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500  bg-gray-100 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipoUsuario" className="text-black font-medium ">
              Tipo de Usuario
            </Label>
            <Select onValueChange={setTipoUsuario} value={tipoUsuario}>
              <SelectTrigger className="bg-gray-100 text-black">
                <SelectValue placeholder="Selecciona el tipo de usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="estudiante">Estudiante</SelectItem>
                <SelectItem value="profesor">Profesor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
            onClick={userRegister}
          >
            Registrarse
          </button>
          <p className="mt-4 t text-black flex justify-around">
            ¿Ya tienes una cuenta?{" "}
            <a className="text-blue-600 hover:underline  ">Iniciar Sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

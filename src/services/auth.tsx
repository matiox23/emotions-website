interface LoginCredentials {
  correo: string;
  password: string;
  tipo_usuario: string;
}

interface LoginResponse {
  correo: string;
  id: number;
  nombre: string;
  tipo_usuario: string;
}

export async function loginUser(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  console.log("Enviando credenciales de inicio de sesión:", credentials); // Log para ver los datos enviados

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  if (!response.ok) {
    throw new Error("Error en el inicio de sesión");
  }

  const data = await response.json();
  return data;
}

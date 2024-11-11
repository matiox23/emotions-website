import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Clock, Menu, PenTool } from "lucide-react";

const App: React.FC = () => {
  const navigate = useNavigate();

  const register = () => {
    navigate("/register");
  };

  const login = () => {
    navigate("login");
  };
  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-800 w-full">
        <a className="flex items-center justify-center" href="#">
          <PenTool className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">FaceNet</span>
        </a>
        {/* <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:text-primary" href="#">
            Inicio
          </a>
          <a className="text-sm font-medium hover:text-primary" href="#">
            Características
          </a>
          <a className="text-sm font-medium hover:text-primary" href="#">
            Precios
          </a>
          <a className="text-sm font-medium hover:text-primary" href="#">
            Contacto
          </a>
        </nav> */}
        <div className="ml-auto flex gap-2">
          <Button variant="outline" onClick={register}>
            Registrarse
          </Button>
          <Button onClick={login}>Iniciar Sesión</Button>
        </div>
        <Button className="md:hidden ml-2" size="icon" variant="outline">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </header>
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50 dark:bg-gray-800">
          <div className="px-4 md:px-6 w-full">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Bienvenido a FaceNet
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  La plataforma líder en exámenes virtuales. Evalúa
                  conocimientos de forma segura y eficiente.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Comenzar ahora</Button>
                <Button variant="outline">Ver demo</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="px-4 md:px-6 w-full">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Características principales
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <CheckCircle className="h-8 w-8 mb-2 text-primary" />
                <h3 className="text-xl font-bold">Evaluación precisa</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Evalúa conocimientos con preguntas adaptativas y resultados
                  instantáneos.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <Clock className="h-8 w-8 mb-2 text-primary" />
                <h3 className="text-xl font-bold">Control de tiempo</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Gestiona la duración de los exámenes y establece límites de
                  tiempo por pregunta.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <BookOpen className="h-8 w-8 mb-2 text-primary" />
                <h3 className="text-xl font-bold">Variedad de formatos</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Crea exámenes con múltiples tipos de preguntas: opción
                  múltiple, verdadero/falso, ensayo, etc.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="px-4 md:px-6 w-full">
            <div className="grid gap-10 px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  ¿Por qué elegir FaceNet?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  FaceNet ofrece una experiencia de evaluación virtual sin
                  igual, combinando tecnología avanzada con facilidad de uso
                  para educadores y estudiantes por igual.
                </p>
              </div>
              <div className="space-y-4">
                <ul className="grid gap-4">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Interfaz intuitiva y fácil de usar</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Seguridad avanzada para prevenir trampas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Análisis detallado de resultados</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Compatibilidad con múltiples dispositivos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Soporte técnico 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 FaceNet. Todos los derechos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Términos de servicio
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Política de privacidad
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default App;

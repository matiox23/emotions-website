"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import {
  Users,
  ClipboardList,
  Bell,
  User,
  LayoutDashboard,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface Student {
  id: string;
  name: string;
  gender: "male" | "female";
  dominantEmotion: string;
}

interface Evaluation {
  studentId: string;
  emotionReport: { [key: string]: number };
  cameraActiveTime: number;
  faceNotDetectedIntervals: { start: number; end: number }[];
  examCompletionTime: number;
}

interface Notification {
  id: string;
  message: string;
  timestamp: number;
}

const mockStudents: Student[] = [
  { id: "1", name: "Juan Pérez", gender: "male", dominantEmotion: "Neutral" },
  { id: "2", name: "María García", gender: "female", dominantEmotion: "Happy" },
  {
    id: "3",
    name: "Carlos Rodríguez",
    gender: "male",
    dominantEmotion: "Surprised",
  },
  {
    id: "4",
    name: "Ana Martínez",
    gender: "female",
    dominantEmotion: "Neutral",
  },
];

const mockEvaluations: Evaluation[] = [
  {
    studentId: "1",
    emotionReport: { Neutral: 60, Happy: 20, Surprised: 20 },
    cameraActiveTime: 3600,
    faceNotDetectedIntervals: [{ start: 120, end: 180 }],
    examCompletionTime: 3540,
  },
  {
    studentId: "2",
    emotionReport: { Happy: 70, Neutral: 20, Surprised: 10 },
    cameraActiveTime: 3550,
    faceNotDetectedIntervals: [{ start: 200, end: 230 }],
    examCompletionTime: 3500,
  },
];

const mockNotifications: Notification[] = [
  {
    id: "1",
    message: "Juan Pérez se ha registrado",
    timestamp: Date.now() - 300000,
  },
  {
    id: "2",
    message: "María García ha terminado el examen",
    timestamp: Date.now() - 120000,
  },
  {
    id: "3",
    message: "Nuevo examen programado para mañana",
    timestamp: Date.now() - 60000,
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.message) {
      //alert(location.state.message); // Muestra el mensaje de inicio de sesión exitoso
    }
  }, [location]);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalStudents = mockStudents.length;
  const maleStudents = mockStudents.filter((s) => s.gender === "male").length;
  const femaleStudents = totalStudents - maleStudents;
  const dominantEmotions = mockStudents.map((s) => s.dominantEmotion);
  const mostRelevantEmotion = dominantEmotions
    .sort(
      (a, b) =>
        dominantEmotions.filter((v) => v === a).length -
        dominantEmotions.filter((v) => v === b).length
    )
    .pop();

  const emotionData = {
    Angry: 5,
    Sad: 10,
    Neutral: 50,
    Happy: 25,
    Surprised: 10,
  };

  const handleLogout = () => {
    // Eliminar tokens o datos de autenticación almacenados
    localStorage.removeItem("authToken"); // Si usas localStorage
    sessionStorage.removeItem("authToken"); // Si usas sessionStorage

    // Si utilizas un contexto de autenticación, llama a la función de logout
    // Por ejemplo:
    // authContext.logout();

    // Redireccionar al usuario a la página de inicio de sesión
    navigate("/login");

    // Cerrar el menú lateral si está abierto en dispositivos móviles
    closeSidebarIfMobile();
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeSidebarIfMobile = () => {
    if (windowWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col justify-center	h-screen w-screen bg-gray-100 lg:flex-row c">
      <Button
        variant="ghost"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-blue-600 text-white p-6 overflow-y-auto transition-transform duration-300 ease-in-out`}
      >
        <nav className="space-y-8">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("dashboard");
              closeSidebarIfMobile();
            }}
          >
            <LayoutDashboard className="mr-2 h-4 w-4 " />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("students");
              closeSidebarIfMobile();
            }}
          >
            <Users className="mr-2 h-4 w-4" />
            Estudiantes
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("evaluation");
              closeSidebarIfMobile();
            }}
          >
            <ClipboardList className="mr-2 h-4 w-4" />
            Evaluación
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("notifications");
              closeSidebarIfMobile();
            }}
          >
            <Bell className="mr-2 h-4 w-4" />
            Notificaciones
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setActiveTab("admin");
              closeSidebarIfMobile();
            }}
          >
            <User className="mr-2 h-4 w-4" />
            Administrador
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-6 overflow-auto  ">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsContent value="dashboard">
            <h2 className="text-2xl font-bold mb-6 color text-sky-400 flex justify-center">
              Dashboard
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total estudiantes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStudents}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hombres</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{maleStudents}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mujeres</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{femaleStudents}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Emoción más relevante
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mostRelevantEmotion}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Población</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Hombres", value: maleStudents },
                          { name: "Mujeres", value: femaleStudents },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        <Cell fill="#3b82f6" />
                        <Cell fill="#ec4899" />
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Emoción Destacada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(emotionData).map(([emotion, value]) => (
                      <div key={emotion} className="flex items-center">
                        <span className="w-20 text-sm">{emotion}</span>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600"
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                        <span className="w-12 text-right text-sm">
                          {value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <h2 className="text-2xl font-bold mb-6">Estudiantes</h2>
            <Card>
              <CardContent className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2">ID</th>
                      <th className="text-left p-2">Nombre Completo</th>
                      <th className="text-left p-2">Género</th>
                      <th className="text-left p-2">Emoción Destacada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="p-2">{student.id}</td>
                        <td className="p-2">{student.name}</td>
                        <td className="p-2">
                          {student.gender === "male" ? "Hombre" : "Mujer"}
                        </td>
                        <td className="p-2">{student.dominantEmotion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluation">
            <h2 className="text-2xl font-bold mb-6">Evaluación</h2>
            {mockEvaluations.map((evaluation) => (
              <Card key={evaluation.studentId} className="mb-6">
                <CardHeader>
                  <CardTitle>Estudiante ID: {evaluation.studentId}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-bold mb-2">Reporte de Emociones:</h3>
                  <ul className="list-disc list-inside mb-4">
                    {Object.entries(evaluation.emotionReport).map(
                      ([emotion, percentage]) => (
                        <li key={emotion}>
                          {emotion}: {percentage}%
                        </li>
                      )
                    )}
                  </ul>
                  <p className="mb-4">
                    Tiempo de cámara activa: {evaluation.cameraActiveTime}{" "}
                    segundos
                  </p>
                  <h3 className="font-bold mb-2">
                    Intervalos sin detección de rostro:
                  </h3>
                  <ul className="list-disc list-inside mb-4">
                    {evaluation.faceNotDetectedIntervals.map(
                      (interval, index) => (
                        <li key={index}>
                          Desde {interval.start} hasta {interval.end} segundos
                        </li>
                      )
                    )}
                  </ul>
                  <p>
                    Tiempo de finalización del examen:{" "}
                    {evaluation.examCompletionTime} segundos
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="notifications">
            <h2 className="text-2xl font-bold mb-6 text-customBlue">
              Notificaciones
            </h2>
            <Card>
              <CardContent>
                <ul className="space-y-4">
                  {mockNotifications.map((notification) => (
                    <li
                      key={notification.id}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-2"
                    >
                      <span className="mb-1 sm:mb-0">
                        {notification.message}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <h2 className="text-2xl font-bold mb-6 text-customBlue">
              Administrador
            </h2>
            <Card>
              <CardContent>
                <p>
                  Configuración del administrador y opciones avanzadas irían
                  aquí.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

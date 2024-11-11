import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import axios from "axios";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type StudentNotification = {
  id: number;
  nombre: string;
  correo: string;
  tipo_usuario: string;
  timestamp: number;
};

export default function NotificationsTab() {
  const [notifications, setNotifications] = useState<StudentNotification[]>([]);

  useEffect(() => {
    // Función para obtener registros de estudiantes
    const fetchStudentRegistrations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/students"
        );
        const students = response.data;

        // Filtrar solo los estudiantes y estructurar las notificaciones
        const studentNotifications = students
          .filter((student: any) => student.tipo_usuario === "estudiante")
          .map((student: any) => ({
            id: student.id,
            nombre: student.nombre,
            correo: student.correo,
            tipo_usuario: student.tipo_usuario,
            timestamp: new Date().getTime(), // Usa la hora actual como timestamp de ejemplo
          }));

        setNotifications(studentNotifications);
      } catch (error) {
        console.error("Error fetching student registrations:", error);
      }
    };

    // Llama a la función para obtener los registros de estudiantes al cargar el componente
    fetchStudentRegistrations();
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
      className="space-y-6"
    >
      <motion.h2
        className="text-2xl font-bold mb-6 text-customBlue"
        variants={cardVariants}
      >
        Notificaciones de Registro de Estudiantes
      </motion.h2>
      <motion.div variants={cardVariants}>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent>
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <motion.li
                  key={notification.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex flex-col border-b pb-2 transition-transform duration-300"
                >
                  <div>
                    <strong>Correo:</strong> {notification.correo}
                  </div>
                  <div>
                    <strong>ID:</strong> {notification.id}
                  </div>
                  <div>
                    <strong>Nombre:</strong> {notification.nombre}
                  </div>
                  <div>
                    <strong>Tipo de Usuario:</strong>{" "}
                    {notification.tipo_usuario}
                  </div>
                  <div className="text-sm text-gray-500">
                    <strong>Hora de Registro:</strong>{" "}
                    {new Date(notification.timestamp).toLocaleString()}
                  </div>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

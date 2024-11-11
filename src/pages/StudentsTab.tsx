import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import axios from "axios";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type Student = {
  id: number;
  nombre: string;
  correo: string;
  tipo_usuario: string;
};

export default function StudentsTab() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Fetch students data from API
    axios
      .get("http://localhost:5000/api/users/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
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
        Estudiantes Registrados
      </motion.h2>
      <motion.div variants={cardVariants}>
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardContent className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">Nombre Completo</th>
                  <th className="text-left p-2">Correo Electrónico</th>
                  <th className="text-left p-2">Tipo de Usuario</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <motion.tr
                    key={student.id}
                    whileHover={{ scale: 1.02 }}
                    className="transition-transform duration-300"
                  >
                    <td className="p-2">{student.id}</td>
                    <td className="p-2">{student.nombre}</td>
                    <td className="p-2">{student.correo}</td>
                    <td className="p-2 text-blue-600">
                      {student.tipo_usuario === "estudiante"
                        ? "Estudiante"
                        : "Profesor"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

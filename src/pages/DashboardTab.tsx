import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PieChartCard from "./PieChartCard";
import EmotionChartCard from "./EmotionChartCard";
import { motion } from "framer-motion";

const mockStudents = [
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

const emotionData = [
  { emotion: "Angry", value: 5 },
  { emotion: "Sad", value: 10 },
  { emotion: "Neutral", value: 50 },
  { emotion: "Happy", value: 25 },
  { emotion: "Surprised", value: 10 },
];

// Variantes de animación para Framer Motion
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardTab() {
  const totalStudents = mockStudents.length;
  const maleStudents = mockStudents.filter((s) => s.gender === "male").length;
  const femaleStudents = totalStudents - maleStudents;
  const mostRelevantEmotion = "Neutral"; // Cambia según la lógica de cálculo

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      {/* Estadísticas de estudiantes con animación y efecto hover */}
      {[
        { title: "Total estudiantes", value: totalStudents },
        { title: "Hombres", value: maleStudents },
        { title: "Mujeres", value: femaleStudents },
        { title: "Emoción más relevante", value: mostRelevantEmotion },
      ].map((stat, index) => (
        <motion.div key={index} variants={cardVariants}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Gráfico de población */}
      <motion.div variants={cardVariants}>
        <PieChartCard
          maleStudents={maleStudents}
          femaleStudents={femaleStudents}
        />
      </motion.div>

      {/* Gráfico de emociones destacadas */}
      <motion.div variants={cardVariants}>
        <EmotionChartCard data={emotionData} />
      </motion.div>

      {/* Reporte de emociones por estudiante con efecto hover */}
      <motion.div variants={cardVariants} className="col-span-1 lg:col-span-2">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Reporte de Emociones por Estudiante</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockStudents.map((student) => (
                <motion.li
                  key={student.id}
                  whileHover={{ scale: 1.05 }}
                  className="flex justify-between p-2 rounded-md transition-colors duration-300 hover:bg-blue-50"
                >
                  <span className="font-medium">{student.name}</span>
                  <span className="text-blue-600">
                    {student.dominantEmotion}
                  </span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

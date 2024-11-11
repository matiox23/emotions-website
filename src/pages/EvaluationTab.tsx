import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { motion } from "framer-motion";

const mockEvaluations = [
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function EvaluationTab() {
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
        Evaluación
      </motion.h2>
      {mockEvaluations.map((evaluation) => (
        <motion.div key={evaluation.studentId} variants={cardVariants}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
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
                Tiempo de cámara activa: {evaluation.cameraActiveTime} segundos
              </p>
              <h3 className="font-bold mb-2">
                Intervalos sin detección de rostro:
              </h3>
              <ul className="list-disc list-inside mb-4">
                {evaluation.faceNotDetectedIntervals.map((interval, index) => (
                  <li key={index}>
                    Desde {interval.start} hasta {interval.end} segundos
                  </li>
                ))}
              </ul>
              <p>
                Tiempo de finalización del examen:{" "}
                {evaluation.examCompletionTime} segundos
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

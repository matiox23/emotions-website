"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CameraComponent from "./CameraComponent";
import EmotionDetection from "./EmotionDetection";
import QuestionComponent from "./QuestionComponent";
import ResultComponent from "./ResultComponent";

interface Emotion {
  name: string;
  value: number;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const emotionsData: Emotion[] = [
  // Tus emociones aquí...
];

const questionsData: Question[] = [
  {
    id: 1,
    text: "¿Cuál es el propósito principal de la Arquitectura Empresarial?",
    options: [
      "Aumentar las ventas de la empresa",
      "Alinear la estrategia de negocio con la infraestructura de TI",
      "Reducir los costos operativos",
      "Mejorar la satisfacción del cliente",
    ],
    correctAnswer: 1,
  },
  // Agrega más preguntas aquí...
];

export default function ExamInterface() {
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [currentEmotions, setCurrentEmotions] =
    useState<Emotion[]>(emotionsData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    new Array(questionsData.length).fill(-1)
  );
  const [score, setScore] = useState(0);
  const [detectionStatus, setDetectionStatus] = useState<string>(
    "Iniciando detección..."
  );
  const [error, setError] = useState<string | null>(null);

  // Nuevo estado para rastrear si el usuario ha salido de la pestaña
  const [hasUserLeft, setHasUserLeft] = useState(false);

  // Simular detección de emociones cada vez que se detecta un rostro
  useEffect(() => {
    if (isFaceDetected) {
      const simulatedEmotions = emotionsData.map((emotion) => ({
        ...emotion,
        value: Math.random() * 100,
      }));
      setCurrentEmotions(simulatedEmotions);
    }
  }, [isFaceDetected]);

  // Agregar listener para detectar cambio de pestaña
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // La página se ha vuelto invisible
        if (isExamStarted && !isExamFinished) {
          setHasUserLeft(true);
          alert("Has abandonado la pestaña durante el examen.");
          // Aquí puedes agregar lógica adicional, como finalizar el examen o registrar el evento
        }
      } else {
        // La página se ha vuelto visible nuevamente
        if (isExamStarted && hasUserLeft) {
          // Si deseas hacer algo cuando el usuario regresa
          console.log("El usuario ha regresado a la pestaña.");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Limpiar el listener al desmontar el componente
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isExamStarted, isExamFinished, hasUserLeft]);

  const startExam = () => {
    if (isFaceDetected) {
      setIsExamStarted(true);
    } else {
      setError(
        "No se detecta un rostro. Por favor, asegúrese de que su rostro es visible antes de iniciar el examen."
      );
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = parseInt(value);
      return newAnswers;
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const submitExam = () => {
    const calculatedScore = answers.reduce((acc, answer, index) => {
      return answer === questionsData[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    setScore(calculatedScore);
    setIsExamFinished(true);
  };

  const retryExam = () => {
    window.location.reload();
  };

  if (isExamFinished) {
    return (
      <ResultComponent
        score={score}
        totalQuestions={questionsData.length}
        onRetry={retryExam}
      />
    );
  } else if (isExamStarted) {
    if (hasUserLeft) {
      // Mostrar mensaje o finalizar el examen si el usuario ha salido
      return (
        <div className="flex items-center justify-center w-screen h-screen bg-blue-900">
          <Card className="w-5/6 bg-slate-100">
            <CardHeader>
              <CardTitle>Examen Finalizado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-500">
                Has abandonado la pestaña durante el examen. Tu examen ha sido
                finalizado automáticamente.
              </p>
              <Button
                onClick={retryExam}
                className="mt-4 bg-gray-500 hover:bg-gray-600 text-white"
              >
                Volver a Intentar
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="w-screen h-screen flex items-center justify-center bg-blue-900">
        <Card className="w-full max-w-5xl mx-auto">
          <CardHeader>
            <CardTitle>Examen de Arquitectura Empresarial</CardTitle>
            <CardDescription>
              Pregunta {currentQuestionIndex + 1} de {questionsData.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
              <div className="md:col-span-2 space-y-4">
                <QuestionComponent
                  question={questionsData[currentQuestionIndex]}
                  answer={answers[currentQuestionIndex]}
                  onAnswerChange={handleAnswerChange}
                />
              </div>
              <div className="space-y-4">
                <CameraComponent
                  onFaceDetected={setIsFaceDetected}
                  isFaceDetected={isFaceDetected}
                  detectionStatus={detectionStatus}
                  setDetectionStatus={setDetectionStatus}
                />
                <EmotionDetection emotions={currentEmotions} />
              </div>
            </div>
          </CardContent>
          <div className="flex justify-between p-4">
            <Button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            {currentQuestionIndex === questionsData.length - 1 ? (
              <Button
                onClick={submitExam}
                className="bg-green-600 hover:bg-green-700"
                disabled={answers[currentQuestionIndex] === -1}
              >
                Enviar Examen
              </Button>
            ) : (
              <Button
                onClick={goToNextQuestion}
                disabled={answers[currentQuestionIndex] === -1}
              >
                Siguiente <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-blue-900">
        <Card className="w-5/6 bg-slate-100">
          <CardHeader>
            <CardTitle>Examen de Arquitectura Empresarial</CardTitle>
            <CardDescription className="text-slate-950">
              Asegúrese de que su rostro sea visible para iniciar el examen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CameraComponent
                onFaceDetected={setIsFaceDetected}
                isFaceDetected={isFaceDetected}
                detectionStatus={detectionStatus}
                setDetectionStatus={setDetectionStatus}
              />
              <EmotionDetection emotions={currentEmotions} />
            </div>
            <div className="mt-8 text-center">
              <p className="mb-4">
                Una vez que se detecte su rostro, podrá iniciar el examen.
              </p>
              <Button
                onClick={startExam}
                disabled={!isFaceDetected}
                className="w-full max-w-xs bg-gray-500 hover:bg-gray-600 text-white"
              >
                Iniciar Examen
              </Button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

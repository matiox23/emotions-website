import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ResultComponentProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

export default function ResultComponent({
  score,
  totalQuestions,
  onRetry,
}: ResultComponentProps) {
  const passingScore = Math.ceil(totalQuestions * 0.6);
  const passed = score >= passingScore;

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-blue-900">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Resultados del Examen</CardTitle>
          <CardDescription>
            Examen de Arquitectura Empresarial
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            {passed
              ? "¡Felicidades! Has aprobado el examen."
              : "Lo siento, no has aprobado el examen."}
          </h2>
          <p className="text-xl mb-8">
            Tu puntaje: {score} de {totalQuestions}
          </p>
          <Progress
            value={(score / totalQuestions) * 100}
            className="h-4 mb-4"
          />
          <p className="text-lg">
            {passed
              ? "Has demostrado un buen entendimiento de la Arquitectura Empresarial."
              : "Te recomendamos repasar los conceptos de Arquitectura Empresarial y volver a intentar el examen."}
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={onRetry} className="mt-4">
            Volver al Inicio
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

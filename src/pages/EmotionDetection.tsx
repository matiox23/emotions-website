import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Emotion {
  name: string;
  value: number;
}

interface EmotionDetectionProps {
  emotions: Emotion[];
}

export default function EmotionDetection({ emotions }: EmotionDetectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detección de Emociones</CardTitle>
      </CardHeader>
      <CardContent>
        {emotions.map((emotion) => (
          <div key={emotion.name} className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{emotion.name}</span>
              <span className="text-sm font-medium">
                {emotion.value.toFixed(0)}%
              </span>
            </div>
            <Progress value={emotion.value} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmotionData {
  emotion: string;
  value: number;
}

interface EmotionChartCardProps {
  data: EmotionData[];
}

export default function EmotionChartCard({ data }: EmotionChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emoción Destacada</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.map(({ emotion, value }) => (
            <div key={emotion} className="flex items-center">
              <span className="w-20 text-sm">{emotion}</span>
              <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
              <span className="w-12 text-right text-sm">{value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

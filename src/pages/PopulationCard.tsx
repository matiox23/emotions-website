import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PopulationCardProps {
  title: string;
  value: number | string;
}

export default function PopulationCard({ title, value }: PopulationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

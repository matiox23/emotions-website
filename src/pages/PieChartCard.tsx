import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface PieChartCardProps {
  maleStudents: number;
  femaleStudents: number;
}

export default function PieChartCard({ maleStudents, femaleStudents }: PieChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Población</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={[{ name: "Hombres", value: maleStudents }, { name: "Mujeres", value: femaleStudents }]} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              <Cell fill="#3b82f6" />
              <Cell fill="#ec4899" />
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

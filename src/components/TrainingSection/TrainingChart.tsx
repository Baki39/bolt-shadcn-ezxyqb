import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';

interface DataPoint {
  epoch: number;
  loss: number;
  accuracy: number;
  lipSync: number;
}

interface TrainingChartProps {
  data: DataPoint[];
}

export function TrainingChart({ data }: TrainingChartProps) {
  return (
    <Card className="p-4">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="epoch"
              label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis 
              label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
              domain={[0, 1]}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="loss"
              stroke="hsl(var(--chart-1))"
              name="Loss"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="hsl(var(--chart-2))"
              name="Accuracy"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="lipSync"
              stroke="hsl(var(--chart-3))"
              name="Lip Sync"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
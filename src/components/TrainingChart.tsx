import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface TrainingMetric {
  epoch: number;
  loss: number;
  accuracy: number;
}

interface TrainingChartProps {
  data: TrainingMetric[];
}

const defaultAxisProps = {
  stroke: 'hsl(var(--muted-foreground))',
  strokeWidth: 1,
  fontSize: 12,
  tickLine: false,
};

export function TrainingChart({ data }: TrainingChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--muted-foreground)/0.1)"
        />
        <XAxis
          {...defaultAxisProps}
          dataKey="epoch"
          label={{
            value: 'Epoch',
            position: 'bottom',
            offset: 0,
            style: { textAnchor: 'middle' },
          }}
        />
        <YAxis
          {...defaultAxisProps}
          yAxisId="left"
          label={{
            value: 'Loss',
            angle: -90,
            position: 'left',
            style: { textAnchor: 'middle' },
          }}
        />
        <YAxis
          {...defaultAxisProps}
          yAxisId="right"
          orientation="right"
          label={{
            value: 'Accuracy',
            angle: 90,
            position: 'right',
            style: { textAnchor: 'middle' },
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: 'var(--radius)',
          }}
        />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{
            paddingTop: '8px',
          }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="loss"
          name="Loss"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="accuracy"
          name="Accuracy"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
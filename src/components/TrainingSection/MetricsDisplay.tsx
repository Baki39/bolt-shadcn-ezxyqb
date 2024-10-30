import { Card } from '@/components/ui/card';

interface TrainingMetrics {
  epoch: number;
  loss: number;
  accuracy: number;
  lipSync: number;
  learningRate: number;
  batchesProcessed: number;
}

interface MetricsDisplayProps {
  metrics: TrainingMetrics;
}

export function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  const formatMetric = (value: number) => value.toFixed(4);

  return (
    <Card className="p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Current Epoch</p>
          <p className="text-2xl font-bold">{metrics.epoch}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Loss</p>
          <p className="text-2xl font-bold">{formatMetric(metrics.loss)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Accuracy</p>
          <p className="text-2xl font-bold">{formatMetric(metrics.accuracy)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Lip Sync Score</p>
          <p className="text-2xl font-bold">{formatMetric(metrics.lipSync)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Learning Rate</p>
          <p className="text-2xl font-bold">{formatMetric(metrics.learningRate)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Batches Processed</p>
          <p className="text-2xl font-bold">{metrics.batchesProcessed}</p>
        </div>
      </div>
    </Card>
  );
}
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause } from 'lucide-react';
import { TrainingChart } from './TrainingChart';

export function TrainingSection() {
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingMetrics] = useState([
    { epoch: 1, loss: 0.5, accuracy: 0.7 },
    { epoch: 2, loss: 0.4, accuracy: 0.8 },
    { epoch: 3, loss: 0.3, accuracy: 0.85 },
    { epoch: 4, loss: 0.25, accuracy: 0.9 },
    { epoch: 5, loss: 0.2, accuracy: 0.92 },
    { epoch: 6, loss: 0.18, accuracy: 0.94 },
    { epoch: 7, loss: 0.15, accuracy: 0.95 },
    { epoch: 8, loss: 0.12, accuracy: 0.96 },
  ]);

  const handleTraining = () => {
    if (trainingProgress >= 100) {
      setTrainingProgress(0);
      setIsTraining(false);
      return;
    }

    setIsTraining((prev) => !prev);
    if (!isTraining) {
      const interval = setInterval(() => {
        setTrainingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsTraining(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Training Progress</h2>
        <div className="text-sm text-muted-foreground">
          Progress: {trainingProgress}%
        </div>
      </div>
      <Progress value={trainingProgress} className="w-full" />
      <div className="h-[300px] w-full">
        <TrainingChart data={trainingMetrics} />
      </div>
      <Button onClick={handleTraining} className="w-full">
        {isTraining ? (
          <Pause className="w-4 h-4 mr-2" />
        ) : (
          <Play className="w-4 h-4 mr-2" />
        )}
        {trainingProgress >= 100
          ? 'Reset Training'
          : isTraining
          ? 'Pause Training'
          : 'Start Training'}
      </Button>
    </Card>
  );
}
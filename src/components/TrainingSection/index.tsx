import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { TrainingChart } from './TrainingChart';
import { TrainingControls } from './TrainingControls';
import { MetricsDisplay } from './MetricsDisplay';
import { useToast } from '@/components/ui/use-toast';

const initialMetrics = {
  epoch: 0,
  loss: 0,
  accuracy: 0,
  lipSync: 0,
  learningRate: 0.001,
  batchesProcessed: 0,
};

interface TrainingSectionProps {
  autoStart?: boolean;
  onTrainingStart?: () => void;
  onTrainingComplete?: (result: { url: string; name: string }) => void;
}

export function TrainingSection({ 
  autoStart = false, 
  onTrainingStart,
  onTrainingComplete 
}: TrainingSectionProps) {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState(initialMetrics);
  const [trainingData, setTrainingData] = useState<Array<any>>([]);
  const { toast } = useToast();

  // Watch for autoStart changes
  useEffect(() => {
    if (autoStart && !isTraining && progress === 0) {
      setIsTraining(true);
      onTrainingStart?.();
    }
  }, [autoStart, isTraining, progress, onTrainingStart]);

  // Handle training progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTraining) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 0.5;
          if (next >= 100) {
            setIsTraining(false);
            clearInterval(interval);
            // Generate mock processed video result
            onTrainingComplete?.({
              url: 'https://example.com/processed-video.mp4',
              name: 'processed-video.mp4'
            });
            toast({
              title: "Training Complete",
              description: "Your video has been processed successfully. Switching to output tab...",
            });
            return 100;
          }
          return next;
        });

        setMetrics((prev) => ({
          epoch: Math.floor(progress / 10),
          loss: Math.max(0.1, 1 - (progress / 100)),
          accuracy: Math.min(1, progress / 100),
          lipSync: Math.min(1, (progress / 100) * 0.9),
          learningRate: prev.learningRate * 0.999,
          batchesProcessed: prev.batchesProcessed + 1,
        }));

        setTrainingData((prev) => [
          ...prev,
          {
            epoch: Math.floor(progress / 10),
            loss: metrics.loss,
            accuracy: metrics.accuracy,
            lipSync: metrics.lipSync,
          },
        ]);
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTraining, progress, metrics, onTrainingComplete, toast]);

  const handleStart = () => setIsTraining(true);
  const handlePause = () => setIsTraining(false);
  const handleSave = () => {
    toast({
      title: "Checkpoint Saved",
      description: "Training checkpoint has been saved successfully.",
    });
  };
  const handleReset = () => {
    setIsTraining(false);
    setProgress(0);
    setMetrics(initialMetrics);
    setTrainingData([]);
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Model Training</h2>
      
      <TrainingControls
        onStart={handleStart}
        onPause={handlePause}
        onSave={handleSave}
        onReset={handleReset}
        isTraining={isTraining}
        progress={progress}
      />

      <MetricsDisplay metrics={metrics} />
      
      <TrainingChart data={trainingData} />
    </Card>
  );
}
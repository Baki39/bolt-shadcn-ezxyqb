import { useState } from 'react';
import { Play, Pause, Save, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

interface TrainingControlsProps {
  onStart: () => void;
  onPause: () => void;
  onSave: () => void;
  onReset: () => void;
  isTraining: boolean;
  progress: number;
}

export function TrainingControls({
  onStart,
  onPause,
  onSave,
  onReset,
  isTraining,
  progress
}: TrainingControlsProps) {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant={isTraining ? "secondary" : "default"}
          onClick={isTraining ? onPause : onStart}
        >
          {isTraining ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause Training
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Training
            </>
          )}
        </Button>
        <Button variant="outline" onClick={onSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Checkpoint
        </Button>
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Training Progress</span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        <Progress value={progress} />
      </div>
    </Card>
  );
}
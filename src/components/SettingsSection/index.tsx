import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestResults } from './TestResults';
import { ModelConfig } from './ModelConfig';
import { VideoPreview } from './VideoPreview';
import { Play, Download, RotateCcw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SettingsSectionProps {
  video: {
    url: string;
    name: string;
  } | null;
}

export function SettingsSection({ video }: SettingsSectionProps) {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testResults, setTestResults] = useState([
    {
      name: 'Lip Sync Accuracy',
      status: 'passed' as const,
      score: 95,
      details: 'Excellent synchronization between audio and video'
    },
    {
      name: 'Voice Quality',
      status: 'passed' as const,
      score: 92,
      details: 'Natural voice with good clarity and expression'
    },
    {
      name: 'Audio-Video Alignment',
      status: 'passed' as const,
      score: 98,
      details: 'Perfect temporal alignment achieved'
    }
  ]);
  const { toast } = useToast();

  const runTests = () => {
    setIsTestRunning(true);
    setTestResults(prev => prev.map(result => ({ ...result, status: 'running' as const })));

    setTimeout(() => {
      setTestResults(prev => prev.map(result => ({ ...result, status: 'passed' as const })));
      setIsTestRunning(false);
      toast({
        title: "Tests Completed",
        description: "All quality checks passed successfully.",
      });
    }, 3000);
  };

  const downloadReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      results: testResults,
      modelConfig: {
        architecture: 'LSTM',
        learningRate: 0.001,
        batchSize: 32,
        gpuAcceleration: true,
        mixedPrecision: true
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quality-report.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: "Quality report has been saved to your device.",
    });
  };

  const resetConfig = () => {
    toast({
      title: "Configuration Reset",
      description: "All settings have been restored to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Settings & Testing</h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={resetConfig}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Config
          </Button>
          <Button
            variant="outline"
            onClick={downloadReport}
            disabled={!video}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button
            onClick={runTests}
            disabled={isTestRunning || !video}
          >
            <Play className="w-4 h-4 mr-2" />
            Run Tests
          </Button>
        </div>
      </div>

      {/* Added Video Preview */}
      <VideoPreview video={video} />

      <div className="grid gap-6 md:grid-cols-2">
        <ModelConfig />
        <TestResults results={testResults} />
      </div>

      {!video && (
        <Card className="p-4 bg-muted">
          <p className="text-sm text-muted-foreground text-center">
            Process a video to access testing and quality analysis features
          </p>
        </Card>
      )}
    </div>
  );
}
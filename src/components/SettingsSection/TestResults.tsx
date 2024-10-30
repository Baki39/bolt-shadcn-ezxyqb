import { Card } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'passed' | 'failed' | 'running';
  score: number;
  details: string;
}

interface TestResultsProps {
  results: TestResult[];
}

export function TestResults({ results }: TestResultsProps) {
  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Test Results</h3>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="flex items-start space-x-4">
            {getStatusIcon(result.status)}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{result.name}</h4>
                <span className="text-sm font-medium">
                  {result.status === 'running' ? 'Running...' : `${result.score}%`}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{result.details}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Download } from 'lucide-react';

export function OutputSection() {
  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Generated Output</h2>
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <Play className="w-12 h-12 text-muted-foreground" />
      </div>
      <div className="flex space-x-4">
        <Button className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          Download MP4
        </Button>
        <Button variant="outline" className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          Download MP3
        </Button>
      </div>
    </Card>
  );
}
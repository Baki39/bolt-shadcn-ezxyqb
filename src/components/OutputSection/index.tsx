import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Download, Volume2 } from 'lucide-react';
import { useState } from 'react';

interface OutputSectionProps {
  video: {
    url: string;
    name: string;
  } | null;
}

export function OutputSection({ video }: OutputSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDownload = (format: 'mp4' | 'mp3') => {
    // In a real app, this would trigger the actual download
    const link = document.createElement('a');
    link.href = video?.url || '';
    link.download = `processed-video.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Generated Output</h2>
        {video && (
          <span className="text-sm text-muted-foreground">
            Ready for download
          </span>
        )}
      </div>

      <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
        {video ? (
          <>
            <video
              src={video.url}
              className="w-full h-full object-contain"
              controls
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="lg"
                className="text-white"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <Play className="w-6 h-6" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <Play className="w-12 h-12" />
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <Button 
          className="flex-1" 
          onClick={() => handleDownload('mp4')}
          disabled={!video}
        >
          <Download className="w-4 h-4 mr-2" />
          Download MP4
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => handleDownload('mp3')}
          disabled={!video}
        >
          <Volume2 className="w-4 h-4 mr-2" />
          Download Audio
        </Button>
      </div>
    </Card>
  );
}
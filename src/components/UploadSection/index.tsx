import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { VideoDropzone } from './VideoDropzone';
import { VideoPreview } from './VideoPreview';
import { PromptInput } from './PromptInput';
import { useToast } from '@/components/ui/use-toast';

interface UploadSectionProps {
  onUploadComplete: () => void;
}

export function UploadSection({ onUploadComplete }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  // Auto-start processing when both file and prompt are ready
  useEffect(() => {
    if (file && prompt) {
      startProcessing();
    }
  }, [file, prompt]);

  const startProcessing = () => {
    toast({
      title: "Processing Started",
      description: "Your video is being processed. Training will begin shortly.",
    });
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          toast({
            title: "Processing Complete",
            description: "Starting training process...",
          });
          // Call onUploadComplete after a short delay to ensure smooth transition
          setTimeout(onUploadComplete, 500);
          return 100;
        }
        return next;
      });
    }, 300);
  };

  const handleFileSelect = (newFile: File) => {
    setFile(newFile);
    toast({
      title: "Video Selected",
      description: "Enter your prompt to automatically start processing.",
    });
  };

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Upload Data</h2>
        {uploadProgress > 0 && (
          <span className="text-sm text-muted-foreground">
            {uploadProgress}% Complete
          </span>
        )}
      </div>
      
      {file ? (
        <VideoPreview file={file} />
      ) : (
        <VideoDropzone onFileSelect={handleFileSelect} />
      )}

      {uploadProgress > 0 && (
        <Progress value={uploadProgress} className="w-full" />
      )}

      <PromptInput onChange={handlePromptChange} />
    </Card>
  );
}
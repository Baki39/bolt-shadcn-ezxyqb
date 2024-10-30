import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

export function UploadSection() {
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Upload Data</h2>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center space-y-4">
          <Input
            type="file"
            accept=".mp4,.avi"
            className="hidden"
            id="video-upload"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="video-upload"
            className="block cursor-pointer space-y-2"
          >
            <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">
              Drop your video here or click to browse
            </p>
          </label>
        </div>
        {uploadProgress > 0 && (
          <Progress value={uploadProgress} className="w-full" />
        )}
        <Textarea
          placeholder="Enter your AI prompt here..."
          className="min-h-[100px]"
        />
        <Button className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Upload and Process
        </Button>
      </div>
    </Card>
  );
}
import { useState, useCallback } from 'react';
import { Upload, FileVideo, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoDropzoneProps {
  onFileSelect: (file: File) => void;
}

export function VideoDropzone({ onFileSelect }: VideoDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    const validTypes = ['video/mp4', 'video/avi'];
    const maxSize = 1024 * 1024 * 1024; // 1GB

    if (!validTypes.includes(file.type)) {
      setError('Please upload MP4 or AVI files only');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 1GB');
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && validateFile(file)) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center space-y-4 transition-colors',
        isDragging
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25',
        error && 'border-destructive'
      )}
    >
      <input
        type="file"
        accept=".mp4,.avi"
        className="hidden"
        id="video-upload"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && validateFile(file)) {
            onFileSelect(file);
          }
        }}
      />
      <label htmlFor="video-upload" className="block cursor-pointer space-y-2">
        {error ? (
          <AlertCircle className="w-12 h-12 mx-auto text-destructive" />
        ) : (
          isDragging ? (
            <FileVideo className="w-12 h-12 mx-auto text-primary" />
          ) : (
            <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
          )
        )}
        <p className={cn(
          'text-sm',
          error ? 'text-destructive' : 'text-muted-foreground'
        )}>
          {error || (isDragging
            ? 'Drop your video here'
            : 'Drop your video here or click to browse')}
        </p>
        <p className="text-xs text-muted-foreground">
          Supports MP4 and AVI up to 1GB
        </p>
      </label>
    </div>
  );
}
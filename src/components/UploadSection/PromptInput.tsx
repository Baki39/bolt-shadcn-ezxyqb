import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';

interface PromptInputProps {
  onChange: (value: string) => void;
}

const suggestions = [
  'Convert this video to a professional narration',
  'Transform the speech to a friendly, casual tone',
  'Generate an enthusiastic voice-over for this content',
];

export function PromptInput({ onChange }: PromptInputProps) {
  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const newSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setSuggestion(newSuggestion);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const applySuggestion = () => {
    setValue(suggestion);
    onChange(suggestion);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">AI Prompt</label>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs"
          onClick={applySuggestion}
        >
          <Wand2 className="w-3 h-3 mr-1" />
          Try Suggestion
        </Button>
      </div>
      <Textarea
        value={value}
        onChange={handleChange}
        placeholder={suggestion}
        className="min-h-[100px] resize-none"
      />
    </div>
  );
}
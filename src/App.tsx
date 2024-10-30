import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UploadSection } from '@/components/UploadSection';
import { TrainingSection } from '@/components/TrainingSection';
import { OutputSection } from '@/components/OutputSection';
import { SettingsSection } from '@/components/SettingsSection';
import { Toaster } from '@/components/ui/toaster';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [shouldStartTraining, setShouldStartTraining] = useState(false);
  const [isTrainingComplete, setIsTrainingComplete] = useState(false);
  const [processedVideo, setProcessedVideo] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const handleUploadComplete = () => {
    setActiveTab('training');
    setTimeout(() => {
      setShouldStartTraining(true);
    }, 100);
  };

  const handleTrainingComplete = (result: { url: string; name: string }) => {
    setProcessedVideo(result);
    setIsTrainingComplete(true);
    setActiveTab('output');
  };

  const handleTrainingStart = () => {
    setShouldStartTraining(false);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Deep Learning Studio</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Upload Data</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="output" disabled={!isTrainingComplete}>Output</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <UploadSection onUploadComplete={handleUploadComplete} />
          </TabsContent>
          
          <TabsContent value="training">
            <TrainingSection 
              autoStart={shouldStartTraining}
              onTrainingStart={handleTrainingStart}
              onTrainingComplete={handleTrainingComplete}
            />
          </TabsContent>
          
          <TabsContent value="output">
            <OutputSection video={processedVideo} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsSection video={processedVideo} />
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
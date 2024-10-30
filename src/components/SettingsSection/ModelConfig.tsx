import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function ModelConfig() {
  const [config, setConfig] = useState({
    learningRate: '0.001',
    batchSize: '32',
    epochs: '100',
    gpuAcceleration: true,
    mixedPrecision: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setConfig(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Model Configuration</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="learningRate">Learning Rate</Label>
          <Input
            id="learningRate"
            name="learningRate"
            type="number"
            step="0.0001"
            value={config.learningRate}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="batchSize">Batch Size</Label>
          <Input
            id="batchSize"
            name="batchSize"
            type="number"
            value={config.batchSize}
            onChange={handleInputChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="epochs">Epochs</Label>
          <Input
            id="epochs"
            name="epochs"
            type="number"
            value={config.epochs}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="gpuAcceleration">GPU Acceleration</Label>
          <Switch
            id="gpuAcceleration"
            checked={config.gpuAcceleration}
            onCheckedChange={handleSwitchChange('gpuAcceleration')}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="mixedPrecision">Mixed Precision</Label>
          <Switch
            id="mixedPrecision"
            checked={config.mixedPrecision}
            onCheckedChange={handleSwitchChange('mixedPrecision')}
          />
        </div>
      </div>
    </Card>
  );
}
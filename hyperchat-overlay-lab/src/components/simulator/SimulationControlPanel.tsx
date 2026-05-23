import React, { useState, useEffect } from 'react';
import { useOverlayStore } from '@/store/overlayStore';
import { simulator } from '@/mocks/eventSimulator';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Slider } from '@/components/ui/Slider';
import { Settings, Eye, Bug, Gift, TrendingUp, Zap, Activity, Monitor, Trash2 } from 'lucide-react';

type TimerId = ReturnType<typeof setInterval>;

export const SimulationControlPanel: React.FC = () => {
  const {
    addAlert,
    clearAllAlerts,
    simulationSettings,
    updateSimulationSettings,
    isPreviewMode,
    isDebugMode,
    togglePreviewMode,
    toggleDebugMode,
    metrics,
  } = useOverlayStore();
  
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [autoGenerateInterval, setAutoGenerateInterval] = useState<TimerId | null>(null);
  
  const handleSingleDonation = () => {
    const event = simulator.generateAlertEvent();
    addAlert({
      type: 'donation',
      data: event.data,
      priority: event.priority,
      duration: event.duration,
    });
  };
  
  const handleBurst = () => {
    const events = simulator.generateBurst(simulationSettings.burstCount);
    events.forEach(event => {
      addAlert({
        type: 'donation',
        data: event.data,
        priority: event.priority,
        duration: event.duration,
      });
    });
  };
  
  const handleSpam = () => {
    const events = simulator.generateSpam(20);
    events.forEach(event => {
      addAlert({
        type: 'donation',
        data: event.data,
        priority: event.priority,
        duration: event.duration,
      });
    });
  };
  
  const handleLargeDonation = () => {
    const event = simulator.generateLargeDonation();
    addAlert({
      type: 'donation',
      data: event.data,
      priority: event.priority,
      duration: event.duration,
    });
  };
  
  const toggleAutoGenerate = () => {
    if (isAutoGenerating) {
      if (autoGenerateInterval) {
        clearInterval(autoGenerateInterval);
        setAutoGenerateInterval(null);
      }
      setIsAutoGenerating(false);
    } else {
      const interval = setInterval(() => {
        handleSingleDonation();
      }, simulationSettings.eventFrequency);
      setAutoGenerateInterval(interval);
      setIsAutoGenerating(true);
    }
  };

  return (
    <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-lg p-4 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Simulation Controls
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={togglePreviewMode}
            className={`p-2 rounded ${isPreviewMode ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-gray-400'}`}
            title="Toggle Preview Mode"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={toggleDebugMode}
            className={`p-2 rounded ${isDebugMode ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-gray-400'}`}
            title="Toggle Debug Mode"
          >
            <Bug className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button onClick={handleSingleDonation} variant="primary" size="sm" className="w-full">
          <Gift className="w-4 h-4 mr-1" />
          Donation
        </Button>
        <Button onClick={handleLargeDonation} variant="secondary" size="sm" className="w-full">
          <TrendingUp className="w-4 h-4 mr-1" />
          Big Dono
        </Button>
        <Button onClick={handleBurst} variant="accent" size="sm" className="w-full">
          <Zap className="w-4 h-4 mr-1" />
          Burst ({simulationSettings.burstCount})
        </Button>
        <Button onClick={handleSpam} variant="danger" size="sm" className="w-full">
          <Activity className="w-4 h-4 mr-1" />
          Spam Test
        </Button>
      </div>

      {/* Auto Generate */}
      <div className="border-t border-slate-700 pt-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Auto Generate Events</span>
          <Switch
            checked={isAutoGenerating}
            onCheckedChange={toggleAutoGenerate}
          />
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Frequency: {simulationSettings.eventFrequency}ms
            </label>
            <Slider
              value={[simulationSettings.eventFrequency]}
              min={500}
              max={10000}
              step={500}
              onValueChange={(val) => {
                updateSimulationSettings({ eventFrequency: val[0] });
                if (isAutoGenerating && autoGenerateInterval) {
                  clearInterval(autoGenerateInterval);
                  const interval = setInterval(() => {
                    handleSingleDonation();
                  }, val[0]);
                  setAutoGenerateInterval(interval);
                }
              }}
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Burst Count: {simulationSettings.burstCount}
            </label>
            <Slider
              value={[simulationSettings.burstCount]}
              min={3}
              max={20}
              step={1}
              onValueChange={(val) => updateSimulationSettings({ burstCount: val[0] })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Min Donation: ${simulationSettings.minDonation}
            </label>
            <Slider
              value={[simulationSettings.minDonation]}
              min={1}
              max={100}
              step={1}
              onValueChange={(val) => updateSimulationSettings({ minDonation: val[0] })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Max Donation: ${simulationSettings.maxDonation}
            </label>
            <Slider
              value={[simulationSettings.maxDonation]}
              min={100}
              max={2000}
              step={50}
              onValueChange={(val) => updateSimulationSettings({ maxDonation: val[0] })}
            />
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="border-t border-slate-700 pt-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
          <Monitor className="w-4 h-4" />
          Performance Metrics
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-800 rounded p-2">
            <div className="text-gray-400">Active Alerts</div>
            <div className="text-green-400 font-bold">{metrics.activeAlerts}</div>
          </div>
          <div className="bg-slate-800 rounded p-2">
            <div className="text-gray-400">Queued</div>
            <div className="text-yellow-400 font-bold">{metrics.queuedAlerts}</div>
          </div>
          <div className="bg-slate-800 rounded p-2">
            <div className="text-gray-400">Processed</div>
            <div className="text-blue-400 font-bold">{metrics.totalEventsProcessed}</div>
          </div>
          <div className="bg-slate-800 rounded p-2">
            <div className="text-gray-400">FPS</div>
            <div className="text-purple-400 font-bold">{metrics.fps}</div>
          </div>
        </div>
      </div>

      {/* Clear All */}
      <div className="border-t border-slate-700 pt-4 mt-4">
        <Button onClick={clearAllAlerts} variant="outline" size="sm" className="w-full">
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All Alerts
        </Button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OverlayCanvas } from '@/components/preview/OverlayCanvas';
import { SimulationControlPanel } from '@/components/simulator/SimulationControlPanel';
import { VariantStudio } from '@/components/preview/VariantStudio';
import { PerformanceMonitor } from '@/components/debug/PerformanceMonitor';
import { useOverlayStore } from '@/store/overlayStore';
import { Layers, Settings, PlayCircle, Code } from 'lucide-react';

// Main Dashboard Page
const Dashboard: React.FC = () => {
  const { isDebugMode } = useOverlayStore();
  const [showControls, setShowControls] = useState(true);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Performance Monitor (Debug Mode Only) */}
      {isDebugMode && <PerformanceMonitor />}

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-gradient-to-b from-slate-900/80 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">HyperChat Overlay Lab</h1>
            <p className="text-xs text-gray-400">Standalone OBS Alert & Leaderboard Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowControls(!showControls)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              showControls ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Controls</span>
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="w-full h-full">
        <OverlayCanvas />
      </div>

      {/* Control Panels */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 z-40 flex gap-4 justify-center items-end pointer-events-none">
          <div className="pointer-events-auto">
            <SimulationControlPanel />
          </div>
          <div className="pointer-events-auto">
            <VariantStudio />
          </div>
        </div>
      )}

      {/* Resolution Markers */}
      <div className="absolute bottom-4 right-4 z-30 text-xs text-gray-500 font-mono">
        <div>1920 × 1080 (Preview)</div>
        <div className="text-gray-600">OBS Browser Source Ready</div>
      </div>
    </div>
  );
};

// Pure Overlay Mode (for OBS capture)
const OverlayMode: React.FC = () => {
  return (
    <div className="w-full h-screen bg-transparent overlay-container">
      <OverlayCanvas />
    </div>
  );
};

// Test Patterns Page
const TestPatterns: React.FC = () => {
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Test Patterns</h1>
        <div className="grid grid-cols-4 gap-4">
          {['Red', 'Green', 'Blue', 'White'].map((color) => (
            <div
              key={color}
              className={`w-32 h-32 ${
                color === 'Red' ? 'bg-red-500' :
                color === 'Green' ? 'bg-green-500' :
                color === 'Blue' ? 'bg-blue-500' :
                'bg-white'
              } rounded-lg`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/overlay" element={<OverlayMode />} />
        <Route path="/test-patterns" element={<TestPatterns />} />
      </Routes>
    </Router>
  );
};

export default App;

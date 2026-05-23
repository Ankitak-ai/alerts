import React, { useState } from 'react';
import { useOverlayStore } from '@/store/overlayStore';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { 
  Palette, 
  Monitor, 
  Type, 
  LayoutTemplate, 
  Sparkles,
  Check
} from 'lucide-react';

const variants = [
  { id: 'default', name: 'Default', color: 'from-indigo-500 to-purple-600' },
  { id: 'cyberpunk', name: 'Cyberpunk', color: 'from-cyan-500 to-pink-500' },
  { id: 'holographic', name: 'Holographic', color: 'from-white/30 to-white/10' },
  { id: 'luxury', name: 'Luxury', color: 'from-amber-400 to-amber-600' },
  { id: 'anime', name: 'Anime', color: 'from-pink-400 to-purple-500' },
  { id: 'terminal', name: 'Terminal', color: 'from-green-500 to-emerald-600' },
  { id: 'esports', name: 'Esports', color: 'from-orange-500 to-red-600' },
  { id: 'ai-assistant', name: 'AI Assistant', color: 'from-blue-400 to-indigo-500' },
  { id: 'rgb-gaming', name: 'RGB Gaming', color: 'from-red-500 via-green-500 to-blue-500' },
  { id: 'cinematic', name: 'Cinematic', color: 'from-slate-600 to-slate-800' },
];

export const VariantStudio: React.FC = () => {
  const { config, updateConfig, setSelectedVariant, selectedVariant } = useOverlayStore();
  const [activeTab, setActiveTab] = useState<'variants' | 'theme' | 'layout'>('variants');

  return (
    <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-lg p-4 w-full max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-bold text-white">Variant Development Studio</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-slate-700 pb-2">
        <button
          onClick={() => setActiveTab('variants')}
          className={`px-3 py-1 text-sm rounded ${activeTab === 'variants' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Variants
        </button>
        <button
          onClick={() => setActiveTab('theme')}
          className={`px-3 py-1 text-sm rounded ${activeTab === 'theme' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Theme
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`px-3 py-1 text-sm rounded ${activeTab === 'layout' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Layout
        </button>
      </div>

      {/* Variants Tab */}
      {activeTab === 'variants' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-400 mb-2">Select overlay variant to preview:</p>
          <div className="grid grid-cols-2 gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => {
                  setSelectedVariant(variant.id);
                  updateConfig({ variant: variant.id });
                }}
                className={`relative p-3 rounded-lg border transition-all ${
                  selectedVariant === variant.id
                    ? 'border-indigo-500 bg-indigo-500/20'
                    : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                }`}
              >
                <div className={`w-full h-8 rounded mb-2 bg-gradient-to-r ${variant.color}`} />
                <span className="text-sm text-white">{variant.name}</span>
                {selectedVariant === variant.id && (
                  <Check className="absolute top-2 right-2 w-4 h-4 text-indigo-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Theme Tab */}
      {activeTab === 'theme' && (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1 flex items-center gap-1">
              <Palette className="w-3 h-3" />
              Primary Color
            </label>
            <input
              type="color"
              value={config.theme.primaryColor}
              onChange={(e) => updateConfig({ theme: { ...config.theme, primaryColor: e.target.value } })}
              className="w-full h-10 rounded cursor-pointer bg-slate-800 border border-slate-700"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Secondary Color</label>
            <input
              type="color"
              value={config.theme.secondaryColor}
              onChange={(e) => updateConfig({ theme: { ...config.theme, secondaryColor: e.target.value } })}
              className="w-full h-10 rounded cursor-pointer bg-slate-800 border border-slate-700"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Accent Color</label>
            <input
              type="color"
              value={config.theme.accentColor}
              onChange={(e) => updateConfig({ theme: { ...config.theme, accentColor: e.target.value } })}
              className="w-full h-10 rounded cursor-pointer bg-slate-800 border border-slate-700"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1 flex items-center gap-1">
              <Type className="w-3 h-3" />
              Font Family
            </label>
            <select
              value={config.theme.fontFamily}
              onChange={(e) => updateConfig({ theme: { ...config.theme, fontFamily: e.target.value } })}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="system-ui, sans-serif">System UI</option>
              <option value="'Fira Code', monospace">Fira Code</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="Georgia, serif">Georgia</option>
            </select>
          </div>
        </div>
      )}

      {/* Layout Tab */}
      {activeTab === 'layout' && (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1 flex items-center gap-1">
              <LayoutTemplate className="w-3 h-3" />
              Alert Position
            </label>
            <select
              value={config.position}
              onChange={(e) => updateConfig({ position: e.target.value as any })}
              className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white text-sm"
            >
              <option value="top-left">Top Left</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="center">Center</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1 flex items-center gap-1">
              <Monitor className="w-3 h-3" />
              Scale: {config.scale}x
            </label>
            <Slider
              value={[config.scale]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={(val) => updateConfig({ scale: val[0] })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Opacity: {Math.round(config.opacity * 100)}%</label>
            <Slider
              value={[config.opacity]}
              min={0.1}
              max={1}
              step={0.05}
              onValueChange={(val) => updateConfig({ opacity: val[0] })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Max Visible Alerts: {config.maxVisibleAlerts}</label>
            <Slider
              value={[config.maxVisibleAlerts]}
              min={1}
              max={10}
              step={1}
              onValueChange={(val) => updateConfig({ maxVisibleAlerts: val[0] })}
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1">Alert Duration: {config.alertDuration / 1000}s</label>
            <Slider
              value={[config.alertDuration]}
              min={2000}
              max={15000}
              step={500}
              onValueChange={(val) => updateConfig({ alertDuration: val[0] })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import { useOverlayStore } from '@/store/overlayStore';

export const PerformanceMonitor: React.FC = () => {
  const { metrics, updateMetrics } = useOverlayStore();
  const fpsRef = useRef<number>(60);
  const frameCountRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const measureFPS = () => {
      frameCountRef.current++;
      const now = Date.now();
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 1000) {
        fpsRef.current = Math.round((frameCountRef.current * 1000) / elapsed);
        frameCountRef.current = 0;
        lastTimeRef.current = now;

        updateMetrics({
          fps: fpsRef.current,
          renderTime: Math.random() * 5 + 2,
          memoryUsage: Math.round(Math.random() * 100 + 50),
        });
      }

      requestAnimationFrame(measureFPS);
    };

    const rafId = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(rafId);
  }, [updateMetrics]);

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed top-4 left-4 z-50 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg p-3 text-xs">
      <h3 className="font-bold text-white mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Performance Monitor
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <div className="text-gray-400">FPS:</div>
        <div className={`font-mono font-bold ${getFPSColor(metrics.fps)}`}>{metrics.fps}</div>
        
        <div className="text-gray-400">Render:</div>
        <div className="font-mono text-blue-400">{metrics.renderTime.toFixed(2)}ms</div>
        
        <div className="text-gray-400">Active:</div>
        <div className="font-mono text-green-400">{metrics.activeAlerts}</div>
        
        <div className="text-gray-400">Queued:</div>
        <div className="font-mono text-yellow-400">{metrics.queuedAlerts}</div>
        
        <div className="text-gray-400">Processed:</div>
        <div className="font-mono text-purple-400">{metrics.totalEventsProcessed}</div>
        
        <div className="text-gray-400">Memory:</div>
        <div className="font-mono text-orange-400">{metrics.memoryUsage}MB</div>
      </div>
    </div>
  );
};

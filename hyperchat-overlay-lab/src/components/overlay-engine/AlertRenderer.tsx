import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOverlayStore } from '@/store/overlayStore';
import type { AlertEvent } from '@/types';

interface AlertQueueManagerProps {
  children: React.ReactNode;
}

export const AlertQueueManager: React.FC<AlertQueueManagerProps> = ({ children }) => {
  const { 
    activeAlerts, 
    removeAlert, 
    processQueue, 
    config,
    updateMetrics 
  } = useOverlayStore();

  // Process queue when active alerts change
  useEffect(() => {
    const timer = setTimeout(() => {
      processQueue();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeAlerts.length, processQueue]);

  // Auto-remove alerts after duration
  useEffect(() => {
    const timers = activeAlerts.map((alert) => {
      return setTimeout(() => {
        removeAlert(alert.id);
      }, alert.duration);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [activeAlerts, removeAlert]);

  // Update metrics
  useEffect(() => {
    updateMetrics({
      activeAlerts: activeAlerts.length,
    });
  }, [activeAlerts.length, updateMetrics]);

  return <>{children}</>;
};

interface AlertRendererProps {
  alert: AlertEvent;
  variant: string;
}

export const AlertRenderer: React.FC<AlertRendererProps> = ({ alert, variant }) => {
  const { removeAlert, config } = useOverlayStore();

  const handleAnimationComplete = useCallback(() => {
    if (alert.type === 'donation') {
      // Donation alerts stay longer
    } else {
      removeAlert(alert.id);
    }
  }, [alert.id, alert.type, removeAlert]);

  const getVariantComponent = () => {
    switch (variant) {
      case 'cyberpunk':
        return <CyberpunkAlert alert={alert} />;
      case 'holographic':
        return <HolographicAlert alert={alert} />;
      case 'luxury':
        return <LuxuryAlert alert={alert} />;
      case 'anime':
        return <AnimeAlert alert={alert} />;
      case 'terminal':
        return <TerminalAlert alert={alert} />;
      case 'esports':
        return <EsportsAlert alert={alert} />;
      default:
        return <DefaultAlert alert={alert} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={{ 
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 1
      }}
      className="obs-safe no-layout-shift"
      style={{
        transform: `scale(${config.scale})`,
        opacity: config.opacity,
      }}
      onAnimationComplete={handleAnimationComplete}
    >
      {getVariantComponent()}
    </motion.div>
  );
};

// Default Alert Variant
const DefaultAlert: React.FC<{ alert: AlertEvent }> = ({ alert }) => {
  if (alert.type !== 'donation') return null;
  const data = alert.data as any;

  return (
    <div className="glassmorphism rounded-lg p-4 min-w-[320px] max-w-[400px] bg-slate-900/90 border border-slate-700">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          {data.donorName?.[0]?.toUpperCase() || '?'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white truncate">{data.donorName}</span>
            <span className="text-green-400 font-semibold">${data.amount}</span>
          </div>
          <p className="text-gray-300 text-sm mt-1 line-clamp-2">{data.message}</p>
          {data.mediaUrl && (
            <img src={data.mediaUrl} alt="Media" className="mt-2 rounded-md max-h-32 w-full object-cover" />
          )}
        </div>
      </div>
    </div>
  );
};

// Cyberpunk Alert Variant
const CyberpunkAlert: React.FC<{ alert: AlertEvent }> = ({ alert }) => {
  if (alert.type !== 'donation') return null;
  const data = alert.data as any;

  return (
    <div className="cyberpunk-glow rounded p-4 min-w-[340px] bg-black/90 border-2 border-cyan-400 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
      <div className="flex items-start gap-3 relative z-10">
        <div className="w-14 h-14 rounded-none clip-path-polygon bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl" 
             style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}>
          {data.donorName?.[0]?.toUpperCase() || '?'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-400 neon-text truncate font-mono">{data.donorName}</span>
            <span className="text-pink-500 font-semibold font-mono text-lg">${data.amount}</span>
          </div>
          <p className="text-cyan-100 text-sm mt-1 font-mono line-clamp-2">{data.message}</p>
          {data.mediaUrl && (
            <div className="mt-2 border border-cyan-400/50 rounded overflow-hidden">
              <img src={data.mediaUrl} alt="Media" className="max-h-32 w-full object-cover" />
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-500/20 to-transparent" />
    </div>
  );
};

// Holographic Alert Variant
const HolographicAlert: React.FC<{ alert: AlertEvent }> = ({ alert }) => {
  if (alert.type !== 'donation') return null;
  const data = alert.data as any;

  return (
    <div className="holographic-shimmer rounded-xl p-4 min-w-[320px] backdrop-blur-md bg-white/10 border border-white/20">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold text-lg">
          {data.donorName?.[0]?.toUpperCase() || '?'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white/90 truncate">{data.donorName}</span>
            <span className="text-cyan-300 font-semibold">${data.amount}</span>
          </div>
          <p className="text-white/70 text-sm mt-1 line-clamp-2">{data.message}</p>
          {data.mediaUrl && (
            <div className="mt-2 rounded-lg overflow-hidden border border-white/20">
              <img src={data.mediaUrl} alt="Media" className="max-h-32 w-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Luxury Alert Variant
const LuxuryAlert: React.FC<{ alert: AlertEvent }> = ({ alert }) => {
  if (alert.type !== 'donation') return null;
  const data = alert.data as any;

  return (
    <div className="rounded-lg p-5 min-w-[360px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 shadow-2xl">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-[1px] bg-amber-500" />
        <span className="text-amber-500 text-xs uppercase tracking-widest">Donation</span>
        <div className="w-8 h-[1px] bg-amber-500" />
      </div>
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold text-xl shadow-lg">
          {data.donorName?.[0]?.toUpperCase() || '?'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white truncate text-lg">{data.donorName}</span>
            <span className="text-amber-400 font-bold text-xl">${data.amount}</span>
          </div>
          <p className="text-gray-400 text-sm mt-2 italic">"{data.message}"</p>
          {data.mediaUrl && (
            <div className="mt-3 rounded-lg overflow-hidden border border-amber-500/20">
              <img src={data.mediaUrl} alt="Media" className="max-h-32 w-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Anime Alert Variant
const AnimeAlert: React.FC<{ alert: AlertEvent }> = ({ alert }) => {
  if (alert.type !== 'donation') return null;
  const data = alert.data as any;

  return (
    <div className="rounded-lg p-4 min-w-[340px] bg-gradient-to-br from-pink-900/90 via-purple-900/90 to-indigo-900/90 border-2 border-pink-400 shadow-lg shadow-pink-500/30">
      <div className="absolute -top-2 -right-2 w-8 h-8">
        <div className="w-full h-full bg-pink-400 rotate-45" />
      </div>
      <div className="flex items-start gap-3 relative z-10">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl ring-4 ring-pink-400/50">
          {data.donorName?.[0]?.toUpperCase() || '?'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-pink-200 truncate">{data.donorName}-senpai</span>
            <span className="text-purple-300 font-bold text-lg">¥{data.amount * 150}</span>
          </div>
          <p className="text-pink-100 text-sm mt-1">{data.message} ✨</p>
          {data.mediaUrl && (
            <div className="mt-2 rounded-lg overflow-hidden border-2 border-pink-400/50">
              <img src={data.mediaUrl} alt="Media" className="max-h-32 w-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Terminal Alert Variant
const TerminalAlert: React.FC<{ alert: AlertEvent }> = ({ alert }) => {
  if (alert.type !== 'donation') return null;
  const data = alert.data as any;

  return (
    <div className="rounded p-4 min-w-[360px] bg-black border border-green-500 font-mono">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-green-500 text-xs ml-2">bash -- donation</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-green-400">$</span>
          <span className="text-green-300">donor:</span>
          <span className="text-white">{data.donorName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-400">$</span>
          <span className="text-green-300">amount:</span>
          <span className="text-green-400 font-bold">${data.amount}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-green-400">$</span>
          <span className="text-green-300">message:</span>
          <span className="text-gray-300 text-sm">{data.message}</span>
        </div>
        {data.mediaUrl && (
          <div className="border border-green-500/50 rounded mt-2 overflow-hidden">
            <img src={data.mediaUrl} alt="Media" className="max-h-32 w-full object-cover" />
          </div>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-green-400 animate-pulse">▋</span>
      </div>
    </div>
  );
};

// Esports Alert Variant
const EsportsAlert: React.FC<{ alert: AlertEvent }> = ({ alert }) => {
  if (alert.type !== 'donation') return null;
  const data = alert.data as any;

  return (
    <div className="rounded-none p-0 min-w-[380px] bg-slate-900/95 border-l-4 border-orange-500 skew-x-[-6deg]">
      <div className="skew-x-[6deg] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-orange-500 text-black font-bold text-xs px-2 py-1 uppercase">Support</span>
          <span className="text-orange-400 font-bold text-lg">${data.amount}</span>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-xl" 
               style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}>
            {data.donorName?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold truncate text-lg">{data.donorName}</div>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{data.message}</p>
            {data.mediaUrl && (
              <div className="mt-2 border border-orange-500/30 overflow-hidden">
                <img src={data.mediaUrl} alt="Media" className="max-h-24 w-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

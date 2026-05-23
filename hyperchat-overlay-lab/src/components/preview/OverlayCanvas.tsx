import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOverlayStore } from '@/store/overlayStore';
import { AlertRenderer, AlertQueueManager } from '@/components/overlay-engine/AlertRenderer';
import { LeaderboardDisplay } from '@/components/overlay-engine/LeaderboardDisplay';

export const OverlayCanvas: React.FC = () => {
  const { activeAlerts, config, selectedVariant } = useOverlayStore();

  const getPositionClasses = () => {
    switch (config.position) {
      case 'top-left':
        return 'top-4 left-4 items-start';
      case 'top-right':
        return 'top-4 right-4 items-start';
      case 'bottom-left':
        return 'bottom-4 left-4 items-end';
      case 'bottom-right':
        return 'bottom-4 right-4 items-end';
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center';
      default:
        return 'bottom-4 right-4 items-end';
    }
  };

  return (
    <AlertQueueManager>
      <div className="overlay-container w-full h-full relative">
        {/* Alerts Container */}
        <div 
          className={`absolute ${getPositionClasses()} flex flex-col gap-4 z-10`}
          style={{
            transform: `scale(${config.scale})`,
          }}
        >
          <AnimatePresence mode="popLayout">
            {activeAlerts.map((alert) => (
              <AlertRenderer 
                key={alert.id} 
                alert={alert} 
                variant={selectedVariant || config.variant}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Leaderboard */}
        {config.showLeaderboard && (
          <div className={`absolute z-20 ${
            config.leaderboardPosition === 'left' ? 'top-4 left-4' :
            config.leaderboardPosition === 'right' ? 'top-4 right-4' :
            config.leaderboardPosition === 'top' ? 'top-4 left-1/2 -translate-x-1/2' :
            'bottom-4 left-1/2 -translate-x-1/2'
          }`}>
            <LeaderboardDisplay />
          </div>
        )}
      </div>
    </AlertQueueManager>
  );
};

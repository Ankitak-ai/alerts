import React from 'react';
import { motion } from 'framer-motion';
import { useOverlayStore } from '@/store/overlayStore';
import { Trophy, Medal, Award } from 'lucide-react';

export const LeaderboardDisplay: React.FC = () => {
  const { leaderboard, config } = useOverlayStore();

  if (!config.showLeaderboard) return null;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-gray-500 font-bold text-sm">{rank}</span>;
    }
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'diamond':
        return 'from-cyan-400 to-blue-500';
      case 'gold':
        return 'from-yellow-400 to-amber-500';
      case 'silver':
        return 'from-gray-300 to-gray-400';
      case 'bronze':
        return 'from-amber-600 to-amber-700';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`glassmorphism rounded-lg p-4 bg-slate-900/90 border border-slate-700 min-w-[280px] max-h-[400px] overflow-hidden`}
      style={{
        transform: `scale(${config.scale})`,
      }}
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h3 className="font-bold text-white">Top Supporters</h3>
      </div>
      
      <div className="space-y-2">
        {leaderboard.slice(0, 5).map((entry) => (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: entry.rank * 0.1 }}
            className={`flex items-center gap-3 p-2 rounded-lg ${
              entry.rank === 1 ? 'bg-gradient-to-r from-yellow-500/20 to-transparent' :
              entry.rank === 2 ? 'bg-gradient-to-r from-gray-500/20 to-transparent' :
              entry.rank === 3 ? 'bg-gradient-to-r from-amber-500/20 to-transparent' :
              'hover:bg-slate-800/50'
            } transition-colors`}
          >
            <div className="flex-shrink-0 w-6">
              {getRankIcon(entry.rank)}
            </div>
            
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getBadgeColor(entry.badge)} flex items-center justify-center text-white font-bold text-xs`}>
              {entry.username[0]?.toUpperCase()}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white text-sm truncate">{entry.username}</div>
            </div>
            
            <div className="text-green-400 font-semibold text-sm">${entry.totalAmount.toLocaleString()}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Cyberpunk Leaderboard Variant
export const CyberpunkLeaderboard: React.FC = () => {
  const { leaderboard, config } = useOverlayStore();

  return (
    <motion.div
      className="cyberpunk-glow rounded p-4 bg-black/90 border-2 border-cyan-400 min-w-[300px]"
      style={{ transform: `scale(${config.scale})` }}
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-400/50">
        <Trophy className="w-5 h-5 text-cyan-400 neon-text" />
        <h3 className="font-bold text-cyan-400 font-mono neon-text">TOP DONATORS</h3>
      </div>
      
      <div className="space-y-2">
        {leaderboard.slice(0, 5).map((entry, index) => (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-2 border border-cyan-400/30 hover:border-cyan-400/80 transition-colors"
          >
            <span className="font-mono text-pink-500 font-bold w-4">{entry.rank}</span>
            <span className="font-mono text-cyan-100 flex-1 truncate">{entry.username}</span>
            <span className="font-mono text-green-400 font-bold">${entry.totalAmount.toLocaleString()}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Luxury Leaderboard Variant
export const LuxuryLeaderboard: React.FC = () => {
  const { leaderboard, config } = useOverlayStore();

  return (
    <motion.div
      className="rounded-lg p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 shadow-2xl min-w-[300px]"
      style={{ transform: `scale(${config.scale})` }}
    >
      <div className="flex items-center justify-center gap-2 mb-4 pb-3 border-b border-amber-500/30">
        <Trophy className="w-6 h-6 text-amber-400" />
        <h3 className="font-bold text-amber-400 uppercase tracking-widest text-sm">Elite Supporters</h3>
      </div>
      
      <div className="space-y-3">
        {leaderboard.slice(0, 5).map((entry, index) => (
          <motion.div
            key={entry.userId}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              entry.rank === 1 ? 'bg-amber-400 text-slate-900' :
              entry.rank === 2 ? 'bg-gray-400 text-slate-900' :
              entry.rank === 3 ? 'bg-amber-700 text-white' :
              'bg-slate-700 text-white'
            }`}>
              {entry.rank}
            </span>
            <span className="text-white font-medium flex-1">{entry.username}</span>
            <span className="text-amber-400 font-bold">${entry.totalAmount.toLocaleString()}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

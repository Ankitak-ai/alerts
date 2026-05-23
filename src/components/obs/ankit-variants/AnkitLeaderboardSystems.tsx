import React, { useEffect, useState, useMemo } from 'react';
import type { LbDonation, LbTopDonator } from './AnkitAlertVariants';
import { GlassCard, AnimatedCounter, ParticleField, NeonText } from './ui-primitives';

interface LeaderboardProps {
  topDonator: LbTopDonator | null;
  latestDonations: LbDonation[];
  brandColor: string;
}

// ============================================================================
// LEADERBOARD VARIANT 1: Cyberpunk Data Stream
// ============================================================================
export const CyberpunkLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <div className="relative w-full h-full overflow-hidden p-4 font-mono text-sm">
      <ParticleField count={15} color={brandColor} speed={0.5} />
      
      {/* Top Donator Section */}
      <div className="mb-4 pb-4 border-b" style={{ borderColor: `${brandColor}40` }}>
        <div className="text-xs uppercase tracking-widest mb-2" style={{ color: brandColor }}>
          TOP CONTRIBUTOR
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white font-bold truncate">{topDonator?.name || '—'}</span>
          <span className="text-lg" style={{ color: brandColor, textShadow: `0 0 10px ${brandColor}` }}>
            ₹{topDonator?.totalAmount.toLocaleString() || '0'}
          </span>
        </div>
      </div>
      
      {/* Latest Donations */}
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-widest" style={{ color: brandColor }}>
          RECENT TRANSMISSIONS
        </div>
        {latestDonations.slice(0, 4).map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-between text-xs py-1"
            style={{
              background: `linear-gradient(90deg, ${brandColor}10, transparent)`,
              opacity: 1 - i * 0.15,
            }}
          >
            <span className="text-gray-300 truncate flex-1">{d.name}</span>
            <span style={{ color: brandColor }}>₹{d.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
      
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)',
        }}
      />
    </div>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 2: Holographic Display
// ============================================================================
export const HolographicLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <GlassCard brandColor={brandColor} blur={20} bgOpacity={0.08} className="w-full h-full p-5">
      {/* Top Donator Spotlight */}
      <div className="text-center mb-4 pb-4 border-b" style={{ borderColor: `${brandColor}30` }}>
        <div className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: brandColor }}>
          Hall of Fame
        </div>
        <div
          className="text-3xl font-bold text-white"
          style={{ textShadow: `0 0 20px ${brandColor}60` }}
        >
          {topDonator?.name || '—'}
        </div>
        <div className="text-xl mt-1" style={{ color: brandColor }}>
          ₹<AnimatedCounter value={topDonator?.totalAmount || 0} />
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="space-y-2">
        {latestDonations.slice(0, 3).map((d, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2 rounded-lg"
            style={{
              background: `${brandColor}10`,
              transform: 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: brandColor, boxShadow: `0 0 8px ${brandColor}` }}
            />
            <span className="flex-1 text-sm text-gray-200 truncate">{d.name}</span>
            <span className="text-sm font-medium" style={{ color: brandColor }}>
              ₹{d.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 3: Esports Stats Panel
// ============================================================================
export const EsportsLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: brandColor }} />
      
      <div className="pl-4 pr-3 py-3 h-full flex flex-col">
        {/* Top Contributor */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-4" style={{ background: brandColor }} />
            <span className="text-xs uppercase tracking-wider text-gray-400">Top Supporter</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-white truncate">{topDonator?.name || '—'}</span>
            <span className="text-xl font-black" style={{ color: brandColor }}>
              ₹{topDonator?.totalAmount.toLocaleString() || '0'}
            </span>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px mb-3" style={{ background: `linear-gradient(90deg, ${brandColor}40, transparent)` }} />
        
        {/* Recent */}
        <div className="flex-1 overflow-hidden">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Latest</div>
          <div className="space-y-1">
            {latestDonations.slice(0, 4).map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-gray-300 truncate max-w-[120px]">{d.name}</span>
                <span className="text-gray-400">₹{d.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 4: Anime Energy Board
// ============================================================================
export const AnimeEnergyLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <div className="relative w-full h-full overflow-hidden p-4">
      {/* Energy glow background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at top right, ${brandColor}20 0%, transparent 60%)`,
        }}
      />
      
      <div className="relative z-10">
        {/* Top Donator with burst effect */}
        <div className="text-center mb-4">
          <div
            className="inline-block px-4 py-2 rounded-t-lg"
            style={{
              background: `linear-gradient(180deg, ${brandColor}30, transparent)`,
              borderTop: `2px solid ${brandColor}`,
            }}
          >
            <div className="text-xs uppercase tracking-widest" style={{ color: brandColor }}>
              Legend
            </div>
            <div className="text-2xl font-black text-white mt-1"
              style={{ textShadow: `0 0 20px ${brandColor}` }}
            >
              {topDonator?.name || '—'}
            </div>
            <div className="text-lg font-bold mt-1" style={{ color: brandColor }}>
              ₹{topDonator?.totalAmount.toLocaleString() || '0'}
            </div>
          </div>
        </div>
        
        {/* Recent supporters */}
        <div className="space-y-1">
          {latestDonations.slice(0, 3).map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-1.5 text-sm rounded"
              style={{
                background: `${brandColor}15`,
                borderLeft: `2px solid ${brandColor}`,
              }}
            >
              <span className="text-white truncate flex-1">{d.name}</span>
              <span className="font-medium ml-2" style={{ color: brandColor }}>
                ₹{d.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 5: Minimal Luxury
// ============================================================================
export const MinimalLuxuryLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <div className="relative w-full h-full overflow-hidden p-6 flex flex-col justify-center">
      {/* Top Donator */}
      <div className="text-center mb-6">
        <div className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: brandColor }}>
          Distinguished Patron
        </div>
        <div className="text-2xl font-light text-white">
          {topDonator?.name || '—'}
        </div>
        <div className="mt-2 text-lg font-light" style={{ color: brandColor }}>
          ₹{topDonator?.totalAmount.toLocaleString() || '0'}
        </div>
        {/* Decorative line */}
        <div
          className="mt-4 h-px mx-auto"
          style={{
            width: '40px',
            background: `linear-gradient(90deg, transparent, ${brandColor}, transparent)`,
          }}
        />
      </div>
      
      {/* Recent */}
      <div className="space-y-2">
        {latestDonations.slice(0, 3).map((d, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-gray-400 font-light truncate">{d.name}</span>
            <span className="text-gray-500 font-light">₹{d.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 6: Futuristic HUD
// ============================================================================
export const FuturisticHUDLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <div className="relative w-full h-full overflow-hidden p-3 font-mono text-xs">
      {/* Corner brackets */}
      {[
        { pos: 'top-0 left-0', rotate: '0deg' },
        { pos: 'top-0 right-0', rotate: '90deg' },
        { pos: 'bottom-0 right-0', rotate: '180deg' },
        { pos: 'bottom-0 left-0', rotate: '270deg' },
      ].map((corner, i) => (
        <div
          key={i}
          className={`absolute ${corner.pos} w-6 h-6`}
          style={{
            borderTop: `1px solid ${brandColor}`,
            borderLeft: `1px solid ${brandColor}`,
            transform: `rotate(${corner.rotate})`,
          }}
        />
      ))}
      
      <div className="pt-6 pb-4 px-2 h-full flex flex-col">
        {/* Top Donator */}
        <div className="mb-3 pb-2 border-b" style={{ borderColor: `${brandColor}40` }}>
          <div className="text-[10px] uppercase" style={{ color: brandColor }}>
            PRIMARY SUPPORTER
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-white truncate">{topDonator?.name || 'N/A'}</span>
            <span style={{ color: brandColor }}>₺{topDonator?.totalAmount.toLocaleString() || '0'}</span>
          </div>
        </div>
        
        {/* Recent Feed */}
        <div className="flex-1 overflow-hidden">
          <div className="text-[10px] uppercase mb-1" style={{ color: brandColor }}>
            ACTIVITY FEED
          </div>
          {latestDonations.slice(0, 4).map((d, i) => (
            <div key={i} className="flex items-center justify-between py-0.5 text-[10px]">
              <span className="text-gray-400 truncate">{d.name}</span>
              <span className="text-gray-500">₺{d.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scanning line */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          background: brandColor,
          opacity: 0.2,
          animation: 'hudScan 3s linear infinite',
        }}
      />
      
      <style>{`
        @keyframes hudScan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 7: AI Assistant Style
// ============================================================================
export const AIAssistantLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <GlassCard brandColor={brandColor} blur={15} className="w-full h-full">
      <div className="p-4 h-full flex flex-col">
        {/* Header with AI indicator */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: brandColor,
              boxShadow: `0 0 10px ${brandColor}`,
              animation: 'aiPulse 2s ease-in-out infinite',
            }}
          />
          <span className="text-xs" style={{ color: brandColor }}>Support Analytics</span>
        </div>
        
        {/* Top Donator Card */}
        <div className="mb-3 p-3 rounded-lg" style={{ background: `${brandColor}15` }}>
          <div className="text-[10px] uppercase mb-1" style={{ color: brandColor }}>
            Leading Contributor
          </div>
          <div className="text-base font-bold text-white truncate">
            {topDonator?.name || '—'}
          </div>
          <div className="text-sm mt-1" style={{ color: brandColor }}>
            ₹{topDonator?.totalAmount.toLocaleString() || '0'} total
          </div>
        </div>
        
        {/* Recent Activity List */}
        <div className="flex-1 overflow-hidden">
          <div className="text-[10px] uppercase mb-2 text-gray-500">Recent Activity</div>
          <div className="space-y-1">
            {latestDonations.slice(0, 3).map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-gray-300 truncate">{d.name}</span>
                <span className="text-gray-400">₹{d.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes aiPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </GlassCard>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 8: RGB Gamer
// ============================================================================
export const RGBGamerLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  const [rgbPhase, setRgbPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRgbPhase(prev => (prev + 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const rgbColor = `hsl(${rgbPhase}, 100%, 50%)`;

  return (
    <div className="relative w-full h-full overflow-hidden p-4">
      {/* RGB glow background */}
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from ${rgbPhase}deg, #ff000020, #ffff0020, #00ff0020, #00ffff20, #0000ff20, #ff00ff20, #ff000020)`,
          filter: 'blur(30px)',
        }}
      />
      
      <div
        className="relative z-10 h-full flex flex-col"
        style={{
          background: 'rgba(0,0,0,0.7)',
          borderRadius: 12,
          border: `1px solid ${rgbColor}`,
        }}
      >
        {/* Top Donator */}
        <div className="p-3 border-b" style={{ borderColor: `${rgbColor}40` }}>
          <div
            className="text-xs uppercase tracking-wider text-center mb-1"
            style={{
              background: `linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'rgbShift 1s linear infinite',
            }}
          >
            MVP Supporter
          </div>
          <div className="text-center text-white font-bold truncate">{topDonator?.name || '—'}</div>
          <div
            className="text-center text-sm font-bold mt-1"
            style={{
              background: `linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'rgbShift 0.5s linear infinite',
            }}
          >
            ₹{topDonator?.totalAmount.toLocaleString() || '0'}
          </div>
        </div>
        
        {/* Recent */}
        <div className="flex-1 p-3 overflow-hidden">
          {latestDonations.slice(0, 3).map((d, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-1">
              <span className="text-gray-300 truncate">{d.name}</span>
              <span className="text-gray-400">₹{d.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes rgbShift {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 9: Dark Premium Glass
// ============================================================================
export const DarkPremiumGlassLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <GlassCard brandColor={brandColor} blur={25} borderOpacity={0.15} bgOpacity={0.06} className="w-full h-full">
      <div className="p-5 h-full flex flex-col">
        {/* Top Donator */}
        <div className="text-center mb-5 pb-5 border-b" style={{ borderColor: `${brandColor}20` }}>
          <div className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: brandColor }}>
            Elite Supporter
          </div>
          <div className="text-xl text-white font-medium">
            {topDonator?.name || '—'}
          </div>
          <div className="text-lg mt-2" style={{ color: brandColor }}>
            ₹{topDonator?.totalAmount.toLocaleString() || '0'}
          </div>
        </div>
        
        {/* Recent Donations */}
        <div className="flex-1 overflow-hidden">
          <div className="text-xs uppercase tracking-wider mb-3 text-gray-500">Recent</div>
          <div className="space-y-2">
            {latestDonations.slice(0, 3).map((d, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <span className="text-sm text-gray-300 truncate">{d.name}</span>
                <span className="text-sm text-gray-400">₹{d.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 10: Liquid Motion
// ============================================================================
export const LiquidMotionLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Liquid SVG background */}
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="liquidGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={brandColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={brandColor} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q50,20 100,50 T200,50 L200,100 L0,100 Z"
            fill="url(#liquidGrad2)"
            style={{ animation: 'liquidFlow3 5s ease-in-out infinite' }}
          />
        </svg>
      </div>
      
      <div className="relative z-10 p-4 h-full flex flex-col justify-center">
        {/* Top Donator */}
        <div className="text-center mb-4">
          <div className="text-xs uppercase tracking-widest mb-2" style={{ color: brandColor }}>
            Top Champion
          </div>
          <div
            className="text-2xl font-bold text-white"
            style={{ textShadow: `0 0 20px ${brandColor}` }}
          >
            {topDonator?.name || '—'}
          </div>
          <div className="text-lg mt-1" style={{ color: brandColor }}>
            ₹{topDonator?.totalAmount.toLocaleString() || '0'}
          </div>
        </div>
        
        {/* Recent */}
        <div className="space-y-1">
          {latestDonations.slice(0, 3).map((d, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-1.5 rounded-full text-sm"
              style={{
                background: `${brandColor}20`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="text-white truncate">{d.name}</span>
              <span className="text-white/80">₹{d.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes liquidFlow3 {
          0%, 100% { d: path("M0,50 Q50,20 100,50 T200,50 L200,100 L0,100 Z"); }
          50% { d: path("M0,50 Q50,40 100,30 T200,50 L200,100 L0,100 Z"); }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 11: Terminal Hacker
// ============================================================================
export const TerminalHackerLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <div className="relative w-full h-full overflow-hidden p-3 font-mono text-xs">
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.95)',
          border: `1px solid ${brandColor}30`,
        }}
      />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Top Donator */}
        <div className="mb-3 pb-2 border-b" style={{ borderColor: `${brandColor}40` }}>
          <div style={{ color: brandColor, textShadow: `0 0 10px ${brandColor}` }}>
            {'>'} TOP_DONATOR: {topDonator?.name || 'NULL'}
          </div>
          <div style={{ color: brandColor, textShadow: `0 0 10px ${brandColor}` }}>
            {'>'} TOTAL: ₹{topDonator?.totalAmount.toLocaleString() || '0'}
          </div>
        </div>
        
        {/* Recent */}
        <div className="flex-1 overflow-hidden">
          <div style={{ color: '#00ff00', marginBottom: '4px' }}>
            {'>'} RECENT_DONATIONS:
          </div>
          {latestDonations.slice(0, 5).map((d, i) => (
            <div key={i} className="truncate py-0.5" style={{ color: '#00ff00', opacity: 0.7 }}>
              [{i + 1}] {d.name}: ₹{d.amount.toLocaleString()}
            </div>
          ))}
        </div>
      </div>
      
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
    </div>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 12: Twitch Ultra Modern
// ============================================================================
export const TwitchUltraModernLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      {/* Top Donator Card */}
      <div
        className="p-4 mb-3 rounded-xl"
        style={{
          background: 'rgba(15,15,20,0.95)',
          border: `1px solid ${brandColor}40`,
        }}
      >
        <div className="text-xs uppercase tracking-wider mb-2 text-gray-400">
          Top Cheerer
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
            style={{ background: brandColor }}
          >
            {(topDonator?.name || '?')[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white font-bold truncate">{topDonator?.name || '—'}</div>
            <div className="text-sm" style={{ color: brandColor }}>
              ₹{topDonator?.totalAmount.toLocaleString() || '0'} bits
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent List */}
      <div className="flex-1 overflow-hidden space-y-2">
        {latestDonations.slice(0, 3).map((d, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: `${brandColor}60` }}
            >
              {d.name[0].toUpperCase()}
            </div>
            <span className="flex-1 text-sm text-gray-300 truncate">{d.name}</span>
            <span className="text-sm font-medium" style={{ color: brandColor }}>
              ₹{d.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 13: Kinetic Typography
// ============================================================================
export const KineticTypographyLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <div className="w-full h-full overflow-hidden p-4 flex flex-col justify-center">
      {/* Top Donator with kinetic reveal */}
      <div className="mb-6 relative overflow-hidden">
        <div className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: brandColor }}>
          Leader
        </div>
        <div className="text-3xl font-black text-white">
          {topDonator?.name || '—'}
        </div>
        <div className="text-xl mt-1" style={{ color: brandColor }}>
          ₹{topDonator?.totalAmount.toLocaleString() || '0'}
        </div>
      </div>
      
      {/* Recent with staggered appearance */}
      <div className="space-y-3">
        {latestDonations.slice(0, 3).map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-between"
            style={{
              transform: 'translateX(0)',
              opacity: 1 - i * 0.2,
              transition: 'all 0.4s ease',
            }}
          >
            <span className="text-sm text-gray-300 truncate">{d.name}</span>
            <span className="text-sm font-bold" style={{ color: brandColor }}>
              ₹{d.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 14: Cinematic Display
// ============================================================================
export const CinematicLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col justify-center p-6">
      {/* Background vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)`,
        }}
      />
      
      <div className="relative z-10">
        {/* Top Donator */}
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: brandColor }}>
            In Recognition
          </div>
          <div
            className="text-2xl text-white font-light"
            style={{ textShadow: `0 0 30px ${brandColor}40` }}
          >
            {topDonator?.name || '—'}
          </div>
          <div className="text-lg mt-3" style={{ color: brandColor }}>
            ₹{topDonator?.totalAmount.toLocaleString() || '0'}
          </div>
          {/* Decorative element */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-8" style={{ background: `${brandColor}40` }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: brandColor }} />
            <div className="h-px w-8" style={{ background: `${brandColor}40` }} />
          </div>
        </div>
        
        {/* Recent */}
        <div className="space-y-2 text-center">
          {latestDonations.slice(0, 3).map((d, i) => (
            <div key={i} className="text-sm">
              <span className="text-gray-400">{d.name}</span>
              <span className="mx-2 text-gray-600">•</span>
              <span className="text-gray-500">₹{d.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// LEADERBOARD VARIANT 15: Reactive Media Focus
// ============================================================================
export const ReactiveMediaFocusLeaderboard: React.FC<LeaderboardProps> = ({ topDonator, latestDonations, brandColor }) => {
  return (
    <GlassCard brandColor={brandColor} blur={15} className="w-full h-full">
      <div className="p-4 h-full flex flex-col">
        {/* Top Donator with media-style presentation */}
        <div
          className="mb-4 p-4 rounded-xl text-center"
          style={{
            background: `linear-gradient(135deg, ${brandColor}20 0%, transparent 100%)`,
            border: `1px solid ${brandColor}30`,
          }}
        >
          <div className="text-xs uppercase tracking-wider mb-2" style={{ color: brandColor }}>
            Featured Supporter
          </div>
          <div className="text-xl font-bold text-white">{topDonator?.name || '—'}</div>
          <div className="text-lg mt-1" style={{ color: brandColor }}>
            ₹{topDonator?.totalAmount.toLocaleString() || '0'}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="flex-1 overflow-hidden">
          <div className="text-xs uppercase tracking-wider mb-3 text-gray-500">
            Activity Feed
          </div>
          <div className="space-y-2">
            {latestDonations.slice(0, 3).map((d, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <span className="text-sm text-gray-300 truncate">{d.name}</span>
                <span
                  className="text-sm font-medium px-2 py-0.5 rounded"
                  style={{
                    background: `${brandColor}20`,
                    color: brandColor,
                  }}
                >
                  ₹{d.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

// Export all variants as array for system registration
export const LB_VARIANTS = [
  CyberpunkLeaderboard,
  HolographicLeaderboard,
  EsportsLeaderboard,
  AnimeEnergyLeaderboard,
  MinimalLuxuryLeaderboard,
  FuturisticHUDLeaderboard,
  AIAssistantLeaderboard,
  RGBGamerLeaderboard,
  DarkPremiumGlassLeaderboard,
  LiquidMotionLeaderboard,
  TerminalHackerLeaderboard,
  TwitchUltraModernLeaderboard,
  KineticTypographyLeaderboard,
  CinematicLeaderboard,
  ReactiveMediaFocusLeaderboard,
];

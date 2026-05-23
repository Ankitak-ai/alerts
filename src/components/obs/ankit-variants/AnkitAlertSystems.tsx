import React, { useEffect, useState, useRef } from 'react';
import type { VariantDonation } from './AnkitAlertVariants';
import { GlassCard, GlowBorder, AnimatedCounter, ParticleField, Scanline, NeonText } from './ui-primitives';

interface AlertProps {
  donation: VariantDonation;
  brandColor: string;
}

// ============================================================================
// ALERT VARIANT 1: Cyberpunk Neural Interface
// ============================================================================
export const CyberpunkAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <ParticleField count={30} color={brandColor} speed={2} />
      <Scanline color={brandColor} opacity={0.15} speed={4} />
      
      <div
        className="absolute inset-0 flex flex-col items-center justify-center p-6"
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, ${brandColor}20 50%, rgba(0,0,0,0.95) 100%)`,
          clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)',
        }}
      >
        <div
          className="text-center"
          style={{
            transform: visible ? 'scale(1)' : 'scale(0.8)',
            opacity: visible ? 1 : 0,
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <NeonText color={brandColor} intensity={1.5} className="text-3xl font-black tracking-wider">
            NEURAL LINK
          </NeonText>
          <div className="mt-2 text-4xl font-bold text-white tracking-tight">
            <AnimatedCounter value={donation.amount} prefix="₹" />
          </div>
          <div className="mt-1 text-lg" style={{ color: brandColor }}>
            {donation.name || 'Anonymous'}
          </div>
          {donation.message && (
            <div className="mt-3 max-w-md px-4 py-2 text-sm text-gray-300 font-mono"
              style={{
                background: 'rgba(0,0,0,0.6)',
                borderLeft: `3px solid ${brandColor}`,
              }}
            >
              {donation.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ALERT VARIANT 2: Holographic Projection
// ============================================================================
export const HolographicAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setPhase(1);
    const t1 = setTimeout(() => setPhase(2), 300);
    const t2 = setTimeout(() => setPhase(3), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${brandColor}15 0%, transparent 70%)`,
        }}
      />
      
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div
          className="relative"
          style={{
            transform: phase >= 2 ? 'translateY(0) rotateX(0)' : 'translateY(20px) rotateX(10deg)',
            opacity: phase >= 2 ? 1 : 0.5,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Hologram base */}
          <div
            className="absolute -inset-4 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${brandColor}40 0%, transparent 70%)`,
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          
          <GlassCard brandColor={brandColor} blur={20} bgOpacity={0.1}>
            <div className="p-6 text-center">
              <div
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: brandColor }}
              >
                Transmission Received
              </div>
              <div className="mt-3 text-5xl font-black text-white">
                ₹<AnimatedCounter value={donation.amount} />
              </div>
              <div className="mt-2 text-xl text-gray-200">
                {donation.name || 'Unknown Source'}
              </div>
              {donation.message && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: `${brandColor}40` }}>
                  <div className="text-sm text-gray-400 italic">
                    "{donation.message}"
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// ALERT VARIANT 3: Esports Broadcast
// ============================================================================
export const EsportsAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(true);
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 flex">
        {/* Left accent bar */}
        <div
          className="h-full w-3"
          style={{
            background: brandColor,
            transform: entered ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'bottom',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        
        {/* Main content */}
        <div className="flex-1 flex items-center px-6">
          <div
            className="flex-1"
            style={{
              transform: entered ? 'translateX(0)' : 'translateX(-30px)',
              opacity: entered ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
            }}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-white">
                ₹<AnimatedCounter value={donation.amount} duration={1500} />
              </span>
              <span className="text-sm uppercase tracking-widest" style={{ color: brandColor }}>
                Donation
              </span>
            </div>
            <div className="mt-1 text-lg text-gray-300 font-medium">
              {donation.name || 'Anonymous Player'}
            </div>
            {donation.message && (
              <div className="mt-2 text-sm text-gray-400 line-clamp-2">
                {donation.message}
              </div>
            )}
          </div>
        </div>
        
        {/* Right decorative element */}
        <div
          className="h-full w-16 flex items-center justify-center"
          style={{
            background: `linear-gradient(90deg, transparent, ${brandColor}20)`,
          }}
        >
          <div
            className="w-8 h-8 rotate-45"
            style={{
              border: `2px solid ${brandColor}`,
              opacity: entered ? 1 : 0,
              transition: 'opacity 0.3s ease 0.3s',
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ALERT VARIANT 4: Anime Energy Burst
// ============================================================================
export const AnimeEnergyAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [burst, setBurst] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setBurst(true);
    const t1 = setTimeout(() => setShowContent(true), 200);
    const t2 = setTimeout(() => setBurst(false), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* Energy burst effect */}
      {burst && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle, ${brandColor}60 0%, transparent 60%)`,
              animation: 'energyBurst 0.8s ease-out forwards',
            }}
          />
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-20"
              style={{
                background: brandColor,
                transform: `rotate(${i * 45}deg) translateY(-50%)`,
                transformOrigin: 'center',
                animation: 'energyRay 0.6s ease-out forwards',
                animationDelay: `${i * 0.02}s`,
              }}
            />
          ))}
        </>
      )}
      
      {/* Content */}
      <div
        className="relative z-10 text-center px-8"
        style={{
          transform: showContent ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-10deg)',
          opacity: showContent ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div className="text-6xl font-black text-white drop-shadow-lg">
          ₹{donation.amount.toLocaleString()}
        </div>
        <div
          className="mt-2 text-xl font-bold"
          style={{ color: brandColor, textShadow: `0 0 20px ${brandColor}` }}
        >
          {donation.name || 'Hero'}
        </div>
        {donation.message && (
          <div
            className="mt-3 px-4 py-2 text-sm text-white rounded-lg"
            style={{
              background: `${brandColor}40`,
              backdropFilter: 'blur(10px)',
            }}
          >
            {donation.message}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes energyBurst {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes energyRay {
          0% { transform: rotate(var(--rotation)) scaleY(0); opacity: 1; }
          100% { transform: rotate(var(--rotation)) scaleY(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// ALERT VARIANT 5: Minimal Luxury
// ============================================================================
export const MinimalLuxuryAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-8">
      <div
        className="text-center"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          className="text-xs uppercase tracking-[0.4em]"
          style={{ color: brandColor }}
        >
          Generous Support
        </div>
        <div className="mt-4 text-5xl font-light text-white">
          ₹<AnimatedCounter value={donation.amount} duration={2000} />
        </div>
        <div className="mt-3 text-lg text-gray-400 font-light tracking-wide">
          {donation.name || 'Anonymous'}
        </div>
        {donation.message && (
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="text-sm text-gray-500 italic font-light">
              {donation.message}
            </div>
          </div>
        )}
        {/* Decorative line */}
        <div
          className="mt-6 h-px mx-auto"
          style={{
            width: '60px',
            background: `linear-gradient(90deg, transparent, ${brandColor}, transparent)`,
          }}
        />
      </div>
    </div>
  );
};

// ============================================================================
// ALERT VARIANT 6: Futuristic HUD
// ============================================================================
export const FuturisticHUDAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden p-4">
      {/* Corner brackets */}
      {[
        { pos: 'top-0 left-0', rotate: '0deg' },
        { pos: 'top-0 right-0', rotate: '90deg' },
        { pos: 'bottom-0 right-0', rotate: '180deg' },
        { pos: 'bottom-0 left-0', rotate: '270deg' },
      ].map((corner, i) => (
        <div
          key={i}
          className={`absolute ${corner.pos} w-12 h-12`}
          style={{
            borderTop: `2px solid ${brandColor}`,
            borderLeft: `2px solid ${brandColor}`,
            transform: `rotate(${corner.rotate})`,
            opacity: active ? 1 : 0,
            transition: 'opacity 0.3s ease',
            transitionDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="text-center"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 0.4s ease 0.3s',
          }}
        >
          <div className="text-xs font-mono" style={{ color: brandColor }}>
            INCOMING TRANSMISSION
          </div>
          <div className="mt-2 text-4xl font-mono font-bold text-white">
            ₺<AnimatedCounter value={donation.amount} />
          </div>
          <div className="mt-1 text-sm font-mono text-gray-400">
            SOURCE: {(donation.name || 'UNKNOWN').toUpperCase()}
          </div>
          {donation.message && (
            <div className="mt-3 max-w-xs text-xs font-mono text-gray-500 truncate">
              MSG: {donation.message}
            </div>
          )}
        </div>
      </div>
      
      {/* Scanning line */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          background: brandColor,
          opacity: 0.3,
          animation: active ? 'scan 2s linear infinite' : 'none',
        }}
      />
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// ALERT VARIANT 7: AI Assistant
// ============================================================================
export const AIAssistantAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [speaking, setSpeaking] = useState(false);
  const [waveHeights, setWaveHeights] = useState<number[]>([20, 40, 60, 40, 20]);

  useEffect(() => {
    setSpeaking(true);
    const interval = setInterval(() => {
      setWaveHeights(prev => prev.map(() => Math.random() * 40 + 20));
    }, 150);
    return () => {
      clearInterval(interval);
      setSpeaking(false);
    };
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-6">
      <GlassCard brandColor={brandColor} blur={15} className="w-full">
        <div className="flex items-center gap-4 p-4">
          {/* AI orb */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full blur-lg"
              style={{
                background: `radial-gradient(circle, ${brandColor}60 0%, transparent 70%)`,
                animation: speaking ? 'orbPulse 0.5s ease-in-out infinite' : 'none',
              }}
            />
            <div
              className="w-10 h-10 rounded-full"
              style={{
                background: brandColor,
                boxShadow: `0 0 20px ${brandColor}`,
              }}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <div className="text-sm" style={{ color: brandColor }}>
              Donation Detected
            </div>
            <div className="text-2xl font-bold text-white">
              ₹{donation.amount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">
              from {donation.name || 'Anonymous'}
            </div>
          </div>
          
          {/* Wave visualizer */}
          <div className="flex items-end gap-1 h-8">
            {waveHeights.map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full"
                style={{
                  height: `${h}%`,
                  background: brandColor,
                  transition: 'height 0.15s ease',
                }}
              />
            ))}
          </div>
        </div>
      </GlassCard>
      
      <style>{`
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// ALERT VARIANT 8: RGB Gamer
// ============================================================================
export const RGBGamerAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [rgbPhase, setRgbPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRgbPhase(prev => (prev + 1) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const rgbColor = `hsl(${rgbPhase}, 100%, 50%)`;

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* RGB border glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from ${rgbPhase}deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)`,
          opacity: 0.3,
          filter: 'blur(20px)',
        }}
      />
      
      <div
        className="relative z-10 text-center px-8 py-6"
        style={{
          background: 'rgba(0,0,0,0.8)',
          border: `2px solid ${rgbColor}`,
          borderRadius: 12,
          boxShadow: `0 0 30px ${rgbColor}40, inset 0 0 30px ${rgbColor}20`,
        }}
      >
        <div
          className="text-4xl font-black"
          style={{
            background: `linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff)`,
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'rgbShift 0.5s linear infinite',
          }}
        >
          ₹{donation.amount.toLocaleString()}
        </div>
        <div className="mt-2 text-lg font-bold text-white">
          {donation.name || 'Gamer'}
        </div>
        {donation.message && (
          <div className="mt-2 text-sm text-gray-400">
            {donation.message}
          </div>
        )}
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
// ALERT VARIANT 9: Dark Premium Glass
// ============================================================================
export const DarkPremiumGlassAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(true);
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-6">
      <GlassCard brandColor={brandColor} blur={20} borderOpacity={0.2} bgOpacity={0.08}>
        <div className="p-8 text-center">
          {/* Top accent */}
          <div
            className="h-1 w-20 mx-auto rounded-full"
            style={{
              background: brandColor,
              boxShadow: `0 0 20px ${brandColor}`,
              transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          
          <div
            className="mt-6 text-5xl font-bold text-white"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.5s ease 0.2s',
            }}
          >
            ₹<AnimatedCounter value={donation.amount} duration={1500} />
          </div>
          
          <div
            className="mt-3 text-lg text-gray-300"
            style={{
              opacity: revealed ? 1 : 0,
              transition: 'opacity 0.5s ease 0.4s',
            }}
          >
            {donation.name || 'Valued Supporter'}
          </div>
          
          {donation.message && (
            <div
              className="mt-6 pt-6 border-t border-gray-800"
              style={{
                opacity: revealed ? 1 : 0,
                transition: 'opacity 0.5s ease 0.6s',
              }}
            >
              <div className="text-sm text-gray-500 italic">
                "{donation.message}"
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

// ============================================================================
// ALERT VARIANT 10: Liquid Motion
// ============================================================================
export const LiquidMotionAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [flowing, setFlowing] = useState(false);

  useEffect(() => {
    setFlowing(true);
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* Liquid background */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={brandColor} stopOpacity="0.3" />
              <stop offset="50%" stopColor={brandColor} stopOpacity="0.1" />
              <stop offset="100%" stopColor={brandColor} stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z"
            fill="url(#liquidGrad)"
            style={{
              animation: flowing ? 'liquidFlow 3s ease-in-out infinite' : 'none',
            }}
          />
          <path
            d="M0,100 Q100,150 200,100 T400,100 L400,200 L0,200 Z"
            fill="url(#liquidGrad)"
            style={{
              animation: flowing ? 'liquidFlow2 4s ease-in-out infinite' : 'none',
              opacity: 0.5,
            }}
          />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <div
          className="text-5xl font-bold text-white drop-shadow-lg"
          style={{
            textShadow: `0 0 30px ${brandColor}`,
          }}
        >
          ₹{donation.amount.toLocaleString()}
        </div>
        <div
          className="mt-2 text-lg"
          style={{
            color: brandColor,
            textShadow: `0 0 10px ${brandColor}`,
          }}
        >
          {donation.name || 'Supporter'}
        </div>
        {donation.message && (
          <div className="mt-3 px-4 py-2 text-sm text-white bg-black/30 rounded-full backdrop-blur-sm">
            {donation.message}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes liquidFlow {
          0%, 100% { d: path("M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z"); }
          50% { d: path("M0,100 Q100,80 200,60 T400,100 L400,200 L0,200 Z"); }
        }
        @keyframes liquidFlow2 {
          0%, 100% { d: path("M0,100 Q100,150 200,100 T400,100 L400,200 L0,200 Z"); }
          50% { d: path("M0,100 Q100,120 200,140 T400,100 L400,200 L0,200 Z"); }
        }
      `}</style>
    </div>
  );
};

// ============================================================================
// ALERT VARIANT 11: Terminal Hacker
// ============================================================================
export const TerminalHackerAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [showAmount, setShowAmount] = useState(false);

  useEffect(() => {
    const terminalLines = [
      '> INITIATING CONNECTION...',
      '> DONATION PACKET RECEIVED',
      `> AMOUNT: ₹${donation.amount.toLocaleString()}`,
      `> SOURCE: ${donation.name || 'ANONYMOUS'}`,
    ];
    
    let delay = 0;
    terminalLines.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (i === terminalLines.length - 2) setShowAmount(true);
      }, delay);
      delay += 300;
    });
    
    if (donation.message) {
      setTimeout(() => {
        setLines(prev => [...prev, `> MSG: ${donation.message}`]);
      }, delay);
    }
  }, [donation.id, donation.amount, donation.name, donation.message]);

  return (
    <div className="relative w-full h-full overflow-hidden p-4 font-mono text-sm">
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.95)',
          border: `1px solid ${brandColor}40`,
        }}
      />
      
      <div className="relative z-10 h-full overflow-hidden flex flex-col justify-end pb-4">
        {lines.map((line, i) => (
          <div
            key={i}
            className="truncate"
            style={{
              color: i === lines.length - 1 ? brandColor : '#00ff00',
              opacity: 0.8,
              textShadow: i === lines.length - 1 ? `0 0 10px ${brandColor}` : '0 0 5px #00ff00',
            }}
          >
            {line}
            {i === lines.length - 1 && <span className="animate-pulse">_</span>}
          </div>
        ))}
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
// ALERT VARIANT 12: Twitch Ultra Modern
// ============================================================================
export const TwitchUltraModernAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(true);
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center p-4">
      <div
        className="flex items-center gap-4 flex-1"
        style={{
          background: 'rgba(15,15,20,0.95)',
          borderRadius: 12,
          padding: '16px 20px',
          transform: expanded ? 'translateX(0)' : 'translateX(-100%)',
          opacity: expanded ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Avatar placeholder */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white"
          style={{
            background: brandColor,
            flexShrink: 0,
          }}
        >
          {(donation.name || 'A')[0].toUpperCase()}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold truncate">
              {donation.name || 'Anonymous'}
            </span>
            <span
              className="px-2 py-0.5 text-xs font-bold text-white rounded"
              style={{ background: brandColor }}
            >
              DONATED
            </span>
          </div>
          <div className="text-2xl font-bold text-white mt-1">
            ₹{donation.amount.toLocaleString()}
          </div>
          {donation.message && (
            <div className="text-sm text-gray-400 mt-1 truncate">
              {donation.message}
            </div>
          )}
        </div>
        
        {/* Decorative chevron */}
        <div
          className="w-8 h-8"
          style={{
            borderRight: `2px solid ${brandColor}`,
            borderTop: `2px solid ${brandColor}`,
            transform: 'rotate(45deg)',
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
};

// ============================================================================
// ALERT VARIANT 13: Kinetic Typography
// ============================================================================
export const KineticTypographyAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 5000);
    return () => clearTimeout(timer);
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      <div className="text-center">
        {/* Amount with kinetic effect */}
        <div className="relative overflow-hidden">
          <div
            className="text-7xl font-black text-white"
            style={{
              transform: animating ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            ₹{donation.amount.toLocaleString()}
          </div>
        </div>
        
        {/* Name sliding in */}
        <div className="relative overflow-hidden mt-2">
          <div
            className="text-2xl font-bold"
            style={{
              color: brandColor,
              transform: animating ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
            }}
          >
            {donation.name || 'SUPPORTER'}
          </div>
        </div>
        
        {/* Message reveal */}
        {donation.message && (
          <div className="relative overflow-hidden mt-4">
            <div
              className="text-sm text-gray-400 max-w-xs"
              style={{
                transform: animating ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.4s ease 0.3s',
              }}
            >
              {donation.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// ALERT VARIANT 14: Cinematic Reveal
// ============================================================================
export const CinematicRevealAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    setStage(1);
    const t1 = setTimeout(() => setStage(2), 800);
    const t2 = setTimeout(() => setStage(3), 1200);
    const t3 = setTimeout(() => setStage(4), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* Curtain effect */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-black z-20"
        style={{
          transform: stage >= 2 ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-black z-20"
        style={{
          transform: stage >= 2 ? 'translateY(100%)' : 'translateY(0)',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
        }}
      />
      
      {/* Background glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, ${brandColor}30 0%, transparent 70%)`,
          opacity: stage >= 1 ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-8">
        <div
          className="text-xs uppercase tracking-[0.5em]"
          style={{
            color: brandColor,
            opacity: stage >= 3 ? 1 : 0,
            transform: stage >= 3 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.5s',
          }}
        >
          Special Thanks
        </div>
        
        <div
          className="text-6xl font-black text-white mt-4"
          style={{
            opacity: stage >= 3 ? 1 : 0,
            transform: stage >= 3 ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s',
            textShadow: `0 0 40px ${brandColor}60`,
          }}
        >
          ₹<AnimatedCounter value={donation.amount} duration={2000} />
        </div>
        
        <div
          className="text-2xl text-gray-300 mt-4"
          style={{
            opacity: stage >= 4 ? 1 : 0,
            transform: stage >= 4 ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease 0.8s',
          }}
        >
          {donation.name || 'Anonymous'}
        </div>
        
        {donation.message && (
          <div
            className="mt-6 pt-6 border-t border-gray-800"
            style={{
              opacity: stage >= 4 ? 1 : 0,
              transition: 'opacity 0.5s ease 1s',
            }}
          >
            <div className="text-sm text-gray-500 italic">
              {donation.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// ALERT VARIANT 15: Reactive Media Focus
// ============================================================================
export const ReactiveMediaFocusAlert: React.FC<AlertProps> = ({ donation, brandColor }) => {
  const [active, setActive] = useState(false);
  const hasMedia = donation.media_url || donation.hypersound_url || donation.voice_message_url;

  useEffect(() => {
    setActive(true);
  }, [donation.id]);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-6">
      {/* Dynamic background based on media presence */}
      <div
        className="absolute inset-0"
        style={{
          background: hasMedia
            ? `radial-gradient(ellipse at center, ${brandColor}20 0%, transparent 70%)`
            : `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, ${brandColor}15 50%, rgba(0,0,0,0.8) 100%)`,
        }}
      />
      
      {/* Media indicator */}
      {hasMedia && (
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{
            background: brandColor,
            animation: active ? 'mediaPulse 2s ease-in-out infinite' : 'none',
          }}
        >
          MEDIA ATTACHED
        </div>
      )}
      
      <div
        className="relative z-10 text-center"
        style={{
          transform: active ? 'scale(1)' : 'scale(0.9)',
          opacity: active ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Icon based on media type */}
        {hasMedia && (
          <div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{
              background: `linear-gradient(135deg, ${brandColor}, ${brandColor}80)`,
              boxShadow: `0 0 30px ${brandColor}60`,
            }}
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
          </div>
        )}
        
        <div className="text-5xl font-bold text-white">
          ₹{donation.amount.toLocaleString()}
        </div>
        <div
          className="mt-2 text-lg"
          style={{ color: brandColor }}
        >
          {donation.name || 'Supporter'}
        </div>
        {donation.message && (
          <div className="mt-4 max-w-sm mx-auto px-4 py-3 text-sm text-gray-300 rounded-lg"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {donation.message}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes mediaPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

// Export all variants as array for system registration
export const ALERT_VARIANTS = [
  CyberpunkAlert,
  HolographicAlert,
  EsportsAlert,
  AnimeEnergyAlert,
  MinimalLuxuryAlert,
  FuturisticHUDAlert,
  AIAssistantAlert,
  RGBGamerAlert,
  DarkPremiumGlassAlert,
  LiquidMotionAlert,
  TerminalHackerAlert,
  TwitchUltraModernAlert,
  KineticTypographyAlert,
  CinematicRevealAlert,
  ReactiveMediaFocusAlert,
];

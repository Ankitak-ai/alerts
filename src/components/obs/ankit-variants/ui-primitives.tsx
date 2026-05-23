import React, { useEffect, useRef } from 'react';

interface GlowBorderProps {
  children: React.ReactNode;
  color: string;
  intensity?: number;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const GlowBorder: React.FC<GlowBorderProps> = ({
  children,
  color,
  intensity = 1,
  animated = false,
  className = '',
  style = {},
}) => {
  const hexToRgba = (hex: string, alpha: number) => {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    const r = parseInt(full.substring(0, 2), 16);
    const g = parseInt(full.substring(2, 4), 16);
    const b = parseInt(full.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const baseGlow = hexToRgba(color, 0.3 * intensity);
  const strongGlow = hexToRgba(color, 0.6 * intensity);
  const coreGlow = hexToRgba(color, 0.9 * intensity);

  return (
    <div
      className={`relative ${className}`}
      style={{
        ...style,
        boxShadow: animated
          ? `0 0 ${20 * intensity}px ${baseGlow}, 0 0 ${40 * intensity}px ${strongGlow}, 0 0 ${60 * intensity}px ${coreGlow}`
          : `0 0 ${10 * intensity}px ${baseGlow}, 0 0 ${20 * intensity}px ${strongGlow}`,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {children}
    </div>
  );
};

interface GradientBgProps {
  colors: [string, string, string];
  angle?: number;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const GradientBg: React.FC<GradientBgProps> = ({
  colors,
  angle = 135,
  animated = false,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        background: `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
        backgroundSize: animated ? '200% 200%' : '100% 100%',
        animation: animated ? 'gradientShift 3s ease infinite' : undefined,
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

interface GlassCardProps {
  children: React.ReactNode;
  brandColor: string;
  blur?: number;
  borderOpacity?: number;
  bgOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  brandColor,
  blur = 10,
  borderOpacity = 0.3,
  bgOpacity = 0.15,
  className = '',
  style = {},
}) => {
  const hexToRgba = (hex: string, alpha: number) => {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    const r = parseInt(full.substring(0, 2), 16);
    const g = parseInt(full.substring(2, 4), 16);
    const b = parseInt(full.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div
      className={`relative ${className}`}
      style={{
        ...style,
        background: `linear-gradient(135deg, ${hexToRgba(brandColor, bgOpacity)} 0%, rgba(10,10,15,${bgOpacity * 1.5}) 55%, rgba(10,10,15,${bgOpacity * 2}) 100%)`,
        borderRadius: 14,
        border: `1px solid ${hexToRgba(brandColor, borderOpacity)}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${hexToRgba(brandColor, borderOpacity * 0.5)} inset`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
      }}
    >
      {children}
    </div>
  );
};

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  className = '',
  style = {},
}) => {
  const [displayValue, setDisplayValue] = React.useState(0);
  const prevValue = useRef(value);

  useEffect(() => {
    if (value !== prevValue.current) {
      const start = prevValue.current;
      const end = value;
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(start + (end - start) * eased));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          prevValue.current = value;
        }
      };

      requestAnimationFrame(animate);
    }
  }, [value, duration]);

  useEffect(() => {
    setDisplayValue(value);
    prevValue.current = value;
  }, [value]);

  return (
    <span className={className} style={style}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

interface ParticleFieldProps {
  count?: number;
  color: string;
  speed?: number;
  className?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 20,
  color,
  speed = 1,
  className = '',
}) => {
  const particles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: color,
            opacity: 0.3,
            animation: `float ${p.duration / speed}s ease-in-out infinite`,
            animationDelay: `-${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.4; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

interface ScanlineProps {
  color?: string;
  opacity?: number;
  speed?: number;
  className?: string;
}

export const Scanline: React.FC<ScanlineProps> = ({
  color = '#ffffff',
  opacity = 0.1,
  speed = 3,
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${color}20 2px, ${color}20 4px)`,
      }}
    >
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          background: color,
          opacity,
          animation: `scanline ${speed}s linear infinite`,
        }}
      />
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

interface NeonTextProps {
  children: React.ReactNode;
  color: string;
  intensity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const NeonText: React.FC<NeonTextProps> = ({
  children,
  color,
  intensity = 1,
  className = '',
  style = {},
}) => {
  return (
    <span
      className={className}
      style={{
        ...style,
        color,
        textShadow: `0 0 ${5 * intensity}px ${color}, 0 0 ${10 * intensity}px ${color}, 0 0 ${20 * intensity}px ${color}, 0 0 ${40 * intensity}px ${color}80`,
      }}
    >
      {children}
    </span>
  );
};

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 50,
  onComplete,
  className = '',
  style = {},
}) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  useEffect(() => {
    setDisplayText(text);
    setCurrentIndex(text.length);
  }, [text]);

  return (
    <span className={className} style={style}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

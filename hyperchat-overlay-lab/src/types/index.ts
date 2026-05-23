export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  currency: string;
  message: string;
  timestamp: number;
  avatar?: string;
  isAnonymous?: boolean;
  mediaUrl?: string;
  mediaType?: 'image' | 'gif' | 'video';
  soundUrl?: string;
  ttsEnabled?: boolean;
  variant?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  totalAmount: number;
  avatar?: string;
  badge?: string;
}

export interface AlertEvent {
  id: string;
  type: 'donation' | 'subscription' | 'follow' | 'raid' | 'host' | 'cheer' | 'custom';
  data: Donation | Record<string, unknown>;
  priority: number;
  duration: number;
  createdAt: number;
}

export interface OverlayConfig {
  variant: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  scale: number;
  opacity: number;
  maxVisibleAlerts: number;
  alertDuration: number;
  queueEnabled: boolean;
  animationsEnabled: boolean;
  soundEnabled: boolean;
  ttsEnabled: boolean;
  showLeaderboard: boolean;
  leaderboardPosition: 'left' | 'right' | 'top' | 'bottom';
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };
}

export interface SimulationSettings {
  autoGenerateEvents: boolean;
  eventFrequency: number;
  burstMode: boolean;
  burstCount: number;
  minDonation: number;
  maxDonation: number;
  includeMedia: boolean;
  includeTTS: boolean;
  spamMode: boolean;
}

export interface PerformanceMetrics {
  fps: number;
  renderTime: number;
  memoryUsage: number;
  activeAlerts: number;
  queuedAlerts: number;
  totalEventsProcessed: number;
}

export type OverlayVariant = 
  | 'cyberpunk'
  | 'esports'
  | 'holographic'
  | 'anime'
  | 'luxury'
  | 'ai-assistant'
  | 'rgb-gaming'
  | 'terminal'
  | 'cinematic'
  | 'kinetic'
  | 'twitch-ultra'
  | 'reactive-media'
  | 'liquid-motion'
  | 'scifi-broadcast'
  | 'default';

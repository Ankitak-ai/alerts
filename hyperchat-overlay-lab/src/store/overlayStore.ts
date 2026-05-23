import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Donation, AlertEvent, OverlayConfig, SimulationSettings, PerformanceMetrics, LeaderboardEntry } from '@/types';

interface OverlayState {
  // Events
  activeAlerts: AlertEvent[];
  queuedAlerts: AlertEvent[];
  processedEvents: AlertEvent[];
  
  // Leaderboard
  leaderboard: LeaderboardEntry[];
  
  // Configuration
  config: OverlayConfig;
  simulationSettings: SimulationSettings;
  
  // Performance
  metrics: PerformanceMetrics;
  
  // UI State
  isPreviewMode: boolean;
  isDebugMode: boolean;
  selectedVariant: string;
  
  // Actions
  addAlert: (alert: Omit<AlertEvent, 'id' | 'createdAt'>) => void;
  removeAlert: (id: string) => void;
  processQueue: () => void;
  clearAllAlerts: () => void;
  
  // Leaderboard actions
  updateLeaderboard: (entries: LeaderboardEntry[]) => void;
  addToLeaderboard: (entry: Omit<LeaderboardEntry, 'rank'>) => void;
  
  // Config actions
  updateConfig: (config: Partial<OverlayConfig>) => void;
  updateSimulationSettings: (settings: Partial<SimulationSettings>) => void;
  
  // Performance actions
  updateMetrics: (metrics: Partial<PerformanceMetrics>) => void;
  
  // UI actions
  togglePreviewMode: () => void;
  toggleDebugMode: () => void;
  setSelectedVariant: (variant: string) => void;
}

const defaultConfig: OverlayConfig = {
  variant: 'default',
  position: 'bottom-right',
  scale: 1,
  opacity: 1,
  maxVisibleAlerts: 3,
  alertDuration: 5000,
  queueEnabled: true,
  animationsEnabled: true,
  soundEnabled: true,
  ttsEnabled: false,
  showLeaderboard: true,
  leaderboardPosition: 'right',
  theme: {
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    accentColor: '#06b6d4',
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    textColor: '#ffffff',
    fontFamily: 'Inter, sans-serif',
  },
};

const defaultSimulationSettings: SimulationSettings = {
  autoGenerateEvents: false,
  eventFrequency: 3000,
  burstMode: false,
  burstCount: 5,
  minDonation: 5,
  maxDonation: 500,
  includeMedia: true,
  includeTTS: false,
  spamMode: false,
};

const defaultMetrics: PerformanceMetrics = {
  fps: 60,
  renderTime: 0,
  memoryUsage: 0,
  activeAlerts: 0,
  queuedAlerts: 0,
  totalEventsProcessed: 0,
};

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: '1', username: 'CyberNinja', totalAmount: 5420, badge: 'diamond' },
  { rank: 2, userId: '2', username: 'PixelQueen', totalAmount: 3890, badge: 'gold' },
  { rank: 3, userId: '3', username: 'StreamKing', totalAmount: 2150, badge: 'silver' },
  { rank: 4, userId: '4', username: 'GameMaster', totalAmount: 1780, badge: 'bronze' },
  { rank: 5, userId: '5', username: 'ChatHero', totalAmount: 950, badge: 'default' },
];

export const useOverlayStore = create<OverlayState>((set, get) => ({
  // Initial state
  activeAlerts: [],
  queuedAlerts: [],
  processedEvents: [],
  leaderboard: mockLeaderboard,
  config: defaultConfig,
  simulationSettings: defaultSimulationSettings,
  metrics: defaultMetrics,
  isPreviewMode: true,
  isDebugMode: false,
  selectedVariant: 'default',
  
  addAlert: (alertData) => {
    const alert: AlertEvent = {
      ...alertData,
      id: uuidv4(),
      createdAt: Date.now(),
    };
    
    set((state) => {
      const newQueued = [...state.queuedAlerts, alert];
      return {
        queuedAlerts: newQueued,
        metrics: {
          ...state.metrics,
          queuedAlerts: newQueued.length,
        },
      };
    });
    
    // Auto-process if queue is enabled
    if (get().config.queueEnabled) {
      setTimeout(() => get().processQueue(), 100);
    } else {
      // Immediately activate if queue disabled
      set((state) => ({
        activeAlerts: [...state.activeAlerts, alert],
        queuedAlerts: state.queuedAlerts.filter(a => a.id !== alert.id),
      }));
    }
  },
  
  removeAlert: (id) => {
    set((state) => ({
      activeAlerts: state.activeAlerts.filter(a => a.id !== id),
      processedEvents: [...state.processedEvents, ...state.activeAlerts.filter(a => a.id === id)],
      metrics: {
        ...state.metrics,
        activeAlerts: state.activeAlerts.filter(a => a.id !== id).length,
        totalEventsProcessed: state.metrics.totalEventsProcessed + 1,
      },
    }));
  },
  
  processQueue: () => {
    set((state) => {
      const availableSlots = state.config.maxVisibleAlerts - state.activeAlerts.length;
      if (availableSlots <= 0 || state.queuedAlerts.length === 0) return state;
      
      const toActivate = state.queuedAlerts.slice(0, availableSlots);
      const remaining = state.queuedAlerts.slice(availableSlots);
      
      return {
        activeAlerts: [...state.activeAlerts, ...toActivate],
        queuedAlerts: remaining,
        metrics: {
          ...state.metrics,
          activeAlerts: state.activeAlerts.length + toActivate.length,
          queuedAlerts: remaining.length,
        },
      };
    });
  },
  
  clearAllAlerts: () => {
    set({
      activeAlerts: [],
      queuedAlerts: [],
    });
  },
  
  updateLeaderboard: (entries) => {
    set({ leaderboard: entries });
  },
  
  addToLeaderboard: (entry) => {
    set((state) => {
      const existingIndex = state.leaderboard.findIndex(e => e.userId === entry.userId);
      let newLeaderboard;
      
      if (existingIndex >= 0) {
        newLeaderboard = state.leaderboard.map((e, i) => 
          i === existingIndex 
            ? { ...e, totalAmount: e.totalAmount + entry.totalAmount }
            : e
        );
      } else {
        newLeaderboard = [...state.leaderboard, { ...entry, rank: state.leaderboard.length + 1 }];
      }
      
      // Sort and re-rank
      newLeaderboard.sort((a, b) => b.totalAmount - a.totalAmount);
      newLeaderboard = newLeaderboard.map((e, i) => ({ ...e, rank: i + 1 }));
      
      return { leaderboard: newLeaderboard.slice(0, 10) };
    });
  },
  
  updateConfig: (newConfig) => {
    set((state) => ({
      config: { ...state.config, ...newConfig },
    }));
  },
  
  updateSimulationSettings: (newSettings) => {
    set((state) => ({
      simulationSettings: { ...state.simulationSettings, ...newSettings },
    }));
  },
  
  updateMetrics: (newMetrics) => {
    set((state) => ({
      metrics: { ...state.metrics, ...newMetrics },
    }));
  },
  
  togglePreviewMode: () => {
    set((state) => ({ isPreviewMode: !state.isPreviewMode }));
  },
  
  toggleDebugMode: () => {
    set((state) => ({ isDebugMode: !state.isDebugMode }));
  },
  
  setSelectedVariant: (variant) => {
    set({ selectedVariant: variant });
  },
}));

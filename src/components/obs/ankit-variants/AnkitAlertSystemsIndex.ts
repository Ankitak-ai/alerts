import React from 'react';
import type { VariantDonation } from './AnkitAlertVariants';
import {
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
} from './AnkitAlertSystems';

export interface AlertSystem {
  id: number;
  name: string;
  Alert: React.FC<{ donation: VariantDonation; brandColor: string }>;
}

export const ALERT_SYSTEMS: AlertSystem[] = [
  { id: 1, name: 'Cyberpunk', Alert: CyberpunkAlert },
  { id: 2, name: 'Holographic', Alert: HolographicAlert },
  { id: 3, name: 'Esports', Alert: EsportsAlert },
  { id: 4, name: 'Anime Energy', Alert: AnimeEnergyAlert },
  { id: 5, name: 'Minimal Luxury', Alert: MinimalLuxuryAlert },
  { id: 6, name: 'Futuristic HUD', Alert: FuturisticHUDAlert },
  { id: 7, name: 'AI Assistant', Alert: AIAssistantAlert },
  { id: 8, name: 'RGB Gamer', Alert: RGBGamerAlert },
  { id: 9, name: 'Dark Premium Glass', Alert: DarkPremiumGlassAlert },
  { id: 10, name: 'Liquid Motion', Alert: LiquidMotionAlert },
  { id: 11, name: 'Terminal Hacker', Alert: TerminalHackerAlert },
  { id: 12, name: 'Twitch Ultra Modern', Alert: TwitchUltraModernAlert },
  { id: 13, name: 'Kinetic Typography', Alert: KineticTypographyAlert },
  { id: 14, name: 'Cinematic Reveal', Alert: CinematicRevealAlert },
  { id: 15, name: 'Reactive Media Focus', Alert: ReactiveMediaFocusAlert },
];

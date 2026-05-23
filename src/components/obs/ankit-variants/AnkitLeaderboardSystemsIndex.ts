import React from 'react';
import type { LbDonation, LbTopDonator } from './AnkitAlertVariants';
import {
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
} from './AnkitLeaderboardSystems';

export interface LeaderboardSystem {
  id: number;
  name: string;
  Comp: React.FC<{ topDonator: LbTopDonator | null; latestDonations: LbDonation[]; brandColor: string }>;
}

export const LB_SYSTEMS: LeaderboardSystem[] = [
  { id: 1, name: 'Cyberpunk', Comp: CyberpunkLeaderboard },
  { id: 2, name: 'Holographic', Comp: HolographicLeaderboard },
  { id: 3, name: 'Esports', Comp: EsportsLeaderboard },
  { id: 4, name: 'Anime Energy', Comp: AnimeEnergyLeaderboard },
  { id: 5, name: 'Minimal Luxury', Comp: MinimalLuxuryLeaderboard },
  { id: 6, name: 'Futuristic HUD', Comp: FuturisticHUDLeaderboard },
  { id: 7, name: 'AI Assistant', Comp: AIAssistantLeaderboard },
  { id: 8, name: 'RGB Gamer', Comp: RGBGamerLeaderboard },
  { id: 9, name: 'Dark Premium Glass', Comp: DarkPremiumGlassLeaderboard },
  { id: 10, name: 'Liquid Motion', Comp: LiquidMotionLeaderboard },
  { id: 11, name: 'Terminal Hacker', Comp: TerminalHackerLeaderboard },
  { id: 12, name: 'Twitch Ultra Modern', Comp: TwitchUltraModernLeaderboard },
  { id: 13, name: 'Kinetic Typography', Comp: KineticTypographyLeaderboard },
  { id: 14, name: 'Cinematic', Comp: CinematicLeaderboard },
  { id: 15, name: 'Reactive Media Focus', Comp: ReactiveMediaFocusLeaderboard },
];

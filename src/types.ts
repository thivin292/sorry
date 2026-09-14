export type PageStep =
  | 'countdown'
  | 'welcome'
  | 'lock'
  | 'catch'
  | 'bottle'
  | 'card'
  | 'forgive'
  | 'final';

export interface ButterflyItem {
  id: number;
  message: string;
  isCaught: boolean;
  baseX: number; // percentage 0 - 100
  baseY: number; // percentage 0 - 100
  scale?: number;
  color?: string;
}

export interface AudioConfig {
  startTime: number;
  endTime: number;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  customAudioUrl: string | null;
  songTitle: string;
}

export interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

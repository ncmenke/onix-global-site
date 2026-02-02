export interface Message {
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: number;
}

export enum Sector {
  HYPERION = 'HYPERION',
  SENTINEL = 'SENTINEL',
  KERNEL = 'KERNEL',
}

export interface SystemMetrics {
  entropy: number;
  timestamp?: number;
}

export interface HyperionMetrics {
  plasmaStability: number;
  outputMW: number;
  coreTemp: number;
  containmentField: number;
}
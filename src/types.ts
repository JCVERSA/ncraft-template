export type GameMode = 'survival' | 'creative' | 'adventure';
export type Difficulty = 'peaceful' | 'easy' | 'normal' | 'hard';
export type DaemonState = 'ONLINE' | 'STOPPED' | 'FLASHING' | 'REBOOTING';
export type MascotState = 'idle' | 'active' | 'fail';
export type MinecraftDimension = 'overworld' | 'nether' | 'the_end';

export interface ServerProperties {
  serverName: string;
  levelName: string;
  gamemode: GameMode;
  difficulty: Difficulty;
  maxPlayers: number;
  port: number;
  v6Port: number;
  worldSeed: string;
  viewDistance: number;
  simulationDistance: number;
  cheatsEnabled: boolean;
}

export interface CartridgeConfig {
  id: string;
  expansionName: string;
  romSize: string;
  title: string;
  subtitle: string;
  icons: string;
  ratedTps: string;
  version: string;
  boxartStyle: 'nether' | 'end' | 'overworld';
  discName?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  dimensionTheme: MinecraftDimension;
}

export interface PipelineStep {
  id: number;
  name: string;
  time: string;
  status: 'pass' | 'active' | 'wait' | 'fail';
  minecraftIcon?: string;
}

export interface Operator {
  id: string;
  playerSlot?: string; // "1P", "2P", "3P"
  slotBg?: string;     // "#FFE600", "#00F0FF", "#FF4D8D"
  gamertag: string;
  xuid: string;
  role: string;
  roleBg?: string;
  isCorrupt?: boolean;
  skinType?: 'steve' | 'alex' | 'creeper' | 'knight' | 'warden';
  pingMs?: number;
}

export interface LogEntry {
  id: string;
  time: string;
  tag: 'INFO' | 'PASS' | 'WARN' | 'CONF' | 'CMD' | 'K.O.';
  message: string;
}

export interface TelemetryData {
  tps: number;
  ramUsageGb: number;
  cpuPercent: number;
  packetLoss: string;
  activeChunks: number;
  freeStorageGb: number;
  rank: string;
  hearts: number;      // 0 - 10
  hunger: number;      // 0 - 10
  armor: number;       // 0 - 10
}

export interface NetworkPingSample {
  time: string;
  ping: number;
  stability: number;
  jitter: number;
  isSpike?: boolean;
}


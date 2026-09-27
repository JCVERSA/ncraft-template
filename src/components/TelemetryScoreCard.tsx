import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { TelemetryData, NetworkPingSample } from '../types';
import {
  playMinecraftClick,
  playMinecraftStoneClick,
  playMinecraftXpOrb,
  playMinecraftPop,
  playMinecraftAnvil,
} from '../utils/soundEffects';
import {
  FoodIcon,
  ShieldIcon,
  PickaxeIcon,
  PingIcon,
  AlertIcon,
  LightningIcon,
} from './MinecraftIcons';

interface TelemetryScoreCardProps {
  telemetry: TelemetryData;
  daemonOnline?: boolean;
  onLogMessage?: (tag: 'INFO' | 'PASS' | 'WARN' | 'CONF' | 'CMD', message: string) => void;
}

// Generate an initial sequence of 16 live samples
const generateInitialSamples = (): NetworkPingSample[] => {
  const samples: NetworkPingSample[] = [];
  const now = Date.now();
  for (let i = 15; i >= 0; i--) {
    const timestamp = new Date(now - i * 2000);
    const timeStr = timestamp.toTimeString().split(' ')[0].slice(3, 8); // mm:ss
    // Sample 6 had a minor spike
    const isSpike = i === 6;
    const basePing = isSpike ? 82 : Math.floor(16 + Math.random() * 8);
    const stability = isSpike ? 91.5 : +(98.5 + Math.random() * 1.4).toFixed(1);
    const jitter = +(0.8 + Math.random() * 1.5).toFixed(1);

    samples.push({
      time: timeStr,
      ping: basePing,
      stability: Math.min(100, stability),
      jitter,
      isSpike,
    });
  }
  return samples;
};

// Custom Minecraft-themed tooltip for Recharts
const MinecraftChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data: NetworkPingSample = payload[0]?.payload;
    if (!data) return null;

    const ping = data.ping;
    const isSpike = ping >= 60;
    const isModerate = ping >= 35 && ping < 60;

    const pingColor = isSpike ? '#ef4444' : isModerate ? '#ffaa00' : '#55ff55';
    const statusText = isSpike
      ? 'LAG SPIKE DETECTED'
      : isModerate
      ? 'ELEVATED LATENCY'
      : 'OPTIMAL (20 TPS SYNC)';

    return (
      <div className="mc-tooltip p-2 bg-[#121214]/95 border-2 border-black font-pixel text-[8px] space-y-1 shadow-2xl min-w-[150px] z-50">
        <div className="flex items-center justify-between border-b border-black pb-1 text-zinc-300">
          <span>TIME: {label}</span>
          <span className="text-[#55ffff]">UDP RAKNET</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">RTT PING:</span>
          <span style={{ color: pingColor }} className="font-bold font-mono-code text-[10px]">
            {ping} ms
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">STABILITY:</span>
          <span className="text-[#55ffff] font-mono-code text-[9px]">
            {data.stability}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">JITTER:</span>
          <span className="text-[#ffaa00] font-mono-code text-[9px]">
            &plusmn;{data.jitter} ms
          </span>
        </div>

        <div
          className={`pt-1 border-t border-black text-[7px] font-bold ${
            isSpike ? 'text-[#ef4444] animate-pulse' : 'text-[#55ff55]'
          }`}
        >
          {isSpike && <AlertIcon size={10} className="inline mr-1" />}
          [{statusText}]
        </div>
      </div>
    );
  }
  return null;
};

export const TelemetryScoreCard: React.FC<TelemetryScoreCardProps> = ({
  telemetry,
  daemonOnline = true,
  onLogMessage,
}) => {
  const [samples, setSamples] = useState<NetworkPingSample[]>(generateInitialSamples);
  const [isSimulatingSpike, setIsSimulatingSpike] = useState(false);
  const [spikeCount, setSpikeCount] = useState(1);
  const lastSpikeRef = useRef<number>(0);

  // Live sampling timer: updates rolling window every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSamples((prev) => {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0].slice(3, 8); // mm:ss

        let nextPing: number;
        let nextStability: number;
        let nextJitter: number;
        let isSpike = false;

        if (!daemonOnline) {
          nextPing = 0;
          nextStability = 0;
          nextJitter = 0;
        } else if (Date.now() - lastSpikeRef.current < 2500) {
          // In the middle of an artificial or triggered spike
          nextPing = Math.floor(105 + Math.random() * 35);
          nextStability = +(88 + Math.random() * 4).toFixed(1);
          nextJitter = +(4.5 + Math.random() * 3).toFixed(1);
          isSpike = true;
        } else {
          // Normal jitter with 5% chance of spontaneous Bedrock entity tick spike
          const spontaneousSpike = Math.random() < 0.06;
          if (spontaneousSpike) {
            nextPing = Math.floor(62 + Math.random() * 25);
            nextStability = +(92 + Math.random() * 3).toFixed(1);
            nextJitter = +(3.2 + Math.random() * 1.5).toFixed(1);
            isSpike = true;
          } else {
            nextPing = Math.floor(15 + Math.random() * 8);
            nextStability = +(98.2 + Math.random() * 1.6).toFixed(1);
            nextJitter = +(0.6 + Math.random() * 1.2).toFixed(1);
          }
        }

        const newSample: NetworkPingSample = {
          time: timeStr,
          ping: nextPing,
          stability: Math.min(100, nextStability),
          jitter: nextJitter,
          isSpike,
        };

        // Keep rolling buffer of max 20 samples
        const updated = [...prev.slice(-19), newSample];
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [daemonOnline]);

  // Aggregate stats from samples
  const stats = useMemo(() => {
    if (!samples.length) return { current: 0, avg: 0, max: 0, min: 0, stability: 100, jitter: 0 };
    const pings = samples.map((s) => s.ping).filter((p) => p > 0);
    const current = samples[samples.length - 1]?.ping || 0;
    const avg = pings.length ? Math.round(pings.reduce((a, b) => a + b, 0) / pings.length) : 0;
    const max = pings.length ? Math.max(...pings) : 0;
    const min = pings.length ? Math.min(...pings) : 0;
    const latestStability = samples[samples.length - 1]?.stability || 100;
    const latestJitter = samples[samples.length - 1]?.jitter || 0.8;

    return {
      current,
      avg,
      max,
      min,
      stability: latestStability,
      jitter: latestJitter,
    };
  }, [samples]);

  // Trigger manual simulated ping spike
  const handleTriggerSpike = () => {
    playMinecraftAnvil();
    lastSpikeRef.current = Date.now();
    setIsSimulatingSpike(true);
    setSpikeCount((prev) => prev + 1);

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0].slice(3, 8);
    const spikePing = Math.floor(124 + Math.random() * 30);

    const spikeSample: NetworkPingSample = {
      time: timeStr,
      ping: spikePing,
      stability: 84.2,
      jitter: 8.4,
      isSpike: true,
    };

    setSamples((prev) => [...prev.slice(-19), spikeSample]);

    if (onLogMessage) {
      onLogMessage(
        'WARN',
        `[CHAOS TEST] Ping spike injected: ${spikePing}ms RTT // RakNet UDP throttle active`
      );
    }

    setTimeout(() => {
      setIsSimulatingSpike(false);
    }, 2200);
  };

  // Reset or flush sample buffer
  const handleResetBuffer = () => {
    playMinecraftClick();
    setSamples(generateInitialSamples());
    if (onLogMessage) {
      onLogMessage('CONF', '[TELEMETRY] Network latency buffer flushed.');
    }
  };

  // Calculate relative meters for storage & chunks
  const chunkPercent = Math.min(100, Math.round((telemetry.activeChunks / 300) * 100));
  const storagePercent = Math.min(100, Math.round(((32 - telemetry.freeStorageGb) / 32) * 100));

  return (
    <div className="mc-panel p-3.5 md:p-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-black/60 mb-3">
        <div className="flex items-center gap-1.5">
          <PingIcon size={14} />
          <span className="font-pixel text-[9px] uppercase tracking-wider text-zinc-100">
            BEDROCK TELEMETRY &amp; NETWORK
          </span>
        </div>
        <button
          type="button"
          onClick={() => playMinecraftXpOrb()}
          className="font-pixel text-[8px] bg-[#18181b] text-[#ffaa00] px-2 py-0.5 border border-black font-bold hover:scale-105 cursor-pointer transition-transform"
        >
          RANK: {telemetry.rank}
        </button>
      </div>

      {/* ======================================================== */}
      {/* LIVE RECHARTS NETWORK LATENCY & PACKET STABILITY MONITOR */}
      {/* ======================================================== */}
      <div className="mc-inset p-2.5 mb-3 bg-[#111215]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#55ff55] border border-black inline-block animate-ping" />
            <span className="font-pixel text-[8px] text-[#55ffff]">
              LIVE UDP RAKNET LATENCY
            </span>
          </div>
          <span
            className={`font-pixel text-[7px] px-1.5 py-0.5 border border-black font-bold ${
              !daemonOnline
                ? 'bg-zinc-800 text-zinc-400'
                : stats.current >= 60
                ? 'bg-red-950 text-[#ef4444] animate-pulse'
                : 'bg-emerald-950 text-[#55ff55]'
            }`}
          >
            {!daemonOnline ? (
              'OFFLINE'
            ) : stats.current >= 60 ? (
              <span className="flex items-center gap-1">
                <AlertIcon size={9} /> LAG SPIKE
              </span>
            ) : (
              '20 TPS SYNCED'
            )}
          </span>
        </div>

        {/* Real-Time Metric Stat Badges */}
        <div className="grid grid-cols-4 gap-1 mb-2 font-pixel text-center">
          <div className="bg-[#18181b] p-1 border border-black">
            <div className="text-[6px] text-zinc-400">CURRENT</div>
            <div
              className={`text-[9px] font-bold font-mono-code ${
                stats.current >= 60
                  ? 'text-[#ef4444]'
                  : stats.current >= 35
                  ? 'text-[#ffaa00]'
                  : 'text-[#55ff55]'
              }`}
            >
              {stats.current}ms
            </div>
          </div>
          <div className="bg-[#18181b] p-1 border border-black">
            <div className="text-[6px] text-zinc-400">AVG RTT</div>
            <div className="text-[9px] font-bold font-mono-code text-zinc-200">
              {stats.avg}ms
            </div>
          </div>
          <div className="bg-[#18181b] p-1 border border-black">
            <div className="text-[6px] text-zinc-400">PEAK SPIKE</div>
            <div className="text-[9px] font-bold font-mono-code text-[#ffaa00]">
              {stats.max}ms
            </div>
          </div>
          <div className="bg-[#18181b] p-1 border border-black">
            <div className="text-[6px] text-zinc-400">STABILITY</div>
            <div className="text-[9px] font-bold font-mono-code text-[#55ffff]">
              {stats.stability}%
            </div>
          </div>
        </div>

        {/* Recharts Chart Canvas */}
        <div className="w-full h-32 relative bg-[#0d0e11] border border-black/80 pt-2 pr-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={samples} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="mcPingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#55ff55" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#55ff55" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#24252a" strokeDasharray="2 2" vertical={false} />

              <XAxis
                dataKey="time"
                stroke="#52525b"
                tick={{ fill: '#71717a', fontSize: 7, fontFamily: 'monospace' }}
                tickLine={{ stroke: '#3f3f46' }}
              />

              <YAxis
                stroke="#52525b"
                tick={{ fill: '#71717a', fontSize: 7, fontFamily: 'monospace' }}
                tickLine={{ stroke: '#3f3f46' }}
                domain={[0, (dataMax: number) => Math.max(70, Math.ceil(dataMax * 1.15))]}
                unit="ms"
              />

              {/* Lag Spike Warning Threshold at 60ms */}
              <ReferenceLine
                y={60}
                stroke="#ef4444"
                strokeDasharray="3 3"
                label={{
                  value: 'SPIKE THRESHOLD (60ms)',
                  fill: '#ef4444',
                  fontSize: 6,
                  fontFamily: 'monospace',
                  position: 'top',
                }}
              />

              <Tooltip content={<MinecraftChartTooltip />} />

              {/* Area 1: Ping Latency */}
              <Area
                type="monotone"
                dataKey="ping"
                stroke="#55ff55"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#mcPingGradient)"
                isAnimationActive={false}
              />

              {/* Secondary line: Packet Stability */}
              <Line
                type="monotone"
                dataKey="stability"
                stroke="#55ffff"
                strokeWidth={1}
                dot={false}
                strokeDasharray="2 2"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Legend & Interactive Testing Controls */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-1.5 pt-1.5 border-t border-black/60 font-pixel text-[7px]">
          {/* Legend */}
          <div className="flex items-center gap-3 text-zinc-300">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-1 bg-[#55ff55] inline-block" />
              <span>RTT PING</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 border-t border-dashed border-[#55ffff] inline-block" />
              <span>STABILITY</span>
            </span>
            <span className="text-[#ef4444] hidden sm:inline">
              -- 60ms SPIKE
            </span>
          </div>

          {/* Spike Test Trigger Buttons */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={handleTriggerSpike}
              disabled={isSimulatingSpike || !daemonOnline}
              className="mc-btn mc-btn-red py-0.5 px-2 text-[7px] flex items-center gap-1 cursor-pointer disabled:opacity-50"
              title="Inject a high packet lag spike into the graph"
            >
              <LightningIcon size={9} />
              <span>{isSimulatingSpike ? 'SPIKING...' : 'TEST LAG SPIKE'}</span>
            </button>
            <button
              type="button"
              onClick={handleResetBuffer}
              className="mc-btn py-0.5 px-1.5 text-[7px] text-zinc-300 cursor-pointer"
              title="Clear chart samples buffer"
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Rows with Minecraft Meters */}
      <div className="space-y-2.5 font-chakra font-bold text-xs">
        {/* Packet Loss */}
        <div className="mc-inset p-2">
          <div className="flex justify-between items-center mb-1">
            <span className="flex items-center gap-1.5 font-pixel text-[7px] text-zinc-300">
              <span className="w-1.5 h-1.5 bg-[#55ff55] inline-block" />
              UDP PACKET LOSS
            </span>
            <span className="font-pixel text-[7px] text-[#55ff55]">
              {telemetry.packetLoss}
            </span>
          </div>
          <div className="h-2 w-full bg-[#121214] border border-black overflow-hidden">
            <div className="h-full bg-[#55ff55]" style={{ width: '4%' }} />
          </div>
        </div>

        {/* Chunks */}
        <div className="mc-inset p-2">
          <div className="flex justify-between items-center mb-1">
            <span className="font-pixel text-[7px] text-zinc-300">
              ACTIVE LOADED CHUNKS
            </span>
            <motion.span
              key={telemetry.activeChunks}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="font-mono-code text-[11px] text-[#c084fc] font-bold"
            >
              {telemetry.activeChunks.toLocaleString()} / 300
            </motion.span>
          </div>
          <div className="h-2 w-full bg-[#121214] border border-black overflow-hidden">
            <motion.div
              animate={{ width: `${chunkPercent}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="h-full bg-[#a855f7]"
            />
          </div>
        </div>

        {/* Storage Memory */}
        <div className="mc-inset p-2">
          <div className="flex justify-between items-center mb-1">
            <span className="font-pixel text-[7px] text-zinc-300">
              NVME LEVEL STORAGE
            </span>
            <span className="font-mono-code text-[11px] text-[#ffaa00]">
              {telemetry.freeStorageGb.toFixed(1)} GB FREE
            </span>
          </div>
          <div className="h-2 w-full bg-[#121214] border border-black overflow-hidden">
            <motion.div
              animate={{ width: `${storagePercent}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="h-full bg-[#eab308]"
            />
          </div>
        </div>

        {/* Server Hunger & Armor Rating HUD */}
        <div className="mc-inset p-2 space-y-1.5">
          <div className="flex items-center justify-between text-[7px] font-pixel text-zinc-300">
            <span>CPU STAMINA:</span>
            <div className="flex gap-1" title="CPU Food Level">
              {[...Array(5)].map((_, i) => (
                <FoodIcon key={i} size={12} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-[7px] font-pixel text-zinc-300">
            <span>FIREWALL ARMOR:</span>
            <div className="flex gap-1" title="Port Protection">
              {[...Array(5)].map((_, i) => (
                <ShieldIcon key={i} size={12} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-3 text-center">
        <span className="font-pixel text-[6px] text-zinc-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
          <PickaxeIcon size={11} />
          BEDROCK DEDICATED SERVER PROTOCOL v662
          <PickaxeIcon size={11} />
        </span>
      </div>
    </div>
  );
};

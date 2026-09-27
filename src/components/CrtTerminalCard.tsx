import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Send, Trash2, Coins } from 'lucide-react';
import { LogEntry, TelemetryData } from '../types';
import { playMinecraftClick, playMinecraftStoneClick, playMinecraftPop, playTerminalKey } from '../utils/soundEffects';
import { EmeraldIcon, CommandBlockIcon } from './MinecraftIcons';

interface CrtTerminalCardProps {
  logs: LogEntry[];
  telemetry: TelemetryData;
  credits: number;
  onInsertCoin: () => void;
  onClearLogs: () => void;
  onExecuteCommand: (cmd: string) => void;
  compactHeight?: boolean;
}

export const CrtTerminalCard: React.FC<CrtTerminalCardProps> = ({
  logs,
  telemetry,
  credits,
  onInsertCoin,
  onClearLogs,
  onExecuteCommand,
  compactHeight = false,
}) => {
  const [commandInput, setCommandInput] = useState('');
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when logs update
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    playTerminalKey();
    onExecuteCommand(commandInput.trim());
    setCommandInput('');
  };

  const quickCommands = [
    { label: '/tps', cmd: '/tps' },
    { label: '/time day', cmd: '/time set day' },
    { label: '/clear weather', cmd: '/weather clear' },
    { label: '/help', cmd: '/help' },
  ];

  return (
    <div className="mc-panel-end p-3.5 md:p-4 select-none relative">
      {/* Top Command Block Bar */}
      <div className="bg-[#191426] border-2 border-black p-2 mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#55ffff]" />
          <span className="font-pixel text-[9px] uppercase tracking-wider text-[#c084fc]">
            COMMAND BLOCK RUNTIME
          </span>
        </div>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-[#ff2222] border border-black" />
          <span className="w-2 h-2 bg-[#ffaa00] border border-black" />
          <span className="w-2 h-2 bg-[#55ff55] border border-black" />
        </div>
      </div>

      {/* Hardware Telemetry Strip */}
      <div className="grid grid-cols-3 gap-1 bg-[#0e0c10] border border-[#3a2e44] p-1.5 mb-2.5 text-center font-pixel text-[7px]">
        <div className="text-[#00F0FF] font-bold">TPS: {telemetry.tps.toFixed(1)}</div>
        <div className="text-[#DDB7FF] font-bold">RAM: {telemetry.ramUsageGb.toFixed(1)}G</div>
        <div className="text-[#FF9900] font-bold">CPU: {telemetry.cpuPercent}%</div>
      </div>

      {/* CRT Screen with Phosphor Glow & Scanlines on Deep Void */}
      <div
        ref={logContainerRef}
        className={`crt-screen border-2 border-black p-2.5 md:p-3 ${
          compactHeight ? 'h-48' : 'h-[360px] md:h-[390px]'
        } overflow-y-auto font-mono-code text-[11px] md:text-xs select-text space-y-1.5 shadow-inner bg-[#09070a]`}
      >
        {logs.map((log) => {
          let color = 'text-[#EDEDED]';
          let bgExtra = '';

          if (log.tag === 'WARN' || log.tag === 'K.O.') {
            color = 'text-[#FF3B30] font-bold';
            bgExtra = 'bg-[#3b0a0e]/60 px-1 inline-block w-full border-l-2 border-[#FF3B30]';
          } else if (log.tag === 'CONF') {
            color = 'text-[#FF9900]';
          } else if (log.tag === 'PASS') {
            color = 'text-[#00F0FF] font-bold';
          } else if (log.tag === 'CMD') {
            color = 'text-[#DDB7FF]';
          }

          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.12 }}
              className={`${color} ${bgExtra} break-words leading-relaxed`}
            >
              <span className="text-[#883A42] font-semibold">[{log.time}]</span>{' '}
              {log.tag !== 'INFO' && (
                <span className="font-bold text-[#A855F7]">[{log.tag}] </span>
              )}
              <span>{log.message}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Command Suggestions Hotbar */}
      <div className="flex items-center gap-1 mt-2 overflow-x-auto py-1">
        <span className="font-pixel text-[6px] text-zinc-400 shrink-0">QUICK:</span>
        {quickCommands.map(({ label, cmd }) => (
          <button
            key={cmd}
            type="button"
            onClick={() => {
              playTerminalKey();
              onExecuteCommand(cmd);
            }}
            className="mc-btn py-0.5 px-1.5 font-pixel text-[7px] text-[#55ffff] shrink-0"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Coin Return & Buttons */}
      <div className="mt-2.5 flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              playMinecraftPop();
              onInsertCoin();
            }}
            className="mc-btn mc-btn-green py-1 px-2 font-pixel text-[7px] flex items-center gap-1.5"
          >
            <EmeraldIcon size={12} />
            <span>+1 EMERALD</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playMinecraftStoneClick();
              onClearLogs();
            }}
            className="mc-btn py-1 px-2 font-pixel text-[7px] text-zinc-300"
          >
            CLEAR
          </button>
        </div>

        <div className="flex items-center gap-1 font-pixel text-[7px] text-zinc-300">
          <span>EMERALDS:</span>
          <span className="text-[#55ff55] font-bold">
            {credits < 10 ? `0${credits}` : credits}
          </span>
        </div>
      </div>

      {/* Command Input Form */}
      <div className="mt-2.5">
        <form onSubmit={handleSubmit} className="flex mc-inset border border-black">
          <span className="bg-[#121214] text-[#55ffff] px-2 flex items-center font-mono-code font-bold text-xs select-none">
            /
          </span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyDown={() => playTerminalKey()}
            placeholder="say, op, kick, time set day..."
            className="w-full bg-[#0a0a0c] text-[#55ff55] font-mono-code text-[11px] md:text-xs p-2 focus:outline-none"
          />
          <button
            type="submit"
            className="mc-btn mc-btn-green px-3 font-pixel text-[8px] flex items-center gap-1"
          >
            <Send className="w-3 h-3" />
            <span>RUN</span>
          </button>
        </form>
      </div>
    </div>
  );
};


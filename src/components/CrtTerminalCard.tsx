import React, { useState, useRef, useEffect } from 'react';
import { LogEntry, TelemetryData } from '../types';
import { playButtonClick, playCoinSound, playTerminalKey } from '../utils/soundEffects';

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

  return (
    <div className="bg-black border-4 border-black p-3.5 md:p-4 brutal-shadow-lg relative">
      {/* Arcade Cabinet Bezel Top */}
      <div className="bg-[#FFE600] border-2 border-black p-2 mb-3 flex items-center justify-between">
        <span className="font-archivo text-xs uppercase tracking-wider text-black font-black">
          CRT TERMINAL 01
        </span>
        <div className="flex gap-1">
          <span className="w-2.5 h-2.5 bg-red-600 rounded-full border border-black" />
          <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full border border-black" />
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full border border-black" />
        </div>
      </div>

      {/* Arcade Coin Slots & Hardware Info */}
      <div className="grid grid-cols-3 gap-1 bg-[#1a1824] border-2 border-black p-1.5 md:p-2 mb-3 text-center font-pixel text-[7px] md:text-[8px] text-[#00F0FF]">
        <div>TPS: {telemetry.tps.toFixed(1)}</div>
        <div>RAM: {telemetry.ramUsageGb.toFixed(1)}G</div>
        <div>CPU: {telemetry.cpuPercent}%</div>
      </div>

      {/* CRT Screen with Phosphor Glow & Scanlines */}
      <div
        ref={logContainerRef}
        className={`crt-screen border-4 border-zinc-800 p-2.5 md:p-3 ${
          compactHeight ? 'h-48' : 'h-[360px] md:h-[390px]'
        } overflow-y-auto font-mono-code text-[11px] md:text-xs select-text space-y-1.5 shadow-inner`}
      >
        {logs.map((log) => {
          let color = 'text-[#22c55e]';
          let bgExtra = '';

          if (log.tag === 'WARN' || log.tag === 'K.O.') {
            color = 'text-[#ff4d8d]';
            bgExtra = 'bg-red-950/40 px-1 inline-block w-full';
          } else if (log.tag === 'CONF' || log.tag === 'PASS') {
            color = 'text-[#FFE600]';
          } else if (log.tag === 'CMD') {
            color = 'text-[#00F0FF]';
          }

          return (
            <div key={log.id} className={`${color} ${bgExtra} break-words leading-relaxed`}>
              <span className="opacity-80">[{log.time}]</span>{' '}
              {log.tag !== 'INFO' && (
                <span className="font-bold">[{log.tag}] </span>
              )}
              {log.message}
            </div>
          );
        })}
      </div>

      {/* Coin Return & Arcade Physical Control Strip */}
      <div className="mt-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            type="button"
            onClick={() => {
              playCoinSound();
              onInsertCoin();
            }}
            className="bg-[#FFE600] text-black border-2 border-black px-2 py-1 font-pixel text-[7px] md:text-[8px] hover:bg-yellow-300 brutal-press cursor-pointer font-bold"
          >
            INSERT COIN
          </button>
          <button
            type="button"
            onClick={() => {
              playButtonClick();
              onClearLogs();
            }}
            className="bg-[#FF4D8D] text-white border-2 border-black px-2 py-1 font-pixel text-[7px] md:text-[8px] hover:bg-pink-400 brutal-press cursor-pointer font-bold"
          >
            CLR CRT
          </button>
        </div>
        <span className="font-pixel text-[7px] md:text-[8px] text-[#FFE600] animate-pulse">
          CREDITS: {credits < 10 ? `0${credits}` : credits}
        </span>
      </div>

      {/* Command Input Form Styled Like Arcade Coin-Op Prompt */}
      <div className="mt-2.5 md:mt-3">
        <form onSubmit={handleSubmit} className="flex border-2 border-[#00F0FF]">
          <span className="bg-[#00F0FF] text-black px-2 flex items-center font-mono-code font-bold text-xs select-none">
            &gt;
          </span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyDown={() => playTerminalKey()}
            placeholder="/op, /say, /whitelist, /help..."
            className="w-full bg-black text-[#39ff14] font-mono-code text-[11px] md:text-xs p-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#FFE600] text-black px-3 font-archivo text-xs uppercase hover:bg-yellow-300 cursor-pointer font-black"
          >
            RUN
          </button>
        </form>
      </div>
    </div>
  );
};

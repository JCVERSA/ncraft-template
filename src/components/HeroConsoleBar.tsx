import React, { useState } from 'react';
import { Copy, Check, Power, Sliders, Gamepad2, Cpu, RotateCcw } from 'lucide-react';
import { playButtonClick, playSwitchSound } from '../utils/soundEffects';

interface HeroConsoleBarProps {
  endpoint: string;
  daemonOnline: boolean;
  onToggleDaemon: () => void;
  onOpenSettings?: () => void;
}

export const HeroConsoleBar: React.FC<HeroConsoleBarProps> = ({
  endpoint,
  daemonOnline,
  onToggleDaemon,
  onOpenSettings,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEndpoint = () => {
    playButtonClick();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(endpoint).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#9333EA] border-4 border-black p-4 md:p-6 mb-6 brutal-shadow-lg relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#FFE600] rotate-12 border-4 border-black -z-0 opacity-80 pointer-events-none" />
      <div className="absolute right-24 -bottom-10 w-28 h-28 bg-[#FF4D8D] -rotate-12 border-4 border-black -z-0 opacity-80 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        {/* Console Brand Badge & Title */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-14 h-14 md:w-20 md:h-20 bg-[#FFE600] border-4 border-black flex flex-col items-center justify-center brutal-shadow-sm rotate-[-3deg] hover:rotate-0 transition-transform shrink-0">
            <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-black stroke-[2.5]" />
            <span className="font-pixel text-[7px] md:text-[8px] text-black font-bold">16-BIT</span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-archivo text-2xl md:text-4xl text-white tracking-wider uppercase drop-shadow-[2px_2px_0px_#000]">
                NEBULA ARCADE
              </span>
              <span className="bg-[#FFE600] text-black px-2 py-0.5 border-2 border-black font-pixel text-[9px] md:text-[10px] uppercase font-bold sticker-wiggle">
                SYSTEM REV 2.0
              </span>
              <span className="bg-[#00F0FF] text-black px-2 py-0.5 border-2 border-black font-archivo text-xs uppercase font-black">
                BEDROCK 64
              </span>
            </div>
            <p className="font-chakra text-yellow-200 text-xs md:text-sm lg:text-base font-bold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00F0FF] shrink-0" />
              <span>HARDWARE CLUSTER // AARCH64 DEDICATED CARTRIDGE RUNTIME // STAGE 01</span>
            </p>
          </div>
        </div>

        {/* Right Quick Controls: IP Tag & Push Toggles */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
          {/* IP Cartridge Tag */}
          <div className="bg-black border-4 border-[#00F0FF] p-2 flex items-center gap-2.5 brutal-shadow-sm max-w-full">
            <div className="bg-[#00F0FF] text-black px-2 py-1 font-pixel text-[8px] md:text-[9px] font-bold shrink-0">
              IP:PORT
            </div>
            <button
              onClick={handleCopyEndpoint}
              className="font-mono-code text-xs md:text-sm font-bold text-[#00F0FF] hover:text-yellow-300 flex items-center gap-1.5 transition-colors cursor-pointer truncate"
              title="Click to copy IP:Port"
            >
              <span className="truncate">{endpoint}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[#22C55E] shrink-0" />
              ) : (
                <Copy className="w-3.5 h-3.5 shrink-0" />
              )}
            </button>
            {copied && (
              <span className="font-pixel text-[8px] md:text-[9px] bg-[#FFE600] text-black px-1.5 py-0.5 border border-black animate-bounce shrink-0">
                COPIED!
              </span>
            )}
          </div>

          {/* Arcade Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSwitchSound();
                onToggleDaemon();
              }}
              className={`${
                daemonOnline
                  ? 'bg-[#FF4D8D] text-white hover:bg-pink-400'
                  : 'bg-[#22C55E] text-black hover:bg-green-400'
              } border-4 border-black px-3.5 md:px-4 py-2 font-archivo text-xs uppercase flex items-center gap-2 brutal-shadow-sm brutal-press cursor-pointer`}
            >
              <Power className="w-4 h-4" />
              <span>{daemonOnline ? 'STOP DAEMON' : 'START DAEMON'}</span>
            </button>

            {onOpenSettings && (
              <button
                onClick={() => {
                  playButtonClick();
                  onOpenSettings();
                }}
                className="bg-[#FFE600] text-black hover:bg-yellow-300 border-4 border-black p-2 brutal-shadow-sm brutal-press cursor-pointer"
                title="System Settings"
              >
                <Sliders className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

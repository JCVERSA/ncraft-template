import React from 'react';
import { Volume2, VolumeX, Monitor, Smartphone, Sparkles } from 'lucide-react';
import { playButtonClick } from '../utils/soundEffects';

interface ArcadeHeaderProps {
  viewMode: 'auto' | 'desktop' | 'mobile';
  setViewMode: (mode: 'auto' | 'desktop' | 'mobile') => void;
  soundMuted: boolean;
  toggleSound: () => void;
  daemonOnline: boolean;
  port: number;
  levelName: string;
  tps: number;
}

export const ArcadeHeader: React.FC<ArcadeHeaderProps> = ({
  viewMode,
  setViewMode,
  soundMuted,
  toggleSound,
  daemonOnline,
  port,
  levelName,
  tps,
}) => {
  return (
    <header className="w-full bg-[#FFE600] border-b-4 border-black overflow-hidden z-50 sticky top-0 brutal-shadow">
      <div className="flex items-center justify-between">
        {/* Left Live Status Badge */}
        <div
          className={`${
            daemonOnline ? 'bg-[#FF4D8D]' : 'bg-zinc-800'
          } text-white px-3 md:px-4 py-2 border-r-4 border-black font-archivo text-xs md:text-sm uppercase tracking-widest shrink-0 flex items-center gap-2`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              daemonOnline ? 'bg-yellow-300 animate-ping' : 'bg-red-500'
            }`}
          />
          <span className="hidden sm:inline">
            {daemonOnline ? 'LIVE SYSTEM' : 'DAEMON HALTED'}
          </span>
          <span className="sm:hidden">
            {daemonOnline ? 'LIVE' : 'OFF'}
          </span>
        </div>

        {/* Marquee Ticker */}
        <div className="overflow-hidden py-1.5 flex-1 whitespace-nowrap font-pixel text-[10px] md:text-xs text-black">
          <div className="animate-marquee flex items-center gap-6 md:gap-8">
            <span>★ NEBULA CRAFT 64 ARCADE EDITION ★</span>
            <span className="bg-black text-[#00F0FF] px-2 py-0.5 font-mono-code font-bold">
              PORT {port} {daemonOnline ? 'ONLINE' : 'STANDBY'}
            </span>
            <span>★ BEDROCK DEDICATED ENGINE v1.20.73.01 ★</span>
            <span className="bg-[#FF4D8D] text-white px-2 py-0.5">
              TPS: {tps.toFixed(1)} / 20.0
            </span>
            <span>★ TICK STABILITY 100% ★ WORLD: {levelName} ★</span>
            <span>★ INSERT COIN TO DEPLOY ★ NO LAG GUARANTEED ★</span>
            <span className="bg-purple-900 text-yellow-300 px-2 py-0.5">
              16-BIT CARTRIDGE BDS RUNTIME
            </span>
          </div>
        </div>

        {/* Right Controls: Cartridge Tag + View Switcher + Sound */}
        <div className="flex items-center shrink-0 border-l-4 border-black bg-white">
          <div className="bg-[#00F0FF] px-3 py-2 border-r-2 border-black font-archivo text-xs uppercase hidden lg:flex items-center gap-1.5 font-black text-black">
            <span>CART: BDS-ROM #042</span>
          </div>

          {/* View mode switcher */}
          <div className="flex items-center bg-white p-1 gap-1 border-r-2 border-black text-black">
            <button
              onClick={() => {
                playButtonClick();
                setViewMode('auto');
              }}
              title="Responsive auto view"
              className={`p-1 text-xs border font-pixel transition-colors ${
                viewMode === 'auto'
                  ? 'bg-black text-[#FFE600] border-black'
                  : 'bg-white text-black border-transparent hover:border-black'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                playButtonClick();
                setViewMode('desktop');
              }}
              title="Desktop 3-Column Arcade View"
              className={`p-1 text-xs border font-pixel transition-colors ${
                viewMode === 'desktop'
                  ? 'bg-black text-[#FFE600] border-black'
                  : 'bg-white text-black border-transparent hover:border-black'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                playButtonClick();
                setViewMode('mobile');
              }}
              title="Mobile Handheld Console View"
              className={`p-1 text-xs border font-pixel transition-colors ${
                viewMode === 'mobile'
                  ? 'bg-black text-[#FFE600] border-black'
                  : 'bg-white text-black border-transparent hover:border-black'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              toggleSound();
              playButtonClick();
            }}
            title={soundMuted ? 'Activer le son 16-bit' : 'Couper le son'}
            className="p-2 bg-yellow-300 hover:bg-yellow-400 text-black flex items-center justify-center font-bold"
          >
            {soundMuted ? (
              <VolumeX className="w-4 h-4 text-red-600" />
            ) : (
              <Volume2 className="w-4 h-4 text-black animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

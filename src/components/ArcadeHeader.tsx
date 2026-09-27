import React from 'react';
import { Volume2, VolumeX, Monitor, Smartphone, Sparkles, Flame, Eye, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { MinecraftDimension } from '../types';
import { playMinecraftClick, playMinecraftXpOrb } from '../utils/soundEffects';
import {
  PickaxeIcon,
  StarIcon,
  EnderEyeIcon,
  GrassBlockIcon,
  NetherPortalIcon,
} from './MinecraftIcons';

interface ArcadeHeaderProps {
  viewMode: 'auto' | 'desktop' | 'mobile';
  setViewMode: (mode: 'auto' | 'desktop' | 'mobile') => void;
  dimension: MinecraftDimension;
  setDimension: (dimension: MinecraftDimension) => void;
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
  dimension,
  setDimension,
  soundMuted,
  toggleSound,
  daemonOnline,
  port,
  levelName,
  tps,
}) => {
  const viewModes: { id: 'auto' | 'desktop' | 'mobile'; icon: typeof Sparkles; label: string }[] = [
    { id: 'auto', icon: Sparkles, label: 'Responsive auto view' },
    { id: 'desktop', icon: Monitor, label: 'Desktop 3-Column Arcade View' },
    { id: 'mobile', icon: Smartphone, label: 'Mobile Handheld Console View' },
  ];

  const dimensions: { id: MinecraftDimension; icon: React.FC<{ size?: number; className?: string }>; label: string; tag: string }[] = [
    { id: 'overworld', icon: GrassBlockIcon, label: 'Overworld', tag: 'OVERWORLD' },
    { id: 'nether', icon: NetherPortalIcon, label: 'Nether', tag: 'NETHER' },
    { id: 'the_end', icon: EnderEyeIcon, label: 'The End', tag: 'THE END' },
  ];

  return (
    <header className="w-full bg-[#18141d] border-b-4 border-[#3a2e44] overflow-hidden z-50 sticky top-0 shadow-xl">
      {/* 2px Obsidian bevel top highlight */}
      <div className="h-[2px] bg-[#4d3f59] w-full" />

      <div className="flex items-center justify-between">
        {/* Left Live Status Badge: Soul Fire / Lava Surge Indicator */}
        <motion.div
          animate={{
            backgroundColor: daemonOnline ? '#00363a' : '#241014',
            color: daemonOnline ? '#00f0ff' : '#ffb4ab',
          }}
          transition={{ duration: 0.25 }}
          className={`px-3 md:px-4 py-2 border-r-4 border-black font-pixel text-[9px] md:text-[10px] uppercase tracking-wider shrink-0 flex items-center gap-2 select-none border-b-2 border-black/40 ${
            daemonOnline ? 'shadow-[0_0_12px_rgba(0,240,255,0.3)]' : ''
          }`}
        >
          {/* Animated Soul Flame / Lava Spark */}
          <span
            className={`w-3 h-3 rounded-none border border-black ${
              daemonOnline
                ? 'bg-[#00f0ff] shadow-[0_0_10px_#00f0ff] animate-pulse'
                : 'bg-[#ff3b30] shadow-[0_0_6px_#ff3b30]'
            }`}
          />
          <span className="hidden sm:inline font-bold">
            {daemonOnline ? 'BDS ENGINE: ONLINE' : 'BDS: STOPPED'}
          </span>
          <span className="sm:hidden font-bold">
            {daemonOnline ? 'ONLINE' : 'STOPPED'}
          </span>
        </motion.div>

        {/* Marquee Ticker with Glowstone and Soul Fire Accents */}
        <div className="overflow-hidden py-1.5 flex-1 whitespace-nowrap font-pixel text-[10px] md:text-xs text-zinc-300">
          <div className="animate-marquee flex items-center gap-6 md:gap-8">
            <span className="text-[#ff9900] drop-shadow-[1px_1px_0_#000] flex items-center gap-1.5 font-bold">
              <PickaxeIcon size={14} /> MINECRAFT BEDROCK DEDICATED SERVER ARCADE
            </span>
            <span className="bg-[#0e0c10] text-[#00f0ff] px-2 py-0.5 border border-[#00f0ff]/40 font-mono-code font-bold shadow-[0_0_6px_rgba(0,240,255,0.25)]">
              PORT {port} {daemonOnline ? 'LISTENING [UDP]' : 'OFFLINE'}
            </span>
            <span className="text-[#ffc082] flex items-center gap-1.5 font-bold">
              <StarIcon size={12} /> 20.0 TPS LOCKED ENGINE v1.20.73.01 <StarIcon size={12} />
            </span>
            <span className="bg-[#381119] text-[#ff3b30] px-2 py-0.5 border border-[#ff3b30]/40 font-bold">
              TPS: {tps.toFixed(1)} / 20.0
            </span>
            <span className="text-[#dbc2ad]">
              WORLD SEED: {levelName}
            </span>
            <span className="text-[#ddb7ff] flex items-center gap-1.5">
              <EnderEyeIcon size={14} /> AARCH64 NATIVE CARTRIDGE ARCHITECTURE
            </span>
          </div>
        </div>

        {/* Right Controls: Dimension Selector + View Switcher + Sound */}
        <div className="flex items-center shrink-0 border-l-4 border-black bg-[#16121b]">
          {/* Minecraft Dimension Selector */}
          <div className="hidden lg:flex items-center gap-1 px-2 border-r-2 border-black">
            <span className="font-pixel text-[7px] text-[#dbc2ad] mr-1">REALM:</span>
            <div className="flex bg-[#0e0c10] p-0.5 border border-[#3a2e44]">
              {dimensions.map(({ id, icon: Icon, tag }) => {
                const isActive = dimension === id;
                const activeColor =
                  id === 'nether'
                    ? 'text-[#ff9900] font-bold'
                    : id === 'the_end'
                    ? 'text-[#ddb7ff] font-bold'
                    : 'text-[#55ff55] font-bold';
                const activeBg =
                  id === 'nether'
                    ? 'bg-[#33160a] border border-[#ff9900]/60'
                    : id === 'the_end'
                    ? 'bg-[#261238] border border-[#a855f7]/60'
                    : 'bg-[#122818] border border-[#22c55e]/60';

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      playMinecraftXpOrb();
                      setDimension(id);
                    }}
                    className={`px-2 py-1 font-pixel text-[7px] flex items-center gap-1 cursor-pointer transition-colors relative ${
                      isActive ? activeColor : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="dimension-active-indicator"
                        className={`absolute inset-0 ${activeBg} -z-0`}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1">
                      <Icon className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fluid View Switcher */}
          <div className="flex items-center bg-[#121214] p-1 gap-1 border-r-2 border-black relative">
            {viewModes.map(({ id, icon: Icon, label }) => {
              const isActive = viewMode === id;
              return (
                <motion.button
                  key={id}
                  onClick={() => {
                    playMinecraftClick();
                    setViewMode(id);
                  }}
                  whileTap={{ scale: 0.9 }}
                  title={label}
                  className={`relative p-1.5 text-xs font-pixel z-10 transition-colors cursor-pointer ${
                    isActive ? 'text-[#55ff55]' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="view-mode-active-pill"
                      className="absolute inset-0 bg-[#35363a] border-t border-l border-[#606060] border-b border-r border-[#181818] -z-10 shadow-sm"
                      transition={{
                        type: 'spring',
                        stiffness: 480,
                        damping: 32,
                      }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5" />
                </motion.button>
              );
            })}
          </div>

          {/* Audio Mute/Unmute */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              toggleSound();
              playMinecraftClick();
            }}
            title={soundMuted ? 'Activer le son Minecraft' : 'Couper le son'}
            className="p-2.5 bg-[#3a3b3e] hover:bg-[#4a4b4e] border-l-2 border-black text-white flex items-center justify-center font-bold cursor-pointer transition-colors"
          >
            {soundMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#55ff55] animate-pulse" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};


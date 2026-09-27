import React, { useState } from 'react';
import { Copy, Check, Power, Sliders, Box, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MinecraftDimension } from '../types';
import { playMinecraftClick, playMinecraftPiston, playMinecraftXpOrb } from '../utils/soundEffects';
import { HeartIcon, EmptyHeartIcon } from './MinecraftIcons';

interface HeroConsoleBarProps {
  endpoint: string;
  daemonOnline: boolean;
  dimension?: MinecraftDimension;
  onToggleDaemon: () => void;
  onOpenSettings?: () => void;
}

export const HeroConsoleBar: React.FC<HeroConsoleBarProps> = ({
  endpoint,
  daemonOnline,
  dimension = 'overworld',
  onToggleDaemon,
  onOpenSettings,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEndpoint = () => {
    playMinecraftClick();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(endpoint).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDimensionBorder = () => {
    if (dimension === 'nether') return 'border-t-4 border-[#b91c1c]';
    if (dimension === 'the_end') return 'border-t-4 border-[#a855f7]';
    return 'border-t-4 border-[#22c55e]';
  };

  return (
    <div
      className={`mc-panel ${getDimensionBorder()} p-4 md:p-5 mb-6 relative overflow-hidden text-zinc-100 select-none`}
    >
      {/* Dimension Ambient Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#55ff55]/30 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        {/* Console Brand Badge & Title */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Minecraft Command Block 3D Avatar */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="w-14 h-14 md:w-16 md:h-16 mc-inset flex flex-col items-center justify-center shrink-0 cursor-pointer mc-enchanted-glint relative"
            title="Minecraft BDS Command Console Core"
          >
            <Box className="w-8 h-8 md:w-9 md:h-9 text-[#55ffff]" />
            <span className="font-pixel text-[6px] md:text-[7px] text-[#ffaa00] font-bold mt-0.5">
              BDS CORE
            </span>
          </motion.div>

            <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-pixel text-xl md:text-2xl text-[#FFC082] tracking-wide drop-shadow-[2px_2px_0_#000]">
                NEBULA CRAFT
              </span>
              <span className="bg-[#002428] text-[#00F0FF] px-2 py-0.5 border border-[#00F0FF]/50 font-pixel text-[8px] md:text-[9px] uppercase font-bold shadow-[0_0_8px_rgba(0,240,255,0.2)]">
                BEDROCK 1.20
              </span>
              <span className="bg-[#2C0051] text-[#DDB7FF] px-2 py-0.5 border border-[#A855F7]/50 font-pixel text-[8px] uppercase font-bold shadow-[0_0_8px_rgba(168,85,247,0.2)]">
                PROTOCOL v662
              </span>
            </div>

            {/* Server Health HUD: 10 Minecraft Hearts */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-0.5" title="Server Daemon Health: 10 Hearts">
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="inline-flex">
                    {daemonOnline ? (
                      <HeartIcon size={12} className="drop-shadow-[0_0_4px_#ff3b30]" />
                    ) : (
                      <EmptyHeartIcon size={12} />
                    )}
                  </span>
                ))}
              </div>
              <span className="font-pixel text-[7px] text-[#DBC2AD] ml-1.5 hidden sm:inline">
                {daemonOnline ? 'HEALTH: 100%' : 'HEALTH: 0% [HALTED]'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Quick Controls: IP Tag & Push Toggles */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
          {/* IP Server Address Slot */}
          <div className="mc-inset p-2 flex items-center gap-2.5 max-w-full">
            <div className="bg-[#002428] text-[#00F0FF] px-2 py-1 font-pixel text-[7px] md:text-[8px] border border-[#00F0FF]/50 font-bold shrink-0 shadow-[0_0_6px_rgba(0,240,255,0.3)]">
              IP:PORT
            </div>
            <button
              type="button"
              onClick={handleCopyEndpoint}
              className="font-mono-code text-xs md:text-sm font-bold text-[#00F0FF] hover:text-[#7DF4FF] flex items-center gap-1.5 transition-colors cursor-pointer truncate"
              title="Click to copy Minecraft Server Address"
            >
              <span className="truncate">{endpoint}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
              ) : (
                <Copy className="w-3.5 h-3.5 shrink-0 opacity-70 hover:opacity-100" />
              )}
            </button>
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="font-pixel text-[7px] md:text-[8px] bg-[#00F0FF] text-black px-1.5 py-0.5 font-bold shrink-0 shadow-[0_0_8px_#00F0FF]"
                >
                  COPIED!
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Minecraft Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playMinecraftPiston(!daemonOnline);
                onToggleDaemon();
              }}
              className={`${
                daemonOnline ? 'mc-btn-red' : 'mc-btn-ignite'
              } mc-btn flex items-center gap-2 font-bold`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{daemonOnline ? 'STOP SERVER' : 'IGNITE SERVER'}</span>
            </button>

            {onOpenSettings && (
              <button
                type="button"
                onClick={() => {
                  playMinecraftClick();
                  onOpenSettings();
                }}
                className="mc-btn mc-btn-portal p-2"
                title="Cartridge Vault & Dimensional Settings"
              >
                <Sliders className="w-4 h-4 text-[#DDB7FF]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


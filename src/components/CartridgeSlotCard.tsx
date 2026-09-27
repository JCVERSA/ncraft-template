import React, { useState } from 'react';
import { Disc, ChevronDown, MoveVertical, Sparkles, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartridgeConfig } from '../types';
import {
  playMinecraftClick,
  playMinecraftAnvil,
  playMinecraftXpOrb,
  playMinecraftLevelUp,
  playCartridgeSnapSound,
} from '../utils/soundEffects';
import {
  LightningIcon,
  ClockIcon,
  AlertIcon,
  HeartIcon,
  EmptyHeartIcon,
  CartridgeIcons,
} from './MinecraftIcons';

interface CartridgeSlotCardProps {
  cartridge: CartridgeConfig;
  selectedVersion: string;
  onSelectVersion: (version: string) => void;
  isFlashing: boolean;
  onTriggerDeploy: () => void;
  onOpenCartridgeSelect?: () => void;
}

export const CartridgeSlotCard: React.FC<CartridgeSlotCardProps> = ({
  cartridge,
  selectedVersion,
  onSelectVersion,
  isFlashing,
  onTriggerDeploy,
  onOpenCartridgeSelect,
}) => {
  const [isLifted, setIsLifted] = useState(false);
  const [heartsCount, setHeartsCount] = useState(5);

  const handleHeartClick = (index: number) => {
    playMinecraftClick();
    setHeartsCount((prev) => (index + 1 === prev ? Math.max(1, prev - 1) : index + 1));
  };

  const versions = [
    { ver: '1.20.73.01', label: '1.20.73', tag: 'STABLE' },
    { ver: '1.20.80.22', label: '1.20.80', tag: 'PREVIEW' },
    { ver: '1.20.60.24', label: '1.20.60', tag: 'LTS' },
  ];

  return (
    <div className="mc-panel p-4 md:p-5 relative select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-black/60 mb-4">
        <div className="flex items-center gap-2">
          <Disc className="w-4 h-4 text-[#ffaa00] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-pixel text-[11px] text-[#ffaa00] tracking-wide">
            JUKEBOX // BDS SLOT
          </span>
        </div>
        <motion.span
          animate={{
            scale: isFlashing ? [1, 1.05, 1] : 1,
            backgroundColor: isFlashing ? '#ffaa00' : '#18181b',
            color: isFlashing ? '#000000' : '#55ff55',
          }}
          transition={{ repeat: isFlashing ? Infinity : 0, duration: 0.5 }}
          className="font-pixel text-[8px] md:text-[9px] px-2 py-0.5 border border-black font-bold"
        >
          {isFlashing ? (
            <span className="flex items-center gap-1 text-black font-bold">
              <LightningIcon size={11} /> SMELTING ROM...
            </span>
          ) : isLifted ? (
            'PULL TO SWAP'
          ) : (
            'DISC INSERTED'
          )}
        </motion.span>
      </div>

      {/* Physical 3D Minecraft Jukebox / Cartridge Shell with Drag Physics */}
      <div className="relative group">
        {/* Connector bay behind the cartridge */}
        <div className="absolute inset-0 bg-[#121214] border-2 border-black flex flex-col justify-end p-2 items-center text-center">
          <span className="font-pixel text-[7px] text-[#55ffff] mb-1">
            BEDROCK COMPATIBILITY PIN BAY
          </span>
          <div className="w-full flex justify-around py-1 bg-amber-950/80 border-t border-black">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2.5 h-1.5 bg-[#ffaa00] border border-black" />
            ))}
          </div>
        </div>

        <motion.div
          drag="y"
          dragConstraints={{ top: -75, bottom: 0 }}
          dragElastic={0.2}
          onDragStart={() => {
            setIsLifted(true);
            playMinecraftClick();
          }}
          onDragEnd={(_, info) => {
            setIsLifted(false);
            playCartridgeSnapSound();
            if (info.offset.y < -40 && onOpenCartridgeSelect) {
              onOpenCartridgeSelect();
            }
          }}
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className="mc-panel-nether p-3 relative cursor-grab active:cursor-grabbing z-10 select-none shadow-md"
        >
          {/* Cartridge Drag Gripper Indicator */}
          <div className="flex items-center justify-between text-[8px] font-pixel text-zinc-300 mb-1 px-1">
            <span className="flex items-center gap-1 text-[#55ffff]">
              <MoveVertical className="w-3 h-3" /> DRAG TO EJECT
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenCartridgeSelect) {
                  playMinecraftClick();
                  onOpenCartridgeSelect();
                }
              }}
              className="text-[#ffaa00] hover:text-white underline cursor-pointer"
            >
              [OPEN VAULT]
            </button>
          </div>

          {/* Cartridge Grooves / Inset Strip */}
          <div className="h-4 w-full cartridge-grooves border border-black mb-2.5" />

          {/* Cartridge Artwork with Minecraft Enchanted Shimmer */}
          <motion.div
            layout
            className="mc-tooltip mc-enchanted-glint relative overflow-hidden p-3"
          >
            {/* Header info */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-pixel text-[8px] text-[#55ffff] truncate max-w-[200px]">
                §b{cartridge.expansionName}
              </span>
              <span className="font-pixel text-[8px] text-[#ffaa00] shrink-0">
                {cartridge.romSize}
              </span>
            </div>

            {/* Cartridge Centerpiece */}
            <div className="my-2 py-3 bg-[#18181b]/90 border border-purple-900/60 flex flex-col items-center justify-center text-center px-2">
              <motion.div
                animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="py-1 mb-1 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]"
              >
                <CartridgeIcons cartridgeId={cartridge.id} size={32} />
              </motion.div>
              <span className="font-pixel text-xs md:text-sm text-yellow-300 tracking-wide mt-1 drop-shadow-[1px_1px_0_#000]">
                {cartridge.title}
              </span>
              <span className="font-pixel text-[7px] text-zinc-400 mt-1">
                §7MUSIC DISC // {cartridge.subtitle}
              </span>
            </div>

            {/* In-Game Stats Lore */}
            <div className="flex items-center justify-between pt-1 border-t border-purple-900/50 text-[8px] font-pixel text-zinc-300">
              <span className="text-[#55ff55]">§aTICK RATE: {cartridge.ratedTps}</span>
              <span className="text-[#c084fc]">§dGEN: v1.20</span>
            </div>
          </motion.div>

          {/* Gold Pin Connector */}
          <div className="mt-2.5 flex justify-around py-1 bg-amber-950 border-t border-black">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: isLifted ? '#55ff55' : '#ffaa00',
                  boxShadow: isLifted ? '0 0 6px #55ff55' : 'none',
                }}
                className="w-2.5 h-1.5 border border-black"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Minecraft Deploy Button */}
      <div className="mt-4 md:mt-5">
        <button
          type="button"
          onClick={() => {
            playMinecraftAnvil();
            setTimeout(playMinecraftLevelUp, 200);
            onTriggerDeploy();
          }}
          disabled={isFlashing}
          className="w-full mc-btn mc-btn-ignite py-3.5 md:py-4 flex flex-col items-center justify-center text-center shadow-lg cursor-pointer disabled:opacity-80"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex">
              {isFlashing ? <ClockIcon size={18} /> : <LightningIcon size={18} />}
            </span>
            <span className="font-pixel text-xs md:text-sm text-[#0F0C12] font-black drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] tracking-wide">
              {isFlashing ? 'SMELTING BDS ROM...' : 'DEPLOY & FLASH ENGINE'}
            </span>
          </div>
          <span className="font-pixel text-[7px] text-[#2C1600] font-bold mt-1">
            [EXECUTE NATIVE BEDROCK COMPILE &amp; REBOOT]
          </span>
        </button>

        <AnimatePresence>
          {isFlashing && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 p-2 bg-[#2a1212] border border-[#ef4444] text-[#ffaa00] font-pixel text-center text-[8px] flex items-center justify-center gap-1.5"
            >
              <AlertIcon size={12} /> HOT-SWAPPING CONTAINER ASSETS // 20 TPS LOCK IN PROGRESS...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bedrock Version Selector using Minecraft Slot Chips */}
      <div className="mt-4 mc-inset p-2.5">
        <label className="font-pixel text-[8px] text-zinc-300 mb-2 flex items-center justify-between">
          <span>BEDROCK BINARY TARGET:</span>
          <span className="text-[#55ff55]">ACTIVE: {selectedVersion}</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {versions.map(({ ver, label, tag }) => {
            const isActive = selectedVersion === ver;
            return (
              <button
                key={ver}
                type="button"
                onClick={() => {
                  playMinecraftClick();
                  onSelectVersion(ver);
                }}
                className={`mc-slot p-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isActive ? 'active ring-2 ring-[#55ff55]' : 'opacity-80 hover:opacity-100'
                }`}
              >
                <span className="font-pixel text-[8px] text-white">v{label}</span>
                <span className={`font-pixel text-[6px] mt-0.5 ${isActive ? 'text-[#55ff55]' : 'text-zinc-400'}`}>
                  {tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Minecraft Hearts HUD */}
      <div className="mt-3.5 flex items-center justify-between px-1 font-pixel text-[8px] text-zinc-300">
        <span>ROM INTEGRITY:</span>
        <div className="flex gap-1 text-xs">
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleHeartClick(i)}
              className="cursor-pointer hover:scale-125 transition-transform inline-flex"
              title="Toggle Cartridge Health"
            >
              {i < heartsCount ? (
                <HeartIcon size={14} className="drop-shadow-[0_0_2px_#ff2222]" />
              ) : (
                <EmptyHeartIcon size={14} />
              )}
            </button>
          ))}
        </div>
        <span className="text-[#55ff55] font-bold">
          {heartsCount * 20}% HP
        </span>
      </div>
    </div>
  );
};


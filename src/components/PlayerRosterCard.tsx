import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Operator } from '../types';
import { playMinecraftClick, playMinecraftStoneClick, playMinecraftPop, playPurgeSound } from '../utils/soundEffects';
import {
  SteveHeadIcon,
  AlexHeadIcon,
  KnightHeadIcon,
  CreeperIcon,
  WardenHeadIcon,
  AlertIcon,
  PingIcon,
} from './MinecraftIcons';

interface PlayerRosterCardProps {
  operators: Operator[];
  onOpenEnlistModal: () => void;
  onKickOperator: (id: string, name: string) => void;
  onPurgeRecord: (id: string) => void;
}

export const PlayerRosterCard: React.FC<PlayerRosterCardProps> = ({
  operators,
  onOpenEnlistModal,
  onKickOperator,
  onPurgeRecord,
}) => {
  const getPlayerHeadIcon = (gamertag: string, isCorrupt?: boolean) => {
    if (isCorrupt) return <WardenHeadIcon size={20} />;
    const tag = gamertag.toLowerCase();
    if (tag.includes('alex')) return <AlexHeadIcon size={20} />;
    if (tag.includes('steve')) return <SteveHeadIcon size={20} />;
    if (tag.includes('void')) return <KnightHeadIcon size={20} />;
    if (tag.includes('creeper')) return <CreeperIcon size={20} />;
    return <SteveHeadIcon size={20} />;
  };

  return (
    <div className="mc-panel p-4 md:p-5 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-black/60 mb-4">
        <div className="flex items-center gap-2">
          <SteveHeadIcon size={18} />
          <span className="font-pixel text-[11px] md:text-xs uppercase text-zinc-100 truncate">
            OPERATOR ROSTER // WHITELIST
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            playMinecraftClick();
            onOpenEnlistModal();
          }}
          className="mc-btn mc-btn-ignite py-1 px-3 font-pixel text-[8px] flex items-center gap-1 cursor-pointer font-bold"
        >
          <span>+</span>
          <span>ENLIST OP</span>
        </button>
      </div>

      {/* Operator List with Nether alternating stripes and vertical Glowstone indicator */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {operators.map((op, idx) => {
            if (op.isCorrupt) {
              return (
                <motion.div
                  key={op.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -40 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                  className="bg-[#2a0e12] border border-[#ff3b30] border-l-4 border-l-[#ff3b30] p-2.5 flex items-center justify-between text-zinc-100 shadow-[0_0_8px_rgba(255,59,48,0.2)]"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <AlertIcon size={16} className="shrink-0 animate-bounce" />
                    <div className="min-w-0">
                      <div className="font-pixel text-[7px] uppercase line-through truncate text-[#ff8d85]">
                        {op.xuid}
                      </div>
                      <div className="font-pixel text-[8px] text-[#ff9900] truncate font-bold">
                        §cCORRUPT XUID RECORD
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      playPurgeSound();
                      onPurgeRecord(op.id);
                    }}
                    className="mc-btn mc-btn-red py-1 px-2 text-[7px]"
                    title="Purge Corrupt Record from Server whitelist"
                  >
                    PURGE
                  </button>
                </motion.div>
              );
            }

            const rowBg = idx % 2 === 0 ? 'bg-[#1a1620]' : 'bg-[#141119]';

            return (
              <motion.div
                key={op.id}
                layout
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 40 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className={`${rowBg} border-t border-r border-b border-[#3a2e44] border-l-2 border-l-[#ff9900] p-2.5 flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Minecraft Player Head Avatar */}
                  <div className="w-8 h-8 mc-slot flex items-center justify-center shrink-0">
                    {getPlayerHeadIcon(op.gamertag, op.isCorrupt)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-pixel text-[9px] text-[#e6e1e5] truncate font-bold">
                        {op.gamertag}
                      </span>
                      <span className="text-[7px] font-pixel text-[#00f0ff] bg-[#002428] px-1.5 py-0.5 border border-[#00f0ff]/50 shrink-0 shadow-[0_0_6px_rgba(0,240,255,0.2)]">
                        {op.role}
                      </span>
                      <span className="font-pixel text-[6px] text-[#dbc2ad] hidden sm:inline-flex items-center gap-1">
                        <PingIcon size={9} /> 24ms
                      </span>
                    </div>
                    <div className="font-mono-code text-[10px] text-zinc-400 truncate">
                      XUID: {op.xuid}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playMinecraftStoneClick();
                    onKickOperator(op.id, op.gamertag);
                  }}
                  className="mc-btn mc-btn-red py-1 px-2 text-[7px]"
                  title="Kick player from BDS instance"
                >
                  KICK
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};


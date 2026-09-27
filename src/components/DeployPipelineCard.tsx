import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MascotState, PipelineStep } from '../types';
import { playMinecraftClick, playMinecraftXpOrb } from '../utils/soundEffects';
import {
  VillagerHeadIcon,
  SleepIcon,
  CreeperIcon,
  FireIcon,
  AnvilIcon,
  ChestIcon,
  PickaxeIcon,
  BookIcon,
  EmeraldIcon,
  TntIcon,
} from './MinecraftIcons';

interface DeployPipelineCardProps {
  progressPercent: number;
  mascotState: MascotState;
  onSetMascotState: (state: MascotState) => void;
  steps: PipelineStep[];
  collapsible?: boolean;
}

export const DeployPipelineCard: React.FC<DeployPipelineCardProps> = ({
  progressPercent,
  mascotState,
  onSetMascotState,
  steps,
  collapsible = false,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  // Villager dialogue & trade
  let avatar: React.ReactNode = <VillagerHeadIcon size={36} />;
  let villagerName = 'VILLAGER: MASTER LIBRARIAN';
  let dialogue = '“Hrrrm! Extracting Bedrock Dedicated Server chunks into Level RAM...”';
  let statusBadge = 'SMELTING';
  let statusColor = 'text-[#55ff55]';

  if (mascotState === 'idle') {
    avatar = <SleepIcon size={32} />;
    villagerName = 'VILLAGER: SLEEPING';
    dialogue = '“Hrmmm... Bedrock furnace cold. Awaiting deploy order.”';
    statusBadge = 'IDLE';
    statusColor = 'text-zinc-400';
  } else if (mascotState === 'fail') {
    avatar = <CreeperIcon size={36} />;
    villagerName = 'VILLAGER: PANICKED';
    dialogue = '“HRK! Creeper blew up the container bridge! Checksum CRC mismatch!”';
    statusBadge = 'CREEPER';
    statusColor = 'text-[#ef4444]';
  }

  const effectiveProgress =
    mascotState === 'idle' ? 0 : mascotState === 'fail' ? 42 : progressPercent;

  const mascotTabs: { id: MascotState; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { id: 'idle', label: 'IDLE', icon: SleepIcon },
    { id: 'active', label: 'SMELT', icon: FireIcon },
    { id: 'fail', label: 'FAIL', icon: CreeperIcon },
  ];

  const stepIcons: React.FC<{ size?: number; className?: string }>[] = [
    AnvilIcon,
    FireIcon,
    ChestIcon,
    PickaxeIcon,
    BookIcon,
  ];

  return (
    <div className="mc-panel p-4 md:p-5 select-none">
      {/* Header */}
      <div
        className={`flex items-center justify-between pb-3 border-b-2 border-black/60 mb-4 ${
          collapsible ? 'cursor-pointer select-none' : ''
        }`}
        onClick={() => {
          if (collapsible) {
            playMinecraftClick();
            setCollapsed(!collapsed);
          }
        }}
      >
        <div className="flex items-center gap-2">
          <AnvilIcon size={16} />
          <span className="font-pixel text-[11px] text-zinc-100 tracking-wide">
            DEPLOY CRAFTING PIPELINE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-pixel text-[8px] font-bold ${statusColor}`}>
            [{statusBadge}]
          </span>
          {collapsible && (
            <motion.div
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="text-zinc-300"
            >
              <ChevronUp className="w-4 h-4 stroke-[3]" />
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.35 }}
            className="overflow-hidden space-y-4"
          >
            {/* Villager Master Librarian Dialog Box */}
            <div className="mc-inset p-3 flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{
                  scale: 1,
                  rotate: mascotState === 'fail' ? [-4, 4, -4, 4, 0] : 0,
                }}
                className="w-12 h-12 bg-[#2a2b30] border-2 border-black flex items-center justify-center shrink-0"
              >
                {avatar}
              </motion.div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[8px] text-[#55ffff]">
                    {villagerName}
                  </span>
                  <span className="bg-[#14532d] text-[#55ff55] font-pixel text-[6px] px-1 border border-[#22c55e] flex items-center gap-1">
                    TRADE: 24 PAPER &rarr; 1 <EmeraldIcon size={9} />
                  </span>
                </div>
                <p className="font-chakra text-xs text-zinc-200 font-bold mt-1 leading-snug">
                  {dialogue}
                </p>
              </div>
            </div>

            {/* Pipeline Stage Mode Selector Buttons */}
            <div className="grid grid-cols-3 gap-1.5">
              {mascotTabs.map((tab) => {
                const isActive = mascotState === tab.id;
                const TabIcon = tab.icon;
                const activeBtnClass =
                  tab.id === 'active'
                    ? 'mc-btn-ignite font-bold'
                    : tab.id === 'fail'
                    ? 'mc-btn-red font-bold'
                    : 'mc-btn-cyan font-bold';

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      playMinecraftClick();
                      onSetMascotState(tab.id);
                    }}
                    className={`mc-btn py-1.5 flex items-center justify-center gap-1.5 ${
                      isActive ? activeBtnClass : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    <TabIcon size={14} />
                    <span className="font-pixel text-[8px]">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Authentic Minecraft Experience (XP) Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-pixel text-[8px] text-zinc-300">
                <span className="flex items-center gap-1">
                  <span>EXP LEVEL:</span>
                  <span className="mc-xp-level-badge text-sm">
                    {effectiveProgress}
                  </span>
                </span>
                <span className="text-[#55ff55] flex items-center gap-1">
                  {mascotState === 'fail' ? (
                    <span className="text-[#ef4444] flex items-center gap-1">
                      <CreeperIcon size={12} /> CREEPER INTERRUPT
                    </span>
                  ) : (
                    `${effectiveProgress}% COMPILED`
                  )}
                </span>
              </div>

              {/* Minecraft XP Bar Frame */}
              <div className="mc-xp-container rounded-none px-0.5">
                <div className="mc-xp-track">
                  <div
                    className="mc-xp-fill"
                    style={{ width: `${effectiveProgress}%` }}
                  />
                  {/* Segmented notches (18 notches across XP bar) */}
                  {[...Array(18)].map((_, i) => (
                    <div
                      key={i}
                      className="mc-xp-notch"
                      style={{ left: `${((i + 1) / 18) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Step Progression Checklist with Minecraft Icons */}
            <div className="space-y-1.5 font-chakra text-xs font-bold">
              {steps.map((step, idx) => {
                const isPass = step.status === 'pass' && mascotState !== 'idle';
                const isActive = step.status === 'active' && mascotState === 'active';
                const isFail = step.status === 'active' && mascotState === 'fail';
                const isWait =
                  step.status === 'wait' || (mascotState === 'idle' && step.status !== 'pass');

                let badgeColor = 'text-[#00F0FF] font-bold';
                let badgeText = 'PASS';
                let timeText = step.time;

                if (isActive) {
                  badgeColor = 'text-[#FF9900] animate-pulse font-bold';
                  badgeText = 'CRAFTING...';
                  timeText = 'TICK 120ms';
                } else if (isFail) {
                  badgeColor = 'text-[#FF3B30] font-bold';
                  badgeText = 'FAIL';
                  timeText = 'CRC32 ERR';
                } else if (isWait) {
                  badgeColor = 'text-[#8C827A]';
                  badgeText = 'WAIT';
                  timeText = 'QUEUED';
                }

                return (
                  <motion.div
                    key={step.id}
                    layout
                    className={`flex items-center justify-between p-2 mc-inset transition-colors ${
                      isActive
                        ? 'border border-[#FF9900]/70 bg-[#291708] shadow-[0_0_8px_rgba(255,153,0,0.3)]'
                        : isFail
                        ? 'border border-[#FF3B30]/70 bg-[#2b0c10]'
                        : isPass
                        ? 'border-l-2 border-l-[#00F0FF]'
                        : ''
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="shrink-0 flex items-center justify-center">
                        {React.createElement(stepIcons[idx % stepIcons.length], { size: 14 })}
                      </span>
                      <span className="font-pixel text-[8px] text-zinc-200 truncate">
                        {step.name}
                      </span>
                    </span>
                    <div className="flex items-center gap-2 shrink-0 ml-2 font-mono-code text-[10px]">
                      <span className="text-zinc-400">{timeText}</span>
                      <span className={`font-pixel text-[7px] ${badgeColor}`}>
                        [{badgeText}]
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


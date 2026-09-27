import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playMinecraftAnvil, playMinecraftLevelUp } from '../utils/soundEffects';
import { AlertIcon, ClockIcon, LightningIcon } from './MinecraftIcons';

interface MobileBottomBarProps {
  isFlashing: boolean;
  onTriggerDeploy: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  isFlashing,
  onTriggerDeploy,
}) => {
  return (
    <aside className="fixed bottom-0 left-0 right-0 z-50 p-2.5 bg-[#141416]/95 backdrop-blur-md border-t-2 border-black/80">
      <div className="max-w-[440px] mx-auto select-none">
        {/* Active status banner if flashing */}
        <AnimatePresence>
          {isFlashing && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="mb-1.5 p-1 bg-[#2a1010] border border-[#ef4444] text-[#ffaa00] font-pixel text-center text-[8px] flex items-center justify-center gap-1.5"
            >
              <AlertIcon size={12} /> SMELTING BEDROCK BDS CONTAINER IN PROGRESS...
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => {
            playMinecraftAnvil();
            setTimeout(playMinecraftLevelUp, 180);
            onTriggerDeploy();
          }}
          disabled={isFlashing}
          className="w-full mc-btn mc-btn-green py-3 flex flex-col items-center justify-center cursor-pointer disabled:opacity-80"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex">
              {isFlashing ? <ClockIcon size={16} /> : <LightningIcon size={16} />}
            </span>
            <span className="font-pixel text-xs text-white drop-shadow-[1px_1px_0_#000]">
              {isFlashing ? 'SMELTING ROM...' : 'DEPLOY BEDROCK SERVER'}
            </span>
          </div>
          <span className="font-pixel text-[7px] text-[#55ff55] mt-0.5">
            [TAP TO RECOMPILE &amp; LOCK 20.0 TPS]
          </span>
        </button>
      </div>
    </aside>
  );
};


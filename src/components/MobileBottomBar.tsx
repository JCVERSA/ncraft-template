import React from 'react';
import { playCoinSound, playDeployFanfare } from '../utils/soundEffects';

interface MobileBottomBarProps {
  isFlashing: boolean;
  onTriggerDeploy: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  isFlashing,
  onTriggerDeploy,
}) => {
  return (
    <aside className="fixed bottom-0 left-0 right-0 z-50 p-2.5 bg-black/90 backdrop-blur-md border-t-4 border-black">
      <div className="max-w-[440px] mx-auto">
        {/* Active status bubble if flashing */}
        {isFlashing && (
          <div className="mb-1.5 p-1 bg-black border-2 border-red-500 text-yellow-300 font-pixel text-center text-[9px] animate-bounce">
            ⚡ WARNING: REBUILDING NATIVE BDS INSTANCE!
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            playCoinSound();
            setTimeout(playDeployFanfare, 150);
            onTriggerDeploy();
          }}
          disabled={isFlashing}
          className="w-full bg-[#FFE600] active:bg-yellow-400 disabled:opacity-80 text-black border-4 border-black p-2.5 md:p-3 font-archivo text-sm md:text-base uppercase tracking-wider flex flex-col items-center justify-center brutal-shadow brutal-press relative overflow-hidden cursor-pointer"
        >
          <div className="flex items-center gap-2 leading-none">
            <span className="text-lg md:text-xl animate-spin" style={{ animationDuration: '4s' }}>
              🕹️
            </span>
            <span className="drop-shadow-[1px_1px_0px_#fff]">
              {isFlashing ? '⚡ FLASHING CARTRIDGE...' : 'INSERT COIN // START ENGINE'}
            </span>
            <span className="text-lg md:text-xl">⚡</span>
          </div>
          <span className="font-pixel text-[8px] bg-black text-[#00F0FF] px-2 py-0.5 mt-1 border border-black">
            [PRESS 1P BUTTON TO REBUILD CONTAINER]
          </span>
        </button>
      </div>
    </aside>
  );
};

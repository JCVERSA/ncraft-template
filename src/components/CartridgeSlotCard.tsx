import React from 'react';
import { Sparkles, Disc, ChevronDown, Heart } from 'lucide-react';
import { CartridgeConfig } from '../types';
import { playButtonClick, playDeployFanfare, playCoinSound } from '../utils/soundEffects';

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
  return (
    <div className="bg-[#FF4D8D] border-4 border-black p-4 md:p-5 brutal-shadow-lg relative">
      {/* Top Cartridge Slot Header */}
      <div className="flex items-center justify-between pb-3 border-b-4 border-black mb-4">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-xs text-yellow-300">★ CARTRIDGE SLOT</span>
        </div>
        <span className="bg-black text-[#FFE600] font-pixel text-[8px] md:text-[9px] px-2 py-1 border border-black">
          {isFlashing ? 'FLASHING ROM...' : 'LOCKED & READY'}
        </span>
      </div>

      {/* Physical 3D Cartridge Shell */}
      <div
        className="bg-[#2D2A4A] border-4 border-black rounded-t-lg p-3 relative brutal-shadow cursor-pointer group"
        onClick={() => {
          if (onOpenCartridgeSelect) {
            playButtonClick();
            onOpenCartridgeSelect();
          }
        }}
        title="Click to view/switch cartridge ROM"
      >
        {/* Cartridge Vent Grooves */}
        <div className="h-5 md:h-6 w-full cartridge-grooves border-2 border-black mb-3" />

        {/* Cartridge Sticker / World Boxart */}
        <div className="bg-[#FFE600] border-4 border-black p-3 relative overflow-hidden transition-transform group-hover:scale-[1.01]">
          {/* Decorative cyan bubble */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#00F0FF] rounded-full border-2 border-black -z-0 opacity-40" />

          <div className="relative z-10">
            {/* Header info */}
            <div className="flex items-center justify-between">
              <span className="font-archivo text-[10px] md:text-xs bg-black text-white px-2 py-0.5 truncate max-w-[190px]">
                {cartridge.expansionName}
              </span>
              <span className="font-pixel text-[8px] text-black shrink-0">
                {cartridge.romSize}
              </span>
            </div>

            {/* Main Cartridge Centerpiece */}
            <div className="my-2.5 md:my-3 py-3 md:py-4 bg-white border-2 border-black flex flex-col items-center justify-center text-center px-2">
              <div className="text-3xl md:text-4xl mb-1 tracking-widest">{cartridge.icons}</div>
              <span className="font-archivo text-base md:text-lg tracking-tight uppercase text-black leading-tight">
                {cartridge.title}
              </span>
              <span className="font-pixel text-[8px] text-pink-600 mt-1">
                {cartridge.subtitle}
              </span>
            </div>

            {/* Barcode & Rating Stamp */}
            <div className="flex items-center justify-between pt-1 border-t-2 border-black">
              <div className="font-mono-code text-[10px] font-black tracking-widest bg-black text-white px-1">
                |||| | ||||| || |||
              </div>
              <div className="border-2 border-black bg-white px-1 py-0.5 font-pixel text-[8px] font-bold">
                RATED: {cartridge.ratedTps}
              </div>
            </div>
          </div>
        </div>

        {/* Gold Pin Connector Reveal */}
        <div className="mt-3 flex justify-around py-1 bg-yellow-700/70 border-t-2 border-black">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-2.5 md:w-3 h-2 bg-yellow-400 border border-black" />
          ))}
        </div>
      </div>

      {/* Giant Arcade Deploy Button */}
      <div className="mt-4 md:mt-5">
        <button
          onClick={() => {
            playCoinSound();
            setTimeout(playDeployFanfare, 150);
            onTriggerDeploy();
          }}
          disabled={isFlashing}
          className="w-full bg-[#FFE600] hover:bg-yellow-300 disabled:opacity-75 text-black border-4 border-black p-3.5 md:p-4 font-archivo text-lg md:text-xl uppercase tracking-wider flex flex-col items-center justify-center brutal-shadow brutal-press group relative overflow-hidden cursor-pointer"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-xl md:text-2xl animate-spin" style={{ animationDuration: '4s' }}>
              🕹️
            </span>
            <span className="drop-shadow-[1px_1px_0px_#fff]">
              {isFlashing ? '⚡ FLASHING CARTRIDGE...' : 'INSERT COIN // START ENGINE'}
            </span>
            <span className="text-xl md:text-2xl">⚡</span>
          </div>
          <span className="font-pixel text-[8px] md:text-[9px] bg-black text-[#00F0FF] px-2 py-0.5 mt-2 border border-black">
            [PRESS 1P BUTTON TO REBUILD CONTAINER]
          </span>
        </button>

        {isFlashing && (
          <div className="mt-2 p-2 bg-black border-2 border-red-500 text-yellow-300 font-pixel text-center text-[9px] md:text-[10px] animate-bounce">
            ⚡ WARNING: REBUILDING NATIVE BDS INSTANCE!
          </div>
        )}
      </div>

      {/* Bedrock Engine Version Picker */}
      <div className="mt-4 md:mt-5 bg-white border-4 border-black p-3 brutal-shadow-sm">
        <label
          className="font-archivo text-xs uppercase mb-1.5 flex items-center justify-between"
          htmlFor="bds-version-select"
        >
          <span>SELECT BDS ROM BINARY</span>
          <span className="bg-[#22C55E] text-white px-1.5 font-pixel text-[8px]">VERIFIED</span>
        </label>
        <div className="relative">
          <select
            id="bds-version-select"
            value={selectedVersion}
            onChange={(e) => {
              playButtonClick();
              onSelectVersion(e.target.value);
            }}
            className="w-full bg-[#FFE600] border-2 border-black text-black font-chakra font-bold text-xs md:text-sm px-3 py-2 pr-8 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="1.20.73.01">v1.20.73.01 (Latest Stable - Tricky Trials ready)</option>
            <option value="1.20.60.24">v1.20.60.24 (Legacy Long-Term Support)</option>
            <option value="1.20.50.03">v1.20.50.03 (Armadillo Backport Patch)</option>
            <option value="1.20.80.22">v1.20.80.22 (Bedrock Preview &amp; Experimental Scripting)</option>
          </select>
          <ChevronDown className="w-5 h-5 absolute right-2 top-2 pointer-events-none text-black stroke-[3]" />
        </div>
      </div>

      {/* Arcade Health / Heart Meters */}
      <div className="mt-4 flex items-center justify-between px-1 font-pixel text-[9px] text-white">
        <span>HEALTH:</span>
        <div className="flex gap-1 text-sm md:text-base">
          <span>❤️</span>
          <span>❤️</span>
          <span>❤️</span>
          <span>❤️</span>
          <span>❤️</span>
        </div>
        <span className="text-yellow-300">100 HP</span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, Copy, Check, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ServerProperties, GameMode, Difficulty } from '../types';
import { playMinecraftClick, playMinecraftStoneClick, playMinecraftXpOrb } from '../utils/soundEffects';
import {
  RepeaterIcon,
  DiamondSwordIcon,
  IronSwordIcon,
  BrickIcon,
  MapIcon,
  BreadIcon,
  SkullIcon,
  CommandBlockIcon,
} from './MinecraftIcons';

interface ServerPropertiesCardProps {
  config: ServerProperties;
  onChangeConfig: (newConfig: Partial<ServerProperties>) => void;
  onLogMessage: (tag: 'INFO' | 'PASS' | 'WARN' | 'CONF' | 'CMD', message: string) => void;
}

export const ServerPropertiesCard: React.FC<ServerPropertiesCardProps> = ({
  config,
  onChangeConfig,
  onLogMessage,
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [seedCopied, setSeedCopied] = useState(false);
  const [slotDirection, setSlotDirection] = useState<'up' | 'down'>('up');

  const handleModeChange = (mode: GameMode) => {
    playMinecraftClick();
    onChangeConfig({ gamemode: mode });
    onLogMessage('CONF', `Game mode set to ${mode.toUpperCase()}`);
  };

  const handleDifficultyChange = (diff: Difficulty) => {
    playMinecraftClick();
    onChangeConfig({ difficulty: diff });
    onLogMessage('CONF', `Difficulty adjusted to ${diff.toUpperCase()}`);
  };

  const handleSlotIncrement = () => {
    playMinecraftClick();
    if (config.maxPlayers < 100) {
      setSlotDirection('up');
      onChangeConfig({ maxPlayers: config.maxPlayers + 1 });
    }
  };

  const handleSlotDecrement = () => {
    playMinecraftClick();
    if (config.maxPlayers > 1) {
      setSlotDirection('down');
      onChangeConfig({ maxPlayers: config.maxPlayers - 1 });
    }
  };

  const handleCopySeed = () => {
    playMinecraftClick();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(config.worldSeed).catch(() => {});
    }
    setSeedCopied(true);
    setTimeout(() => setSeedCopied(false), 1600);
  };

  const handleCheatsToggle = () => {
    playMinecraftStoneClick();
    const nextVal = !config.cheatsEnabled;
    onChangeConfig({ cheatsEnabled: nextVal });
    if (nextVal) {
      onLogMessage('WARN', 'COMMAND BLOCKS & CHEATS ENABLED // ACHIEVEMENTS DEACTIVATED');
    } else {
      onLogMessage('INFO', 'Cheats disabled.');
    }
  };

  return (
    <div className="mc-panel p-4 md:p-5 select-none">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-black/60 mb-4 md:mb-5">
        <div className="flex items-center gap-2">
          <RepeaterIcon size={18} />
          <span className="font-pixel text-[11px] md:text-xs uppercase text-zinc-100 tracking-wide">
            SERVER.PROPERTIES
          </span>
        </div>
        <span className="bg-[#18181b] text-[#55ff55] font-pixel text-[8px] md:text-[9px] px-2 py-0.5 border border-black font-bold">
          BEDROCK CONFIG
        </span>
      </div>

      {/* MOTD & Level Save Slot */}
      <div className="space-y-3 mb-4">
        <div>
          <label
            className="block font-pixel text-[8px] uppercase mb-1.5 flex items-center justify-between text-[#DBC2AD]"
            htmlFor="cfg-server-name"
          >
            <span>SERVER MOTD BANNER</span>
            <span className="text-[#00F0FF]">§b[IN-GAME SERVER LIST]</span>
          </label>
          <input
            id="cfg-server-name"
            type="text"
            value={config.serverName}
            onChange={(e) => onChangeConfig({ serverName: e.target.value })}
            className="w-full mc-inset p-2.5 font-mono-code text-sm font-bold text-[#00F0FF] bg-[#0E0C10] focus:outline-none focus:ring-1 focus:ring-[#FF9900] transition-all shadow-[inset_2px_2px_0px_#08060A]"
          />
        </div>

        <div>
          <label
            className="block font-pixel text-[8px] uppercase mb-1.5 flex items-center justify-between text-[#DBC2AD]"
            htmlFor="cfg-level-name"
          >
            <span>ACTIVE WORLD SAVE SLOT (LEVEL-NAME)</span>
            <span className="text-[#FF9900]">§6[WORLDS/FOLDER]</span>
          </label>
          <input
            id="cfg-level-name"
            type="text"
            value={config.levelName}
            onChange={(e) => onChangeConfig({ levelName: e.target.value })}
            className="w-full mc-inset p-2.5 font-mono-code text-sm font-bold text-[#00F0FF] bg-[#0E0C10] focus:outline-none focus:ring-1 focus:ring-[#FF9900] transition-all shadow-[inset_2px_2px_0px_#08060A]"
          />
        </div>
      </div>

      {/* Game Mode Selector with Minecraft Buttons */}
      <div className="mb-4">
        <label className="block font-pixel text-[8px] uppercase mb-1.5 text-[#DBC2AD]">
          GAMEPLAY MODE SELECTOR
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {(
            [
              { mode: 'survival', icon: DiamondSwordIcon, label: 'SURVIVAL', activeClass: 'mc-btn-red font-bold' },
              { mode: 'creative', icon: BrickIcon, label: 'CREATIVE', activeClass: 'mc-btn-ignite font-bold' },
              { mode: 'adventure', icon: MapIcon, label: 'ADVENTURE', activeClass: 'mc-btn-portal font-bold' },
            ] as const
          ).map(({ mode, icon: ModeIcon, label, activeClass }) => {
            const isSelected = config.gamemode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => handleModeChange(mode)}
                className={`mc-btn py-2 flex items-center justify-center gap-1.5 ${
                  isSelected ? activeClass : 'opacity-85 hover:opacity-100'
                }`}
              >
                <ModeIcon size={14} />
                <span className="font-pixel text-[8px]">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Level Buttons */}
      <div className="mb-4">
        <label className="block font-pixel text-[8px] uppercase mb-1.5 text-[#DBC2AD]">
          DIFFICULTY LEVEL
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {(
            [
              { diff: 'peaceful', icon: BreadIcon, label: 'PEACEFUL', activeClass: 'mc-btn-green font-bold' },
              { diff: 'easy', icon: IronSwordIcon, label: 'EASY', activeClass: 'mc-btn-cyan font-bold' },
              { diff: 'normal', icon: DiamondSwordIcon, label: 'NORMAL', activeClass: 'mc-btn-gold font-bold' },
              { diff: 'hard', icon: SkullIcon, label: 'HARD', activeClass: 'mc-btn-red font-bold' },
            ] as const
          ).map(({ diff, icon: DiffIcon, label, activeClass }) => {
            const isSelected = config.difficulty === diff;
            return (
              <button
                key={diff}
                type="button"
                onClick={() => handleDifficultyChange(diff)}
                className={`mc-btn py-1.5 px-1 flex flex-col items-center justify-center text-center gap-1 ${
                  isSelected ? activeClass : 'opacity-85 hover:opacity-100'
                }`}
              >
                <DiffIcon size={14} />
                <span className="font-pixel text-[7px] mt-0.5">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Players & UDP Port */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label
            className="block font-pixel text-[8px] uppercase mb-1.5 text-zinc-300"
            htmlFor="cfg-max-players"
          >
            MAX PLAYERS SLOTS
          </label>
          <div className="flex items-center mc-inset p-1">
            <button
              type="button"
              onClick={handleSlotDecrement}
              className="mc-btn py-1 px-3 text-sm"
            >
              -
            </button>

            <div className="w-full h-8 flex items-center justify-center font-pixel text-sm text-[#55ff55]">
              {config.maxPlayers} SLOTS
            </div>

            <button
              type="button"
              onClick={handleSlotIncrement}
              className="mc-btn py-1 px-3 text-sm"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label
            className="block font-pixel text-[8px] uppercase mb-1.5 text-zinc-300"
            htmlFor="cfg-port"
          >
            BEDROCK PORT (UDP/V4)
          </label>
          <div className="flex items-center mc-inset p-1.5">
            <input
              id="cfg-port"
              type="number"
              value={config.port}
              onChange={(e) =>
                onChangeConfig({ port: parseInt(e.target.value) || 19132 })
              }
              className="w-full font-mono-code font-bold text-sm text-[#55ffff] bg-transparent focus:outline-none px-2"
            />
            <span className="bg-[#18181b] text-zinc-300 font-pixel text-[7px] px-1.5 py-0.5 border border-black shrink-0">
              V6: {config.v6Port}
            </span>
          </div>
        </div>
      </div>

      {/* Advanced World Seed & Cheats Accordion */}
      <div className="mc-inset overflow-hidden">
        <button
          type="button"
          onClick={() => {
            playMinecraftClick();
            setAccordionOpen(!accordionOpen);
          }}
          className="w-full p-2.5 bg-[#252629] hover:bg-[#2e2f33] text-zinc-200 flex items-center justify-between font-pixel text-[8px] uppercase cursor-pointer select-none transition-colors"
        >
          <span className="flex items-center gap-2">
            <CommandBlockIcon size={14} />
            <span>WORLD SEED, CHUNKS &amp; COMMAND BLOCKS</span>
          </span>
          <motion.div
            animate={{ rotate: accordionOpen ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <ChevronDown className="w-4 h-4 text-zinc-400 stroke-[3]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {accordionOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.12, duration: 0.35 }}
              className="overflow-hidden bg-[#18181a] border-t border-black p-3 space-y-3"
            >
              {/* World Seed */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-pixel text-[8px] text-zinc-300" htmlFor="cfg-world-seed">
                    WORLD GENERATION SEED
                  </label>
                  <button
                    type="button"
                    onClick={handleCopySeed}
                    className="font-pixel text-[7px] bg-[#252629] text-[#55ff55] hover:bg-[#323338] px-2 py-0.5 border border-black cursor-pointer flex items-center gap-1 font-bold"
                  >
                    {seedCopied ? (
                      <>
                        <Check className="w-3 h-3 text-[#55ff55]" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-zinc-400" />
                        <span>COPY SEED</span>
                      </>
                    )}
                  </button>
                </div>
                <input
                  id="cfg-world-seed"
                  type="text"
                  value={config.worldSeed}
                  onChange={(e) => onChangeConfig({ worldSeed: e.target.value })}
                  className="w-full mc-inset p-2 font-mono-code text-xs text-[#55ffff] focus:outline-none"
                />
              </div>

              {/* View Distance & Sim Distance */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between font-pixel text-[7px] text-zinc-300 mb-1">
                    <span>VIEW DIST:</span>
                    <span className="text-[#ffaa00]">{config.viewDistance} CHUNKS</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={32}
                    step={2}
                    value={config.viewDistance}
                    onChange={(e) =>
                      onChangeConfig({ viewDistance: parseInt(e.target.value) })
                    }
                    className="w-full accent-[#55ff55] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-pixel text-[7px] text-zinc-300 mb-1">
                    <span>SIM DIST:</span>
                    <span className="text-[#c084fc]">{config.simulationDistance} CHUNKS</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={12}
                    step={2}
                    value={config.simulationDistance}
                    onChange={(e) =>
                      onChangeConfig({ simulationDistance: parseInt(e.target.value) })
                    }
                    className="w-full accent-[#c084fc] cursor-pointer"
                  />
                </div>
              </div>

              {/* Redstone Command Blocks Toggle */}
              <div className="flex items-center justify-between p-2 mc-inset">
                <div>
                  <div className="font-pixel text-[8px] text-zinc-200">
                    ALLOW CHEATS &amp; COMMAND BLOCKS
                  </div>
                  <div className="font-pixel text-[6px] text-[#ef4444] mt-0.5">
                    Deactivates Xbox Live Achievements on BDS
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCheatsToggle}
                  className={`mc-btn px-3 py-1 text-[8px] ${
                    config.cheatsEnabled ? 'mc-btn-green' : 'mc-btn-red'
                  }`}
                >
                  {config.cheatsEnabled ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


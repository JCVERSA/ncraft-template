import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal, Copy, Check } from 'lucide-react';
import { ServerProperties, GameMode, Difficulty } from '../types';
import { playButtonClick, playSwitchSound } from '../utils/soundEffects';

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

  const handleModeChange = (mode: GameMode) => {
    playButtonClick();
    onChangeConfig({ gamemode: mode });
    onLogMessage('CONF', `Game mode set to ${mode.toUpperCase()}`);
  };

  const handleDifficultyChange = (diff: Difficulty) => {
    playButtonClick();
    onChangeConfig({ difficulty: diff });
    onLogMessage('CONF', `Difficulty adjusted to ${diff.toUpperCase()}`);
  };

  const handleSlotIncrement = () => {
    playButtonClick();
    if (config.maxPlayers < 100) {
      onChangeConfig({ maxPlayers: config.maxPlayers + 1 });
    }
  };

  const handleSlotDecrement = () => {
    playButtonClick();
    if (config.maxPlayers > 1) {
      onChangeConfig({ maxPlayers: config.maxPlayers - 1 });
    }
  };

  const handleCopySeed = () => {
    playButtonClick();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(config.worldSeed).catch(() => {});
    }
    setSeedCopied(true);
    setTimeout(() => setSeedCopied(false), 1600);
  };

  const handleCheatsToggle = () => {
    playSwitchSound();
    const nextVal = !config.cheatsEnabled;
    onChangeConfig({ cheatsEnabled: nextVal });
    if (nextVal) {
      onLogMessage('WARN', 'CHEATS ENABLED // ACHIEVEMENTS DEACTIVATED');
    } else {
      onLogMessage('INFO', 'Cheats disabled.');
    }
  };

  return (
    <div className="bg-[#FFE600] border-4 border-black p-4 md:p-5 brutal-shadow-lg">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b-4 border-black mb-4 md:mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎛️</span>
          <span className="font-archivo text-base md:text-lg uppercase text-black">
            SERVER.PROPERTIES CONTROLS
          </span>
        </div>
        <span className="bg-[#FF4D8D] text-white font-pixel text-[8px] md:text-[9px] px-2 py-1 border-2 border-black">
          PROTOCOL V662
        </span>
      </div>

      {/* MOTD & Level Save Slot */}
      <div className="space-y-3 md:space-y-4 mb-4 md:mb-5">
        <div>
          <label
            className="block font-archivo text-xs uppercase mb-1 flex items-center justify-between text-black"
            htmlFor="cfg-server-name"
          >
            <span>SERVER MOTD BANNER</span>
            <span className="font-pixel text-[8px] text-pink-600">[ARCADE MARQUEE]</span>
          </label>
          <input
            id="cfg-server-name"
            type="text"
            value={config.serverName}
            onChange={(e) => onChangeConfig({ serverName: e.target.value })}
            className="w-full bg-white border-3 border-black p-2 md:p-2.5 font-chakra text-sm md:text-base font-bold text-black focus:bg-yellow-50 focus:outline-none brutal-shadow-sm"
          />
        </div>

        <div>
          <label
            className="block font-archivo text-xs uppercase mb-1 flex items-center justify-between text-black"
            htmlFor="cfg-level-name"
          >
            <span>ACTIVE WORLD SAVE SLOT (LEVEL-NAME)</span>
            <span className="font-pixel text-[8px] text-purple-700">[SLOT A]</span>
          </label>
          <input
            id="cfg-level-name"
            type="text"
            value={config.levelName}
            onChange={(e) => onChangeConfig({ levelName: e.target.value })}
            className="w-full bg-white border-3 border-black p-2 md:p-2.5 font-chakra text-sm md:text-base font-bold text-black focus:bg-yellow-50 focus:outline-none brutal-shadow-sm"
          />
        </div>
      </div>

      {/* Tactile Game Mode Switcher */}
      <div className="mb-4 md:mb-5">
        <label className="block font-archivo text-xs uppercase mb-1.5 text-black">
          GAMEPLAY MODE SELECTOR
        </label>
        <div className="grid grid-cols-3 gap-1.5 md:gap-2">
          {(['survival', 'creative', 'adventure'] as GameMode[]).map((mode) => {
            const isSelected = config.gamemode === mode;
            const icon =
              mode === 'survival' ? '⚔️' : mode === 'creative' ? '🧱' : '🗺️';
            return (
              <button
                key={mode}
                type="button"
                onClick={() => handleModeChange(mode)}
                className={`py-2 md:py-2.5 px-1 md:px-2 border-3 border-black font-archivo text-[10px] md:text-xs uppercase brutal-shadow-sm brutal-press cursor-pointer ${
                  isSelected
                    ? 'bg-black text-[#FFE600]'
                    : 'bg-white text-black hover:bg-pink-100'
                }`}
              >
                {icon} {mode.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Stepper Buttons */}
      <div className="mb-4 md:mb-5">
        <label className="block font-archivo text-xs uppercase mb-1.5 text-black">
          DIFFICULTY LEVEL
        </label>
        <div className="grid grid-cols-4 gap-1 md:gap-1.5">
          {(['peaceful', 'easy', 'normal', 'hard'] as Difficulty[]).map((diff) => {
            const isSelected = config.difficulty === diff;
            return (
              <button
                key={diff}
                type="button"
                onClick={() => handleDifficultyChange(diff)}
                className={`py-1.5 md:py-2 border-2 border-black font-pixel text-[7px] md:text-[8px] uppercase brutal-shadow-sm brutal-press cursor-pointer ${
                  isSelected
                    ? 'bg-[#FF4D8D] text-white'
                    : 'bg-white text-black hover:bg-cyan-100'
                }`}
              >
                {diff.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Players & UDP Port */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-5">
        <div>
          <label
            className="block font-archivo text-xs uppercase mb-1 text-black"
            htmlFor="cfg-max-players"
          >
            MAX PLAYERS SLOTS
          </label>
          <div className="flex items-center bg-white border-3 border-black brutal-shadow-sm">
            <button
              type="button"
              onClick={handleSlotDecrement}
              className="w-10 md:w-12 py-1.5 md:py-2 bg-black text-white hover:bg-yellow-400 hover:text-black font-archivo text-lg md:text-xl border-r-2 border-black transition-colors cursor-pointer select-none"
            >
              -
            </button>
            <input
              id="cfg-max-players"
              type="number"
              min={1}
              max={100}
              value={config.maxPlayers}
              onChange={(e) =>
                onChangeConfig({ maxPlayers: Math.max(1, parseInt(e.target.value) || 1) })
              }
              className="w-full text-center bg-transparent py-1.5 md:py-2 font-chakra font-black text-lg md:text-xl text-black focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSlotIncrement}
              className="w-10 md:w-12 py-1.5 md:py-2 bg-black text-white hover:bg-yellow-400 hover:text-black font-archivo text-lg md:text-xl border-l-2 border-black transition-colors cursor-pointer select-none"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label
            className="block font-archivo text-xs uppercase mb-1 text-black"
            htmlFor="cfg-port"
          >
            PORT (UDP/V4)
          </label>
          <div className="flex items-center bg-white border-3 border-black p-1.5 brutal-shadow-sm">
            <input
              id="cfg-port"
              type="number"
              value={config.port}
              onChange={(e) =>
                onChangeConfig({ port: parseInt(e.target.value) || 19132 })
              }
              className="w-full font-mono-code font-bold text-sm md:text-base text-black bg-transparent focus:outline-none px-2"
            />
            <span className="bg-[#00F0FF] text-black font-pixel text-[7px] md:text-[8px] px-1.5 py-1 border border-black shrink-0">
              V6: {config.v6Port}
            </span>
          </div>
        </div>
      </div>

      {/* Advanced Engine Chunks & Cheats Accordion */}
      <div className="border-3 border-black bg-white brutal-shadow-sm">
        <button
          type="button"
          onClick={() => {
            playButtonClick();
            setAccordionOpen(!accordionOpen);
          }}
          className="w-full p-2.5 md:p-3 bg-black text-[#FFE600] flex items-center justify-between font-archivo text-[11px] md:text-xs uppercase cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span className="text-sm md:text-base">⚙️</span>
            <span>ADVANCED ENGINE CHUNKS &amp; CHEATS</span>
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 stroke-[3] ${
              accordionOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {accordionOpen && (
          <div className="p-3 md:p-4 space-y-3 md:space-y-4 bg-yellow-50 border-t-2 border-black">
            {/* World Seed */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-archivo text-xs uppercase text-black" htmlFor="cfg-world-seed">
                  WORLD SEED
                </label>
                <button
                  type="button"
                  onClick={handleCopySeed}
                  className="font-pixel text-[8px] bg-[#00F0FF] text-black px-1.5 py-0.5 border border-black hover:bg-yellow-300 cursor-pointer flex items-center gap-1"
                >
                  {seedCopied ? (
                    <>
                      <Check className="w-3 h-3 text-black" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-black" />
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
                className="w-full bg-white border-2 border-black p-2 font-mono-code text-xs font-bold text-black focus:outline-none"
              />
            </div>

            {/* Sliders for View & Sim Distance */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between font-pixel text-[8px] mb-1">
                  <span>VIEW DIST</span>
                  <span className="font-bold text-pink-600">
                    {config.viewDistance} CHUNKS
                  </span>
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
                  className="w-full accent-black cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-pixel text-[8px] mb-1">
                  <span>SIM DIST</span>
                  <span className="font-bold text-purple-700">
                    {config.simulationDistance} CHUNKS
                  </span>
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
                  className="w-full accent-black cursor-pointer"
                />
              </div>
            </div>

            {/* Cheats Toggle Switch */}
            <div className="flex items-center justify-between p-2 md:p-2.5 bg-white border-2 border-black">
              <div>
                <div className="font-archivo text-xs uppercase text-black">
                  COMMAND BLOCKS &amp; CHEATS
                </div>
                <div className="font-pixel text-[7px] text-red-600">
                  Xbox Achievements Disabled
                </div>
              </div>
              <button
                type="button"
                onClick={handleCheatsToggle}
                className="w-13 md:w-14 h-7 bg-black p-0.5 border-2 border-black relative transition-colors cursor-pointer"
              >
                <div
                  className={`w-5 h-5 border border-black transition-transform duration-200 ${
                    config.cheatsEnabled
                      ? 'translate-x-6 bg-[#22C55E]'
                      : 'translate-x-0 bg-[#FF4D8D]'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playMinecraftClick, playMinecraftLevelUp } from '../utils/soundEffects';
import { CloseIcon, AlertIcon } from './MinecraftIcons';

interface EnlistOpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOperator: (xuid: string, gamertag: string, role: string) => void;
}

export const EnlistOpModal: React.FC<EnlistOpModalProps> = ({
  isOpen,
  onClose,
  onAddOperator,
}) => {
  const [xuid, setXuid] = useState('');
  const [gamertag, setGamertag] = useState('');
  const [role, setRole] = useState('OP LVL 4');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!xuid.trim()) {
      setError('Please provide a 16-digit XUID');
      return;
    }
    if (!gamertag.trim()) {
      setError('Please provide a Minecraft gamertag');
      return;
    }

    playMinecraftLevelUp();
    onAddOperator(xuid.trim(), gamertag.trim(), role);
    setXuid('');
    setGamertag('');
    setError('');
    onClose();
  };

  const handleRandomize = () => {
    playMinecraftClick();
    const randomXuid = '2535' + Math.floor(100000000000 + Math.random() * 900000000000).toString();
    const tags = ['AlexCraft', 'SteveVoid', 'NetherKnight', 'RedstoneGuru', 'PixelMiner'];
    const chosenTag = tags[Math.floor(Math.random() * tags.length)];
    setXuid(randomXuid);
    setGamertag(chosenTag);
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Backdrop Blur Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="mc-panel p-5 md:p-6 w-full max-w-md space-y-4 relative z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-black/60 pb-3">
              <span className="font-pixel text-sm uppercase text-zinc-100 font-bold">
                ENLIST OPERATOR (OP)
              </span>
              <button
                type="button"
                onClick={() => {
                  playMinecraftClick();
                  onClose();
                }}
                className="mc-btn py-1 px-2 text-zinc-300 font-pixel text-xs cursor-pointer inline-flex items-center justify-center"
                title="Close"
              >
                <CloseIcon size={12} />
              </button>
            </div>

            {error && (
              <div className="p-2 bg-[#2a1010] text-[#ef4444] font-pixel text-[8px] border border-[#ef4444] flex items-center gap-1.5">
                <AlertIcon size={12} /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 font-chakra font-bold">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block font-pixel text-[8px] text-zinc-300">
                    XBOX USER ID (16 DIGIT XUID)
                  </label>
                  <button
                    type="button"
                    onClick={handleRandomize}
                    className="mc-btn py-0.5 px-2 text-[7px] text-[#55ffff]"
                  >
                    RANDOM
                  </button>
                </div>
                <input
                  type="text"
                  value={xuid}
                  onChange={(e) => {
                    setXuid(e.target.value);
                    setError('');
                  }}
                  placeholder="e.g. 2535499281726354"
                  className="w-full mc-inset p-2 font-mono-code text-xs text-[#55ffff] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-pixel text-[8px] mb-1 text-zinc-300">
                  MINECRAFT GAMERTAG
                </label>
                <input
                  type="text"
                  value={gamertag}
                  onChange={(e) => {
                    setGamertag(e.target.value);
                    setError('');
                  }}
                  placeholder="e.g. NetherKnight"
                  className="w-full mc-inset p-2 font-chakra text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-pixel text-[8px] mb-1 text-zinc-300">
                  PERMISSION ROLE LEVEL
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full mc-inset p-2 font-chakra text-sm font-bold text-white focus:outline-none cursor-pointer"
                >
                  <option value="OP LVL 4">OP LVL 4 (Full Admin)</option>
                  <option value="MODERATOR">MODERATOR (Kick / Teleport)</option>
                  <option value="VIP">VIP (Whitelist Priority)</option>
                </select>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-black/60">
                <button
                  type="button"
                  onClick={() => {
                    playMinecraftClick();
                    onClose();
                  }}
                  className="mc-btn py-2 px-3 text-[8px]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="mc-btn mc-btn-green py-2 px-3 text-[8px]"
                >
                  ADD TO WHITELIST
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


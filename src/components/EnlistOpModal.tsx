import React, { useState } from 'react';
import { playButtonClick, playDeployFanfare } from '../utils/soundEffects';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!xuid.trim()) {
      setError('Please provide a 16-digit XUID');
      return;
    }
    if (!gamertag.trim()) {
      setError('Please provide an arcade gamertag');
      return;
    }

    playDeployFanfare();
    onAddOperator(xuid.trim(), gamertag.trim(), role);
    setXuid('');
    setGamertag('');
    setError('');
    onClose();
  };

  const handleRandomize = () => {
    playButtonClick();
    const randomXuid = '2535' + Math.floor(100000000000 + Math.random() * 900000000000).toString();
    const tags = ['CreeperBuster', 'RedstoneWiz', 'NetherKnight', 'VoidWalker', 'PixelCrafter'];
    const chosenTag = tags[Math.floor(Math.random() * tags.length)];
    setXuid(randomXuid);
    setGamertag(chosenTag);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFE600] border-4 border-black p-5 md:p-6 w-full max-w-md brutal-shadow-lg space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-4 border-black pb-3">
          <span className="font-archivo text-lg md:text-xl uppercase text-black font-black">
            ENLIST PLAYER (OP)
          </span>
          <button
            type="button"
            onClick={() => {
              playButtonClick();
              onClose();
            }}
            className="bg-black text-white hover:bg-red-600 border-2 border-black p-1.5 font-pixel text-xs cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="p-2 bg-red-600 text-white font-pixel text-[8px] border-2 border-black">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 font-chakra font-bold">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block font-archivo text-xs uppercase text-black">
                XBOX USER ID (16 DIGIT XUID)
              </label>
              <button
                type="button"
                onClick={handleRandomize}
                className="font-pixel text-[7px] bg-[#00F0FF] text-black px-1.5 py-0.5 border border-black hover:bg-yellow-300 cursor-pointer"
              >
                GENERATE
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
              className="w-full bg-white border-3 border-black p-2 font-mono-code text-xs md:text-sm text-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-archivo text-xs uppercase mb-1 text-black">
              ARCADE GAMERTAG
            </label>
            <input
              type="text"
              value={gamertag}
              onChange={(e) => {
                setGamertag(e.target.value);
                setError('');
              }}
              placeholder="e.g. NetherKnight"
              className="w-full bg-white border-3 border-black p-2 font-chakra text-sm md:text-base text-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-archivo text-xs uppercase mb-1 text-black">
              PERMISSION LEVEL
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white border-3 border-black p-2 font-chakra text-sm font-bold text-black focus:outline-none cursor-pointer"
            >
              <option value="OP LVL 4">OP LVL 4 (Full Admin)</option>
              <option value="MODERATOR">MODERATOR (Kick / Teleport)</option>
              <option value="VIP">VIP (Whitelist Priority)</option>
            </select>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t-2 border-black">
            <button
              type="button"
              onClick={() => {
                playButtonClick();
                onClose();
              }}
              className="bg-white hover:bg-gray-200 text-black border-2 border-black px-4 py-2 font-archivo text-xs uppercase brutal-press cursor-pointer font-black"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="bg-[#FF4D8D] hover:bg-pink-400 text-white border-2 border-black px-4 py-2 font-archivo text-xs uppercase brutal-press cursor-pointer font-black"
            >
              SAVE TO CASSETTE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

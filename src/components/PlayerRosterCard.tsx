import React from 'react';
import { Users, UserPlus, AlertTriangle } from 'lucide-react';
import { Operator } from '../types';
import { playButtonClick, playErrorBuzzer, playPurgeSound } from '../utils/soundEffects';

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
  return (
    <div className="bg-[#A855F7] border-4 border-black p-4 md:p-5 brutal-shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b-4 border-black mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">👥</span>
          <span className="font-archivo text-sm md:text-base uppercase text-white truncate">
            PLAYER ROSTER // OPS (XUID)
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            playButtonClick();
            onOpenEnlistModal();
          }}
          className="bg-[#FFE600] hover:bg-yellow-300 text-black border-2 border-black px-2 md:px-2.5 py-1 font-pixel text-[8px] uppercase brutal-shadow-sm brutal-press shrink-0 cursor-pointer font-bold"
        >
          + ENLIST OP
        </button>
      </div>

      {/* Operator List */}
      <div className="space-y-2.5">
        {operators.map((op) => {
          if (op.isCorrupt) {
            return (
              <div
                key={op.id}
                className="bg-[#FF4D8D] border-3 border-black p-2 md:p-2.5 flex items-center justify-between text-white brutal-shadow-sm"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-pixel text-[10px] shrink-0">⚠️</span>
                  <div className="min-w-0">
                    <div className="font-pixel text-[8px] uppercase line-through truncate opacity-90">
                      {op.xuid}
                    </div>
                    <div className="font-chakra font-bold text-xs text-yellow-300 truncate">
                      CORRUPT XUID RECORD
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playPurgeSound();
                    onPurgeRecord(op.id);
                  }}
                  className="bg-black text-white hover:bg-yellow-300 hover:text-black border border-black px-2 py-0.5 font-pixel text-[8px] transition-colors shrink-0 cursor-pointer"
                  title="Purge Corrupt Record"
                >
                  PURGE
                </button>
              </div>
            );
          }

          return (
            <div
              key={op.id}
              className="bg-white border-3 border-black p-2 md:p-2.5 flex items-center justify-between brutal-shadow-sm"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-8 h-8 border-2 border-black flex items-center justify-center font-pixel text-xs shrink-0 font-bold"
                  style={{ backgroundColor: op.slotBg || '#FFE600' }}
                >
                  {op.playerSlot || 'OP'}
                </div>
                <div className="min-w-0">
                  <div className="font-chakra font-black text-xs md:text-sm text-black flex items-center gap-2 truncate">
                    <span className="truncate">{op.gamertag}</span>
                    <span
                      className="text-white px-1 font-pixel text-[7px] shrink-0 font-bold"
                      style={{ backgroundColor: op.roleBg || '#22C55E' }}
                    >
                      {op.role}
                    </span>
                  </div>
                  <div className="font-mono-code text-[10px] md:text-[11px] text-gray-700 truncate">
                    XUID: {op.xuid}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playErrorBuzzer();
                  onKickOperator(op.id, op.gamertag);
                }}
                className="bg-black text-white hover:bg-red-600 border border-black px-2 py-1 font-pixel text-[8px] transition-colors shrink-0 cursor-pointer"
                title="Revoke and Kick"
              >
                KICK
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

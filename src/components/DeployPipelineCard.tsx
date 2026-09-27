import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MascotState, PipelineStep } from '../types';
import { playButtonClick, playErrorBuzzer } from '../utils/soundEffects';

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

  // Mascot details based on state
  let avatar = '🧙‍♂️';
  let dialogue = '"Hmm! Extracting BDS container layers into cartridge RAM..."';
  let statusBadge = 'RUNNING';
  let statusColor = 'bg-black text-[#FFE600]';

  if (mascotState === 'idle') {
    avatar = '😴';
    dialogue = '"Hrrm... Awaiting 1P deploy command."';
    statusBadge = 'IDLE';
    statusColor = 'bg-black text-white';
  } else if (mascotState === 'fail') {
    avatar = '💥';
    dialogue = '"K.O.! Checksum mismatch in bedrock_server binary!"';
    statusBadge = 'ERROR';
    statusColor = 'bg-black text-[#FF4D8D]';
  }

  const effectiveProgress =
    mascotState === 'idle' ? 0 : mascotState === 'fail' ? 42 : progressPercent;

  return (
    <div className="bg-[#00F0FF] border-4 border-black p-4 md:p-5 brutal-shadow-lg">
      {/* Header */}
      <div
        className={`flex items-center justify-between pb-3 border-b-4 border-black mb-4 ${
          collapsible ? 'cursor-pointer select-none' : ''
        }`}
        onClick={() => {
          if (collapsible) {
            playButtonClick();
            setCollapsed(!collapsed);
          }
        }}
      >
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 bg-black" />
          <span className="font-archivo text-sm md:text-base uppercase text-black">
            DEPLOY PIPELINE: STAGE 4
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`font-pixel text-[8px] md:text-[9px] px-2 py-1 ${statusColor}`}>
            {statusBadge}
          </span>
          {collapsible && (
            <button className="text-black p-0.5">
              {collapsed ? (
                <ChevronDown className="w-5 h-5 stroke-[3]" />
              ) : (
                <ChevronUp className="w-5 h-5 stroke-[3]" />
              )}
            </button>
          )}
        </div>
      </div>

      {!collapsed && (
        <div className="space-y-4">
          {/* Mascot Village Engineer in Arcade Dialog Box */}
          <div className="bg-white border-4 border-black p-2.5 md:p-3 flex items-center gap-3 brutal-shadow-sm">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FFE600] border-2 border-black flex items-center justify-center text-2xl md:text-3xl shrink-0">
              {avatar}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-archivo text-[11px] md:text-xs uppercase text-purple-700">
                  NPC: Master Librarian
                </span>
                <span className="bg-purple-200 text-purple-900 font-pixel text-[7px] px-1 border border-purple-800">
                  LVL 99
                </span>
              </div>
              <p className="font-chakra text-xs text-black font-bold mt-0.5 md:mt-1 leading-snug">
                {dialogue}
              </p>
            </div>
          </div>

          {/* Mascot Switch Buttons */}
          <div className="grid grid-cols-3 gap-1 md:gap-1.5">
            <button
              onClick={() => {
                playButtonClick();
                onSetMascotState('idle');
              }}
              className={`border-2 border-black font-pixel text-[8px] py-1.5 font-bold transition-all cursor-pointer ${
                mascotState === 'idle'
                  ? 'bg-black text-[#FFE600]'
                  : 'bg-white text-black hover:bg-yellow-100'
              }`}
            >
              1P IDLE
            </button>
            <button
              onClick={() => {
                playButtonClick();
                onSetMascotState('active');
              }}
              className={`border-2 border-black font-pixel text-[8px] py-1.5 font-bold transition-all cursor-pointer ${
                mascotState === 'active'
                  ? 'bg-black text-[#FFE600]'
                  : 'bg-white text-black hover:bg-yellow-100'
              }`}
            >
              2P COMBO
            </button>
            <button
              onClick={() => {
                playErrorBuzzer();
                onSetMascotState('fail');
              }}
              className={`border-2 border-black font-pixel text-[8px] py-1.5 font-bold transition-all cursor-pointer ${
                mascotState === 'fail'
                  ? 'bg-black text-[#FF4D8D]'
                  : 'bg-white text-black hover:bg-red-100'
              }`}
            >
              K.O. FAIL
            </button>
          </div>

          {/* Giant Pixel Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-pixel text-[8px] md:text-[9px] text-black">
              <span>ROM FLASH BUFFER</span>
              <span className="font-bold">
                {mascotState === 'fail' ? 'HALTED' : `${effectiveProgress}%`}
              </span>
            </div>
            <div className="h-5 md:h-6 w-full bg-black border-2 border-black p-0.5 md:p-1">
              <div
                className={`h-full transition-all duration-300 ${
                  mascotState === 'fail' ? 'bg-[#FF4D8D]' : 'bg-[#FFE600]'
                }`}
                style={{ width: `${effectiveProgress}%` }}
              />
            </div>
          </div>

          {/* Step Progression Checklist with Arcade Stamps */}
          <div className="space-y-1.5 md:space-y-2 font-chakra text-xs font-bold">
            {steps.map((step) => {
              const isPass = step.status === 'pass' && mascotState !== 'idle';
              const isActive =
                step.status === 'active' && mascotState === 'active';
              const isFail =
                step.status === 'active' && mascotState === 'fail';
              const isWait =
                step.status === 'wait' ||
                (mascotState === 'idle' && step.status !== 'pass');

              let rowClass = 'bg-white border-2 border-black';
              let badgeBg = 'bg-[#22C55E] text-white';
              let badgeText = 'PASS';
              let timeText = step.time;

              if (isActive) {
                rowClass = 'bg-[#FFE600] border-2 border-black animate-pulse';
                badgeBg = 'bg-black text-[#FFE600]';
                badgeText = 'ACTIVE';
                timeText = 'PROCESSING...';
              } else if (isFail) {
                rowClass = 'bg-[#FF4D8D] text-white border-2 border-black';
                badgeBg = 'bg-black text-white';
                badgeText = 'FAIL';
                timeText = 'ERR_CRC32';
              } else if (isWait) {
                rowClass = 'bg-white/70 border-2 border-black opacity-60 text-black';
                badgeBg = 'bg-gray-400 text-white';
                badgeText = 'WAIT';
                timeText = 'PENDING';
              } else if (mascotState === 'idle') {
                rowClass = 'bg-white/60 border-2 border-black opacity-50 text-black';
                badgeBg = 'bg-gray-400 text-white';
                badgeText = 'IDLE';
                timeText = '--';
              }

              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-between p-2 ${rowClass}`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className={`px-1 font-pixel text-[7px] md:text-[8px] shrink-0 ${badgeBg}`}>
                      {badgeText}
                    </span>
                    <span className="truncate">{step.name}</span>
                  </span>
                  <span className="font-mono-code text-[10px] md:text-[11px] shrink-0 ml-2">
                    {timeText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

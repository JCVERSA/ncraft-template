import React from 'react';
import { TelemetryData } from '../types';

interface TelemetryScoreCardProps {
  telemetry: TelemetryData;
}

export const TelemetryScoreCard: React.FC<TelemetryScoreCardProps> = ({ telemetry }) => {
  return (
    <div className="bg-[#22C55E] border-4 border-black p-3.5 md:p-4 brutal-shadow-lg text-black">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b-2 border-black mb-3">
        <span className="font-archivo text-xs uppercase font-black">
          HIGH SCORE TELEMETRY
        </span>
        <span className="font-pixel text-[8px] bg-black text-white px-1.5 py-0.5 font-bold">
          {telemetry.rank}
        </span>
      </div>

      {/* Metrics Rows */}
      <div className="space-y-2 font-chakra font-bold text-xs">
        <div className="flex justify-between items-center bg-white border border-black p-1.5 brutal-shadow-sm">
          <span>PACK LOSS</span>
          <span className="font-pixel text-[8px] text-green-700">
            {telemetry.packetLoss}
          </span>
        </div>

        <div className="flex justify-between items-center bg-white border border-black p-1.5 brutal-shadow-sm">
          <span>NETHER CHUNKS</span>
          <span className="font-mono-code text-xs">
            {telemetry.activeChunks.toLocaleString()} ACTIVE
          </span>
        </div>

        <div className="flex justify-between items-center bg-white border border-black p-1.5 brutal-shadow-sm">
          <span>STORAGE MEMORY</span>
          <span className="font-mono-code text-xs">
            {telemetry.freeStorageGb.toFixed(1)} GB FREE
          </span>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-3 text-center">
        <span className="font-pixel text-[7px] text-black uppercase tracking-wider">
          POWERED BY NEBULA HYPER-BEDROCK V2
        </span>
      </div>
    </div>
  );
};

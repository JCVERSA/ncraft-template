import React, { useMemo } from 'react';
import { MinecraftDimension } from '../types';

interface AmbientParticlesProps {
  dimension: MinecraftDimension;
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({ dimension }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.8) % 100}%`,
      delay: `${(i * 0.45) % 6}s`,
      duration: `${6 + (i % 5)}s`,
      size: i % 3 === 0 ? 4 : 3,
    }));
  }, []);

  const getParticleColor = () => {
    if (dimension === 'nether') return 'bg-[#ef4444] shadow-[0_0_6px_#ef4444]';
    if (dimension === 'the_end') return 'bg-[#c084fc] shadow-[0_0_6px_#a855f7]';
    return 'bg-[#55ff55] shadow-[0_0_6px_#55ff55]';
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      <style>{`
        @keyframes floatUpward {
          0% {
            transform: translateY(105vh) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-none ${getParticleColor()}`}
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            bottom: 0,
            animation: `floatUpward ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

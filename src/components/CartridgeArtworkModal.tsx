import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Disc, X } from 'lucide-react';
import { CartridgeConfig } from '../types';
import { playMinecraftClick, playMinecraftAnvil, playMinecraftXpOrb } from '../utils/soundEffects';
import { CloseIcon, StarIcon, CartridgeIcons } from './MinecraftIcons';

interface CartridgeArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartridges: CartridgeConfig[];
  currentCartridgeId: string;
  onSelectCartridge: (cart: CartridgeConfig) => void;
}

export const CartridgeArtworkModal: React.FC<CartridgeArtworkModalProps> = ({
  isOpen,
  onClose,
  cartridges,
  currentCartridgeId,
  onSelectCartridge,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="mc-panel p-5 md:p-6 w-full max-w-xl space-y-4 max-h-[90vh] overflow-y-auto relative z-10"
          >
            <div className="flex items-center justify-between border-b-2 border-black/60 pb-3">
              <div className="flex items-center gap-2">
                <Disc className="w-5 h-5 text-[#ffaa00] animate-spin" style={{ animationDuration: '8s' }} />
                <span className="font-pixel text-sm md:text-base uppercase text-zinc-100 font-bold">
                  CARTRIDGE &amp; MUSIC DISC VAULT
                </span>
              </div>
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

            <p className="font-pixel text-[8px] text-zinc-300 leading-relaxed">
              Select an authentic Minecraft Bedrock Dedicated Server ROM Disc to insert into the Jukebox slot:
            </p>

            {/* Cartridge Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {cartridges.map((cart) => {
                const isSelected = cart.id === currentCartridgeId;
                return (
                  <motion.div
                    key={cart.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      playMinecraftAnvil();
                      onSelectCartridge(cart);
                      onClose();
                    }}
                    className={`p-3 mc-inset cursor-pointer select-none transition-all ${
                      isSelected ? 'ring-2 ring-[#55ff55] bg-[#222920]' : 'hover:bg-[#25262a]'
                    }`}
                  >
                    {/* Visual Cartridge Art Badge */}
                    <div className="mc-tooltip mc-enchanted-glint p-2.5 mb-2 text-center">
                      <div className="py-1 mb-1 filter drop-shadow-[0_0_6px_#c084fc]">
                        <CartridgeIcons cartridgeId={cart.id} size={22} />
                      </div>
                      <div className="font-pixel text-[9px] uppercase text-[#ffaa00] truncate">
                        {cart.title}
                      </div>
                      <div className="font-pixel text-[6px] text-zinc-400 truncate mt-0.5">
                        §7{cart.expansionName}
                      </div>
                    </div>

                    <div className="flex items-center justify-between font-pixel text-[7px] text-zinc-300">
                      <span>{cart.romSize}</span>
                      <span className="text-[#55ff55]">
                        {cart.ratedTps}
                      </span>
                    </div>

                    {isSelected ? (
                      <div className="mt-2 text-center bg-[#14532d] text-[#55ff55] font-pixel text-[7px] py-1 border border-[#22c55e] font-bold flex items-center justify-center gap-1">
                        <StarIcon size={10} /> ACTIVE IN JUKEBOX
                      </div>
                    ) : (
                      <div className="mt-2 text-center mc-btn py-1 font-pixel text-[7px] text-[#55ffff]">
                        INSERT DISC
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Close */}
            <div className="flex justify-end pt-3 border-t border-black/60">
              <button
                type="button"
                onClick={() => {
                  playMinecraftClick();
                  onClose();
                }}
                className="mc-btn px-4 py-2 font-pixel text-[8px]"
              >
                CLOSE VAULT
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


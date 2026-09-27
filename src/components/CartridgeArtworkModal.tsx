import React from 'react';
import { CartridgeConfig } from '../types';
import { playButtonClick, playDeployFanfare } from '../utils/soundEffects';

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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FF4D8D] border-4 border-black p-5 md:p-6 w-full max-w-xl brutal-shadow-lg space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b-4 border-black pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🕹️</span>
            <span className="font-archivo text-lg md:text-xl uppercase text-white font-black">
              CARTRIDGE VAULT &amp; ARTWORK
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              playButtonClick();
              onClose();
            }}
            className="bg-black text-white hover:bg-yellow-400 hover:text-black border-2 border-black p-1.5 font-pixel text-xs cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>

        <p className="font-chakra text-xs text-white font-bold">
          Select an authentic 16-Bit Bedrock Cartridge ROM to insert into the Nebula Arcade console slot:
        </p>

        {/* Cartridge Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cartridges.map((cart) => {
            const isSelected = cart.id === currentCartridgeId;
            return (
              <div
                key={cart.id}
                onClick={() => {
                  playDeployFanfare();
                  onSelectCartridge(cart);
                  onClose();
                }}
                className={`p-3 border-3 border-black brutal-shadow-sm cursor-pointer transition-transform hover:scale-[1.02] ${
                  isSelected
                    ? 'bg-[#FFE600] ring-4 ring-black'
                    : 'bg-white hover:bg-yellow-100'
                }`}
              >
                {/* Visual Cartridge Art Badge */}
                <div className="bg-[#2D2A4A] border-2 border-black p-2 rounded-t mb-2">
                  <div className="h-2.5 w-full cartridge-grooves border border-black mb-1.5" />
                  <div className="bg-[#FFE600] border-2 border-black p-2 text-center">
                    <div className="text-2xl mb-1">{cart.icons}</div>
                    <div className="font-archivo text-xs uppercase text-black font-black truncate">
                      {cart.title}
                    </div>
                    <div className="font-pixel text-[7px] text-pink-600 truncate mt-0.5">
                      {cart.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between font-pixel text-[8px] text-black">
                  <span>{cart.romSize}</span>
                  <span className="bg-black text-white px-1 py-0.5">
                    {cart.ratedTps}
                  </span>
                </div>

                {isSelected ? (
                  <div className="mt-2 text-center bg-black text-[#FFE600] font-pixel text-[8px] py-1 border border-black font-bold">
                    ★ INSERTED
                  </div>
                ) : (
                  <div className="mt-2 text-center bg-[#00F0FF] text-black font-pixel text-[8px] py-1 border border-black font-bold hover:bg-yellow-300">
                    INSERT CART
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Close */}
        <div className="flex justify-end pt-3 border-t-2 border-black">
          <button
            type="button"
            onClick={() => {
              playButtonClick();
              onClose();
            }}
            className="bg-black text-white hover:bg-yellow-300 hover:text-black border-2 border-black px-4 py-2 font-archivo text-xs uppercase brutal-press cursor-pointer font-black"
          >
            CLOSE VAULT
          </button>
        </div>
      </div>
    </div>
  );
};

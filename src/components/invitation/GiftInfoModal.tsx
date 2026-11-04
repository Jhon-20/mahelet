import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Mail, Heart, Sparkles } from 'lucide-react';
import { DecorativeBow } from '../ui/DecorativeBow';

interface GiftInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  babyName: string;
}

export const GiftInfoModal: React.FC<GiftInfoModalProps> = ({
  isOpen,
  onClose,
  babyName,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px] select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-sm bg-[#FFFDF9] rounded-3xl p-6 border-4 border-[#F6DDE5] shadow-2xl polka-dot-bg text-center"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#6B514C]/70 hover:text-[#C96F8C] hover:bg-[#F6C8D4]/20 transition-all cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Bow ornament */}
            <div className="flex justify-center -mt-10 mb-2">
              <DecorativeBow size="sm" />
            </div>

            <div className="inline-flex items-center gap-1 text-[#C96F8C] text-xs font-serif uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Detalle de Cariño</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <h3 className="font-serif text-2xl text-[#6B514C] font-semibold mb-3">
              Regalo o Sobre
            </h3>

            <p className="font-serif italic text-xs sm:text-sm text-[#6B514C]/85 leading-relaxed mb-5">
              "El regalo más valioso para nuestra pequeña {babyName} es contar con tu presencia,
              abrazos y bendiciones en su primer añito."
            </p>

            <div className="space-y-3 text-left">
              <div className="p-3.5 rounded-2xl bg-white border border-[#E9A7B8]/40 flex items-start gap-3">
                <div className="p-2 rounded-full bg-[#F6C8D4]/50 text-[#C96F8C] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#6B514C]">
                    Lluvia de Sobres
                  </h4>
                  <p className="text-xs text-[#947871] mt-0.5">
                    Contaremos con un buzón de deseos y sobres en la entrada del salón.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E9A7B8]/40 flex items-start gap-3">
                <div className="p-2 rounded-full bg-[#F6C8D4]/50 text-[#C96F8C] shrink-0 mt-0.5">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#6B514C]">
                    Regalito con Amor
                  </h4>
                  <p className="text-xs text-[#947871] mt-0.5">
                    Ropa talla 12-18 meses o juguetes didácticos para su estimulación.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="mt-6 w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#C96F8C] to-[#E07D9B] text-white font-serif text-sm font-medium shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Heart className="w-4 h-4 fill-white/80" />
              <span>Entendido, ¡muchas gracias!</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React from 'react';
import { motion } from 'framer-motion';

interface OpenInvitationButtonProps {
  label?: string;
  onClick: () => void;
}

/** Botón rosa plano con forma de curvas orgánicas, con borde inferior en relieve y letra redondeada. */
export const OpenInvitationButton: React.FC<OpenInvitationButtonProps> = ({
  label = 'Abrir invitación',
  onClick,
}) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97, x: 3, y: 4 }}
    className="min-w-[250px] px-12 py-5 cursor-pointer select-none
               bg-[#DB7093] text-white text-xl font-semibold tracking-wide
               shadow-[5px_6px_0_0_#B8587A]
               active:shadow-[1px_1px_0_0_#B8587A]"
    style={{
      fontFamily: 'var(--font-button)',
      // Forma orgánica con curvas desiguales, como en la referencia
      borderRadius: '45px 70px 55px 60px / 55px 45px 70px 50px',
    }}
  >
    {label}
  </motion.button>
);

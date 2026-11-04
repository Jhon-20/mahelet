import { z } from 'zod';

export const rsvpSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Por favor, escribe tu nombre completo (mínimo 3 letras)' })
    .max(80, { message: 'El nombre es demasiado largo' }),
  attending: z.enum(['yes', 'no'], {
    message: 'Por favor confirma si podrás acompañarnos',
  }),
  guestsCount: z
    .number()
    .min(1, { message: 'Mínimo 1 asistente' })
    .max(6, { message: 'Máximo 6 asistentes por confirmación' }),
  companionNames: z.string().optional(),
  messageToBaby: z
    .string()
    .max(300, { message: 'El mensaje no debe superar los 300 caracteres' })
    .optional(),
});

export type RSVPFormData = z.infer<typeof rsvpSchema>;

export interface RSVPResult {
  success: boolean;
  message: string;
  whatsappUrl?: string;
}

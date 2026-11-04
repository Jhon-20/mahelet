import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Send, Heart, CheckCircle2, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { rsvpSchema, type RSVPFormData } from '../../types/rsvp';
import { rsvpService } from '../../services/rsvp.service';
import type { InvitationConfig } from '../../types/invitation';

interface RSVPSectionProps {
  config: InvitationConfig;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ config }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    success: boolean;
    whatsappUrl?: string;
    isAttending?: boolean;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      fullName: '',
      attending: 'yes',
      guestsCount: 1,
      companionNames: '',
      messageToBaby: '',
    },
  });

  const attendingValue = watch('attending');

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    try {
      const result = await rsvpService.submitRSVP(data);

      if (data.attending === 'yes') {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#F6C8D4', '#E9A7B8', '#C96F8C', '#FFF9F2'],
        });
      }

      setSubmittedData({
        success: result.success,
        whatsappUrl: result.whatsappUrl,
        isAttending: data.attending === 'yes',
      });

      // Auto-open WhatsApp after short celebration pause
      if (result.whatsappUrl) {
        setTimeout(() => {
          window.open(result.whatsappUrl, '_blank');
        }, 600);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-10" id="rsvp">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="grain relative mx-auto max-w-xl overflow-hidden rounded-[2rem] bg-mulberry px-5 py-10 text-white shadow-[0_30px_60px_-30px_rgba(74,37,53,0.7)] sm:px-9"
      >
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-rose-deep/40 blur-3xl" />

        <div className="relative mb-8 text-center">
          <p className="eyebrow !text-rose">Confirmación</p>
          <h2 className="display-title mt-2 text-4xl sm:text-5xl">
            ¿Nos <span className="font-script text-rose">acompañas</span>?
          </h2>
          <p className="font-serif mx-auto mt-3 max-w-xs text-lg italic leading-snug text-white/70">
            Confírmanos para organizar cada detalle con mucho amor.
          </p>
        </div>

        {submittedData?.success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative space-y-4 rounded-3xl border border-white/15 bg-white/10 px-5 py-9 text-center backdrop-blur"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose/30 text-rose">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-3xl">
              {submittedData.isAttending ? '¡Qué felicidad contar contigo!' : '¡Gracias por avisarnos!'}
            </h3>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-white/70">
              Preparamos tu mensaje de WhatsApp con los detalles. Si no se abrió solo, pulsa el botón:
            </p>
            {submittedData.whatsappUrl && (
              <a
                href={submittedData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:bg-[#20ba5a]"
              >
                <MessageCircle className="h-4 w-4" />
                Enviar por WhatsApp
              </a>
            )}
            <div>
              <button
                type="button"
                onClick={() => setSubmittedData(null)}
                className="mt-2 text-xs text-rose underline underline-offset-4 transition-colors hover:text-white"
              >
                Modificar o enviar otra respuesta
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="mb-2 block text-xs font-medium tracking-wide text-white/80">
                Tu nombre <span className="text-rose">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Ej. Familia Rodríguez o María López"
                {...register('fullName')}
                className={`field ${errors.fullName ? '!border-red-300' : ''}`}
              />
              {errors.fullName && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-200">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.fullName.message}</span>
                </p>
              )}
            </div>

            {/* Attendance */}
            <div>
              <span className="mb-2 block text-xs font-medium tracking-wide text-white/80">
                ¿Asistirás? <span className="text-rose">*</span>
              </span>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border p-3.5 text-sm transition-all ${
                    attendingValue === 'yes'
                      ? 'border-rose bg-rose/25 font-medium text-white'
                      : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <input type="radio" value="yes" {...register('attending')} className="sr-only" />
                  <Heart className="h-4 w-4 fill-current" />
                  <span>¡Sí, asistiré!</span>
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border p-3.5 text-sm transition-all ${
                    attendingValue === 'no'
                      ? 'border-white/60 bg-white/15 font-medium text-white'
                      : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <input type="radio" value="no" {...register('attending')} className="sr-only" />
                  <span>No podré</span>
                </label>
              </div>
            </div>

            {attendingValue === 'yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-5"
              >
                <div>
                  <label htmlFor="guestsCount" className="mb-2 block text-xs font-medium tracking-wide text-white/80">
                    Asistentes (contándote)
                  </label>
                  <select id="guestsCount" {...register('guestsCount', { valueAsNumber: true })} className="field">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'persona' : 'personas'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="companionNames" className="mb-2 block text-xs font-medium tracking-wide text-white/80">
                    Acompañantes <span className="text-white/40">(opcional)</span>
                  </label>
                  <input
                    id="companionNames"
                    type="text"
                    placeholder="Ej. Esposo(a), niños..."
                    {...register('companionNames')}
                    className="field"
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label htmlFor="messageToBaby" className="mb-2 block text-xs font-medium tracking-wide text-white/80">
                Un deseo para {config.baby.name} <span className="text-white/40">(opcional)</span>
              </label>
              <textarea
                id="messageToBaby"
                rows={3}
                placeholder="Dedícale unas palabras llenas de amor..."
                {...register('messageToBaby')}
                className="field resize-none"
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full !py-4">
              {isSubmitting ? <Sparkles className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span>{isSubmitting ? 'Preparando...' : 'Confirmar asistencia'}</span>
            </button>

            <p className="text-center text-[0.7rem] text-white/50">
              Tu confirmación se enviará por WhatsApp a los organizadores.
            </p>
          </form>
        )}
      </motion.div>
    </section>
  );
};

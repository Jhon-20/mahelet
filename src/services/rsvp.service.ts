import type { RSVPFormData, RSVPResult } from '../types/rsvp';
import { INVITATION_CONFIG } from '../config/invitation';

export interface IRSVPService {
  submitRSVP(data: RSVPFormData): Promise<RSVPResult>;
  buildWhatsAppUrl(data: RSVPFormData): string;
}

class RSVPService implements IRSVPService {
  /**
   * Generates a prefilled, beautifully formatted WhatsApp message
   */
  public buildWhatsAppUrl(data: RSVPFormData): string {
    const babyName = INVITATION_CONFIG.baby.name;
    const phone = INVITATION_CONFIG.whatsapp.phoneNumber.replace(/\D/g, '');

    const isAttending = data.attending === 'yes';
    const statusText = isAttending
      ? '¡Sí, con mucho gusto asistiré! 💖'
      : 'Lamentablemente no podré asistir esta vez 🥺🤍';

    let text = `🐰🎀 *CONFIRMACIÓN DE ASISTENCIA — 1ER AÑITO DE ${babyName.toUpperCase()}*\n\n`;
    text += `👤 *Invitado(a):* ${data.fullName}\n`;
    text += `💌 *Respuesta:* ${statusText}\n`;

    if (isAttending) {
      text += `👥 *Total de asistentes:* ${data.guestsCount}\n`;
      if (data.companionNames && data.companionNames.trim()) {
        text += `🌸 *Acompañantes:* ${data.companionNames.trim()}\n`;
      }
    }

    if (data.messageToBaby && data.messageToBaby.trim()) {
      text += `\n💬 *Mensaje para ${babyName}:*\n"${data.messageToBaby.trim()}"\n`;
    }

    text += `\n✨ _¡Muchas gracias por la invitación!_`;

    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${phone}?text=${encodedText}`;
  }

  /**
   * Submits RSVP.
   * Frontend-first mode: redirects seamlessly to WhatsApp with prefilled message.
   * Also prepared to easily hook into a REST/GraphQL API or Google Sheets webhook.
   */
  public async submitRSVP(data: RSVPFormData): Promise<RSVPResult> {
    // Artificial small delay for polished UI transition
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const whatsappUrl = this.buildWhatsAppUrl(data);

      // Optional: If you plug in a real backend, you can execute a fetch call here:
      // await fetch('/api/rsvp', { method: 'POST', body: JSON.stringify(data) });

      return {
        success: true,
        message: '¡Confirmación lista! Se abrirá WhatsApp para enviar tu respuesta directamente a los papitos.',
        whatsappUrl,
      };
    } catch (error) {
      console.error('Error processing RSVP', error);
      return {
        success: false,
        message: 'Ocurrió un error al procesar tu confirmación. Por favor intenta nuevamente.',
      };
    }
  }
}

export const rsvpService = new RSVPService();

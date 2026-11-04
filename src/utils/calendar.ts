import type { EventLocation, EventSchedule } from '../types/invitation';

/**
 * Builds a Google Calendar direct link to add the birthday event
 */
export function getGoogleCalendarUrl(
  babyName: string,
  schedule: EventSchedule,
  location: EventLocation
): string {
  try {
    const startDate = new Date(schedule.date);
    if (isNaN(startDate.getTime())) return '#';

    // Default 4 hours duration if no end time
    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

    const formatGCalDate = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const title = encodeURIComponent(`🐰🎀 ¡1er Añito de ${babyName}!`);
    const details = encodeURIComponent(
      `Celebración del primer añito de ${babyName}. ¡Acompáñanos a compartir esta tarde tan especial!`
    );
    const loc = encodeURIComponent(
      `${location.venueName}, ${location.address}, ${location.city}`
    );
    const dates = `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${loc}`;
  } catch (error) {
    console.error('Error generating Google Calendar URL', error);
    return '#';
  }
}

/**
 * Downloads an .ics file for Apple Calendar / Outlook / native mobile calendars
 */
export function downloadIcsFile(
  babyName: string,
  schedule: EventSchedule,
  location: EventLocation
): void {
  try {
    const startDate = new Date(schedule.date);
    if (isNaN(startDate.getTime())) return;

    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const formatIcsDate = (d: Date) =>
      `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Invitacion Coquette//Cumpleanos Bebe//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@cumpleanos-mahelet.com`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(startDate)}`,
      `DTEND:${formatIcsDate(endDate)}`,
      `SUMMARY:🐰🎀 1er Añito de ${babyName}`,
      `DESCRIPTION:Celebración del primer añito de ${babyName}. ¡Te esperamos con mucho amor!`,
      `LOCATION:${location.venueName}, ${location.address}, ${location.city}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `cumpleanos-${babyName.toLowerCase().replace(/\s+/g, '-')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading ICS file', error);
  }
}

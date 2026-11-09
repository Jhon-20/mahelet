import type { InvitationConfig } from '../types/invitation';

/**
 * =======================================================================
 * CONFIGURACIÓN CENTRAL DE LA INVITACIÓN — CUMPLEAÑOS COQUETTE 🐰🎀
 * =======================================================================
 * Edita este archivo para personalizar los datos del evento, la música,
 * las imágenes, la ubicación y el número de confirmación por WhatsApp.
 */

export const INVITATION_CONFIG: InvitationConfig = {
  baby: {
    name: 'Mahelet Abigail',
    fullName: 'Mahelet Abigail',
    ageTitle: '1 añito',
    birthdayNumber: 1,
    parentsNames: 'Con todo el amor de sus papitos',
  },

  welcome: {
    badge: 'Una invitación muy especial',
    subtitle: 'Hay un día mágico que queremos compartir contigo...',
    openButtonText: 'Abrir invitación con amor 🎀',
  },

  schedule: {
    // Formato ISO para la cuenta regresiva (Año-Mes-DíaTHora:Minuto:Segundo)
    // Cambia la fecha a la que corresponda a tu celebración
    date: '2026-11-28T16:00:00',
    displayDate: 'Sábado, 28 de Noviembre de 2026',
    time: '4:00 PM',
    endTime: '8:30 PM',
    timezone: 'America/Lima',
  },

  location: {
    venueName: 'Jardín de Ensueño Las Rosas',
    address: 'Av. Las Gardenias 340, Urb. Primavera',
    city: 'Lima, Perú',
    // Enlace directo a Google Maps para el botón "Cómo llegar"
    googleMapsUrl: 'https://maps.google.com/?q=Jardin+Las+Rosas+Lima',
    notes: 'Habrá estacionamiento privado para invitados y zona infantil segura.',
  },

  dressCode: {
    title: 'Código de Vestimenta',
    description: 'Elegante casual con toques en tonos pasteles, rosas, blanco o beige.',
    paletteColors: [
      { name: 'Rosa Pastel', hex: '#F6C8D4' },
      { name: 'Rosa Empolvado', hex: '#E9A7B8' },
      { name: 'Marfil Cálido', hex: '#FFF9F2' },
      { name: 'Crema Suave', hex: '#F5EBDD' },
      { name: 'Blanco', hex: '#FFFFFF' },
    ],
  },

  quotes: {
    emotionalMessage:
      'Un añito de amor incondicional, risas que iluminan el hogar y momentos inolvidables. Queremos celebrar este día tan especial rodeados de las personas que forman parte de nuestra historia y que llenan de luz la vida de nuestra pequeña.',
    closingDedication:
      '¡Tu presencia será el regalo más lindo para nuestra pequeña Mahelet!',
  },

  whatsapp: {
    // Número internacional con código de país (sin el signo +, ej: '51987654321')
    phoneNumber: '51987654321',
    eventOrganizerName: 'Papitos de Mahelet',
  },

  photos: [
    {
      id: 'photo-1',
      src: '/images/baby-photo-1.jpg',
      alt: 'Mahelet sonriendo en sus primeros meses',
      caption: 'Mis primeras sonrisas',
      monthOrStage: '6 Meses',
    },
    {
      id: 'photo-2',
      src: '/images/baby-photo-2.jpg',
      alt: 'Mahelet celebrando con alegría',
      caption: 'Llegando a mi primer añito',
      monthOrStage: 'Creciendo feliz',
    },
    {
      id: 'photo-3',
      src: '/images/bunny-celebration.jpg',
      alt: 'Ilustración del pastel de 1 añito de Mahelet',
      caption: 'Un dulce deseo',
      monthOrStage: '1er Añito',
    },
  ],

  recommendations: [
    {
      id: 'rec-time',
      iconName: 'clock',
      title: 'Puntualidad con Amor',
      description: 'Agradecemos llegar a tiempo para no perderse la recepción y las fotos de bienvenida.',
    },
    {
      id: 'rec-gift',
      iconName: 'gift',
      title: 'Lluvia de Sobres / Regalos',
      description: 'El mejor regalo es tu compañía. Si deseas tener un detalle, habrá un buzón de sobres y deseos.',
    },
    {
      id: 'rec-dress',
      iconName: 'shirt',
      title: 'Comodidad para Jugar',
      description: 'Se recomienda calzado cómodo para disfrutar del jardín y de los juegos infantiles.',
    },
    {
      id: 'rec-love',
      iconName: 'sparkles',
      title: 'Muchas Fotos y Recuerdos',
      description: 'Captura los momentos más lindos y etiquétanos para guardarlos en el álbum de Mahelet.',
    },
  ],

  features: {
    enableCountdown: true,
    enablePhotoGallery: true,
    enableRecommendations: true,
    enableAddToCalendar: true,
    enableGoogleMaps: true,
    enableAudio: true,
    enablePetalsAnimation: true,
  },

  audio: {
    // Melodía suave de cuna o caja musical (libre de derechos o personalizable)
    src: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=gentle-piano-lullaby-110855.mp3',
    title: 'Melodía de Ensueño',
    artist: 'Caja de Música Coquette',
  },
};

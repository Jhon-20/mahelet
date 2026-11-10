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
    parentsNames: 'Jhon Soplopuco y Carmen Alayo',
  },

  welcome: {
    badge: 'Una invitación muy especial',
    subtitle: 'Hay un día mágico que queremos compartir contigo...',
    openButtonText: 'Abrir invitación con amor 🎀',
  },

  schedule: {
    // Formato ISO para la cuenta regresiva (Año-Mes-DíaTHora:Minuto:Segundo)
    // Cambia la fecha a la que corresponda a tu celebración
    date: '2026-11-23T16:00:00',
    displayDate: 'Lunes, 23 de Noviembre de 2026',
    time: '4:00 PM',
    timezone: 'America/Lima',
  },

  location: {
    venueName: 'Triberca de Covicorti',
    address: 'Covicorti',
    city: '',
    // Enlace directo a Google Maps para el botón "Cómo llegar"
    googleMapsUrl: 'https://maps.app.goo.gl/21LhZeNvCPTQEx1A8',
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
    phoneNumber: '51939945744',
    eventOrganizerName: 'Jhon y Carmen, papás de Mahelet',
  },

  gifts: {
    message: 'Tu compañía es nuestro mejor regalo. Si deseas tener un detallito con Mahelet, puedes hacerlo por Yape 💕',
    yapeNumber: '939945744',
    yapeName: 'Jhon Soplopuco',
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
    // Canción de fondo: suena después del video de introducción
    src: '/music/¡Feliz_feliz_Maileth_feliz_.mp3',
    title: 'Melodía de Ensueño',
    artist: 'Caja de Música Coquette',
  },
};

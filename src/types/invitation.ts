export interface EventLocation {
  venueName: string;
  address: string;
  city: string;
  googleMapsUrl: string;
  notes?: string;
}

export interface EventSchedule {
  date: string; // ISO string e.g. "2026-11-28T16:00:00"
  displayDate: string; // "Sábado, 28 de Noviembre de 2026"
  time: string; // "4:00 PM"
  endTime?: string; // "8:00 PM"
  timezone?: string;
}

export interface PhotoMemory {
  id: string;
  src: string;
  alt: string;
  caption: string;
  monthOrStage?: string;
}

export interface RecommendationItem {
  id: string;
  iconName: 'gift' | 'clock' | 'shirt' | 'heart' | 'camera' | 'sparkles';
  title: string;
  description: string;
}

export interface InvitationConfig {
  baby: {
    name: string;
    fullName?: string;
    ageTitle: string; // "Mi 1er Añito"
    birthdayNumber: number;
    parentsNames?: string;
  };
  welcome: {
    badge: string;
    subtitle: string;
    openButtonText: string;
  };
  schedule: EventSchedule;
  location: EventLocation;
  dressCode: {
    title: string;
    description: string;
    paletteColors?: { name: string; hex: string }[];
  };
  quotes: {
    emotionalMessage: string;
    closingDedication: string;
  };
  whatsapp: {
    phoneNumber: string; // With country code e.g. "51987654321"
    eventOrganizerName: string;
  };
  gifts: {
    message: string;
    yapeNumber: string; // 9 dígitos, sin espacios
    yapeName: string;
  };
  photos: PhotoMemory[];
  recommendations: RecommendationItem[];
  features: {
    enableCountdown: boolean;
    enablePhotoGallery: boolean;
    enableRecommendations: boolean;
    enableAddToCalendar: boolean;
    enableGoogleMaps: boolean;
    enableAudio: boolean;
    enablePetalsAnimation: boolean;
  };
  audio: {
    src: string;
    title: string;
    artist?: string;
  };
}

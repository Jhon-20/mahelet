# 🐰🎀 Invitación Web de Cumpleaños Infantil — La Conejita Coquette
## Cumpleaños de Mahelet | Mi Primer Añito

Invitación digital de alta gama diseñada con estética **Conejita Coquette**, inspirada en la papelería fina, ilustraciones de cuentos clásicos en acuarela, lazos de satén rosados y tipografía editorial.

---

## ✨ Características Principales

1. **Experiencia de Bienvenida ("Unboxing" Digital):**
   - Pantalla de inicio con la conejita protagonista, detalles en satén y el botón *"Abrir invitación con amor 🎀"*.
   - Disparo de confeti pastel suave con `canvas-confetti`.
   - Opción para activar música de fondo suave (respetando las políticas de audio del navegador).

2. **Portada Editorial y Nombre Protagonista:**
   - Nombre de **Mahelet** en tipografía destacada con serif y script romántico.
   - Ilustración principal enmarcada con detalles florales.

3. **Mensaje Emotivo de los Papitos:**
   - Cita cálida y natural entre divisores florales y moños de satén.

4. **Cuenta Regresiva Dinámica:**
   - Días, Horas, Minutos y Segundos calculados en tiempo real.
   - Manejo elegante de estados: fecha futura, día del cumpleaños (*"¡Hoy es el gran día! 🎂"*) y evento ya celebrado.

5. **Detalles del Evento:**
   - Fecha y horario formateados.
   - Ubicación con botón directo hacia **Google Maps**.
   - Código de vestimenta (*Dress Code*) con paleta visual de colores pasteles recomendados.
   - Botones para agendar en **Google Calendar** y descargar archivo **Apple / Outlook (.ics)**.

6. **Confirmación de Asistencia (RSVP) vía WhatsApp:**
   - Formulario validado con `React Hook Form` y `Zod`.
   - Campos: Nombre del invitado, Asistiré / No podré asistir, Total de asistentes, Acompañantes y Mensaje para la bebé.
   - Al enviar, genera un mensaje cariñoso y formateado y abre la conversación directamente en **WhatsApp** con los organizadores.
   - Arquitectura de servicio desacoplada (`rsvp.service.ts`) para conectar una API o Google Sheets en el futuro si se desea.

7. **Galería Fotográfica:**
   - Tarjetas estilo polaroid con toques de cinta washi y lazos.

8. **Recomendaciones para los Invitados:**
   - Puntualidad, regalos/buzón de sobres, calzado cómodo y fotografías.

9. **Música de Fondo:**
   - Control flotante con barras ecualizadoras animadas para pausar o reanudar cuando el invitado lo desee.

10. **Lluvia Sutil de Pétalos:**
    - Animación decorativa de fondo con soporte automático para `prefers-reduced-motion`.

---

## 🛠️ Stack Tecnológico

- **React 19 + TypeScript**
- **Vite**
- **Tailwind CSS v4** (con `@tailwindcss/vite`)
- **Framer Motion** (transiciones sutiles y respetuosas)
- **Lucide React** (iconografía delicada)
- **React Hook Form + Zod** (validación de formulario RSVP)
- **Canvas Confetti** (efecto de apertura y confirmación)
- **Fuentes de Google:** *Cormorant Garamond*, *Great Vibes*, *DM Sans*, *Playfair Display*.

---

## 📂 Estructura del Proyecto

```text
├── public/
│   ├── favicon.svg             # Favicon personalizado con conejita coquette
│   └── images/
│       ├── bunny-hero.jpg      # Ilustración acuarela conejita protagonista
│       ├── bunny-celebration.jpg # Conejita con pastel de 1 añito
│       ├── coquette-ribbon.jpg # Lazo ornamental con rositas
│       ├── baby-photo-1.jpg    # Foto de ejemplo de Mahelet (6 meses)
│       └── baby-photo-2.jpg    # Foto de ejemplo de Mahelet (creciendo feliz)
├── src/
│   ├── config/
│   │   └── invitation.ts       # ⭐️ ARCHIVO CENTRAL DE DATOS CONFIGURABLES
│   ├── types/
│   │   ├── invitation.ts       # Tipos TypeScript de la invitación
│   │   └── rsvp.ts             # Esquema Zod y tipos del formulario
│   ├── services/
│   │   └── rsvp.service.ts     # Servicio RSVP (WhatsApp / API)
│   ├── hooks/
│   │   ├── useCountdown.ts     # Hook de cuenta regresiva
│   │   └── useAudio.ts         # Hook para control de melodía
│   ├── utils/
│   │   ├── calendar.ts         # Generador de enlaces Google Cal & .ics
│   │   └── maps.ts             # Enlaces a Google Maps
│   ├── components/
│   │   ├── ui/
│   │   │   ├── DecorativeBow.tsx      # Lazo de satén vectorial SVG
│   │   │   ├── FloralDivider.tsx      # Separadores florales
│   │   │   ├── FloatingAudioControl.tsx # Botón flotante de audio
│   │   │   └── PetalsRain.tsx         # Pétalos cayendo sutilmente
│   │   └── invitation/
│   │       ├── WelcomeScreen.tsx      # Pantalla inicial con apertura
│   │       ├── InvitationHero.tsx     # Portada con nombre y fecha
│   │       ├── SpecialMessage.tsx     # Mensaje emotivo
│   │       ├── CountdownSection.tsx   # Contador regresivo
│   │       ├── EventDetails.tsx       # Cuándo, Dónde, Dress Code, Mapa
│   │       ├── RSVPSection.tsx        # Formulario de asistencia
│   │       ├── PhotoGallery.tsx       # Galería de fotos
│   │       ├── RecommendationsSection.tsx # Tips e info importante
│   │       └── InvitationFooter.tsx   # Despedida y agradecimiento
│   ├── index.css               # Tema Tailwind v4, fuentes y utilidades
│   ├── App.tsx                 # Ensamblado principal de la experiencia
│   └── main.tsx
└── index.html                  # Metadatos SEO, Open Graph y fuentes
```

---

## ⚙️ Cómo Personalizar la Invitación

Todo lo editable está centralizado en el archivo:
👉 [`src/config/invitation.ts`](file:///Users/jhonandersonsoplopucolavado/Desktop/Proyectos/Cumpleaños-Mahelet/src/config/invitation.ts)

### 1. Datos de la Bebé y Fecha
```typescript
baby: {
  name: 'Mahelet',
  fullName: 'Mahelet Soplopuco',
  ageTitle: 'Mi Primer Añito',
  birthdayNumber: 1,
  parentsNames: 'Con todo el amor de sus papitos',
},
schedule: {
  date: '2026-11-28T16:00:00', // Formato Año-Mes-DíaTHora:Minuto:Segundo
  displayDate: 'Sábado, 28 de Noviembre de 2026',
  time: '4:00 PM',
  endTime: '8:30 PM',
}
```

### 2. Número de WhatsApp para recibir las confirmaciones
```typescript
whatsapp: {
  phoneNumber: '51987654321', // Código de país + número (ejemplo Perú: 51XXXXXXXXX)
  eventOrganizerName: 'Papitos de Mahelet',
}
```

### 3. Lugar y Enlace de Google Maps
```typescript
location: {
  venueName: 'Jardín de Ensueño Las Rosas',
  address: 'Av. Las Gardenias 340, Urb. Primavera',
  city: 'Lima, Perú',
  googleMapsUrl: 'https://maps.google.com/?q=Jardin+Las+Rosas+Lima',
  notes: 'Habrá estacionamiento privado para invitados y zona infantil segura.',
}
```

### 4. Reemplazar Fotografías de la Bebé
Simplemente coloca las fotos en la carpeta `public/images/` y actualiza la lista en `photos` dentro de `invitation.ts`.

### 5. Activar o Desactivar Secciones
Puedes prender o apagar cualquier sección cambiando `true` o `false` en `features`:
```typescript
features: {
  enableCountdown: true,
  enablePhotoGallery: true,
  enableRecommendations: true,
  enableAddToCalendar: true,
  enableGoogleMaps: true,
  enableAudio: true,
  enablePetalsAnimation: true,
}
```

---

## 🚀 Comandos de Ejecución

### Instalar dependencias
```bash
npm install
```

### Iniciar servidor de desarrollo
```bash
npm run dev
```
Abre en tu navegador la URL que indique Vite (por ejemplo: `http://localhost:5173`).

### Compilar para producción
```bash
npm run build
```
Generará la carpeta optimizada `dist/` lista para publicar.

### Previsualizar el build de producción
```bash
npm run preview
```

---

## 🌐 Publicación en Vercel o Netlify

1. **En Vercel:**
   - Sube este proyecto a tu GitHub o arrastra la carpeta a la consola de Vercel.
   - Vercel detectará automáticamente Vite. El build command es `npm run build` y el output directory es `dist`.
2. **En Netlify:**
   - Enlace directo a tu repositorio de GitHub, o mediante `netlify deploy --prod --dir=dist`.

¡Listo para compartir el enlace por WhatsApp con toda la familia y amigos! 🐰🎀
